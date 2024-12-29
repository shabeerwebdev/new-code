import {
  Input,
  InputNumber,
  Select,
  DatePicker,
  TreeSelect,
  AutoComplete,
} from "antd";
import withFloatingLabel from "../../old code/withFloatingLabel";
import {
  countryMetaData,
  formatCurrency,
  formatMobile,
  parseAddressComponents,
} from "./utilities";
import React from "react";

type PlacePrediction = {
  description: string;
  place_id: string;
};

const TextInput = withFloatingLabel(({ value, onChange, ...props }) => {
  return (
    <Input
      style={{ width: "100%" }}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
});

const NumberInput = withFloatingLabel(({ value, onChange, ...props }) => (
  <InputNumber
    style={{ width: "100%" }}
    value={value}
    onChange={onChange}
    {...props}
  />
));

const CurrencyInput = withFloatingLabel(
  ({ isFocused, value, onChange, countryCode, ...props }) => {
    const prefix =
      isFocused || value ? countryMetaData[countryCode].symbol : <span />;

    return (
      <InputNumber
        style={{ width: "100%" }}
        value={value}
        onChange={onChange}
        formatter={(value, info) => formatCurrency(value, info, countryCode)}
        prefix={prefix}
        parser={(value) =>
          value ? parseFloat(value.replace(/[^0-9.-]+/g, "")) : undefined
        }
        {...props}
      />
    );
  }
);

const MobileInput = withFloatingLabel(
  ({ isFocused, value, onChange, countryCode, ...props }) => {
    const prefix = isFocused || value ? `(+${countryCode})` : <span />;

    return (
      <InputNumber
        style={{ width: "100%" }}
        value={value}
        onChange={onChange}
        prefix={prefix}
        formatter={(value, info) => formatMobile(value, info)}
        parser={(value) => (value ?? "").replace(/\D/g, "")}
        maxLength={13}
        {...props}
      />
    );
  }
);

const SelectInput = withFloatingLabel(
  ({ value, onChange, options, ...props }) => (
    <Select
      style={{ width: "100%" }}
      value={value}
      onChange={onChange}
      options={options}
      {...props}
    />
  )
);

const DateInput = withFloatingLabel(({ value, onChange, ...props }) => (
  <DatePicker
    style={{ width: "100%" }}
    value={value}
    onChange={onChange}
    placeholder=""
    {...props}
  />
));

const TreeSelectInput = withFloatingLabel(
  ({ value, onChange, treeData, ...props }) => (
    <TreeSelect
      value={value}
      onChange={onChange}
      treeData={treeData}
      {...props}
    />
  )
);

const AddressInput = withFloatingLabel(
  ({
    countryCode = "in",
    onChange,
    value,
    ...props
  }: {
    countryCode?: string;
    value: any;
    onChange: () => void;
  }) => {
    const [options, setOptions] = React.useState<PlacePrediction[]>([]);
    const [searchValue, setSearchValue] = React.useState<string>("");
    const [isScriptLoaded, setIsScriptLoaded] = React.useState(false);
    const mapRef = React.useRef<google.maps.Map | null>(null);
    const markerRef = React.useRef<google.maps.Marker | null>(null);

    React.useEffect(() => {
      const loadGoogleMapsScript = () => {
        if (typeof window !== "undefined" && !window.google) {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyATclXxJxRPPyRAxc2SoJQDiWdAHDQ-4TI&libraries=places`;
          script.async = true;
          script.onload = () => setIsScriptLoaded(true);
          script.onerror = (err) =>
            console.error("Google Maps script loading error", err);
          document.body.appendChild(script);
        } else {
          setIsScriptLoaded(true);
        }
      };

      loadGoogleMapsScript();

      return () => {
        const scriptElements = document.querySelectorAll(
          "script[src*='maps.googleapis.com']"
        );
        scriptElements.forEach((script) => script.remove());
      };
    }, []);

    React.useEffect(() => {
      if (isScriptLoaded && window.google) {
        mapRef.current = new window.google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            center: { lat: 0, lng: 0 },
            zoom: 2,
          }
        );

        markerRef.current = new window.google.maps.Marker({
          map: mapRef.current,
          position: { lat: 0, lng: 0 },
          title: "Selected Place",
        });
      }
    }, [isScriptLoaded]);

    const handleSearch = (value: string) => {
      setSearchValue(value);

      if (window.google) {
        const service = new window.google.maps.places.AutocompleteService();
        service.getPlacePredictions(
          { input: value, componentRestrictions: { country: countryCode } },
          (predictions, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setOptions(predictions || []);
            } else {
              setOptions([]);
            }
          }
        );
      }
    };

    const handleSelect = (placeId: string) => {
      if (window.google) {
        const service = new window.google.maps.places.PlacesService(
          document.createElement("div")
        );
        service.getDetails(
          {
            placeId,
            fields: ["address_components", "formatted_address", "geometry"],
          },
          (place, status) => {
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              place
            ) {
              const components = place.address_components;
              if (components && place.geometry) {
                const fullAddress = parseAddressComponents(components);
                const latitude = place.geometry.location.lat();
                const longitude = place.geometry.location.lng();
                // @ts-ignore
                props.setAddressDetails({
                  ...fullAddress,
                  formatted_address: place.formatted_address || "",
                  latitude,
                  longitude,
                });
                setSearchValue(place.formatted_address || "");

                if (mapRef.current && markerRef.current) {
                  const position = { lat: latitude, lng: longitude };

                  mapRef.current.setCenter(position);
                  mapRef.current.setZoom(14);

                  markerRef.current.setPosition(position);
                  markerRef.current.setVisible(true);
                }
              }
            }
          }
        );
      }
    };

    return (
      <div>
        <AutoComplete
          style={{ width: "100%" }}
          onSearch={handleSearch}
          onSelect={handleSelect}
          value={searchValue}
          onChange={onChange}
          {...props}
        >
          {options.map((option) => (
            <AutoComplete.Option key={option.place_id} value={option.place_id}>
              {option.description}
            </AutoComplete.Option>
          ))}
        </AutoComplete>
      </div>
    );
  }
);

export {
  TextInput,
  NumberInput,
  CurrencyInput,
  MobileInput,
  SelectInput,
  DateInput,
  TreeSelectInput,
  AddressInput,
};
