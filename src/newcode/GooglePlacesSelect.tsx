import React, { useState, useEffect, useRef } from "react";
import { AutoComplete } from "antd";
import { parseAddressComponents } from "../utilities";

type AddressDetails = {
  formatted_address: string;
  [key: string]: any;
};

type PlacePrediction = {
  description: string;
  place_id: string;
};

const AddressInput = ({ countryCode = "ae" }: { countryCode?: string }) => {
  const [options, setOptions] = useState<PlacePrediction[]>([]);
  const [addressDetails, setAddressDetails] = useState<AddressDetails>({
    formatted_address: "",
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
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

  useEffect(() => {
    if (isScriptLoaded && window.google) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        document.createElement("input"),
        {
          types: ["geocode"],
          componentRestrictions: { country: countryCode },
        }
      );
    }
  }, [isScriptLoaded, countryCode]);

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
            if (components) {
              const fullAddress = parseAddressComponents(components);
              setAddressDetails({
                ...fullAddress,
                formatted_address: place.formatted_address || "",
              });
              setSearchValue(place.formatted_address || "");
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
        placeholder="Search for address"
        onSearch={handleSearch}
        onSelect={handleSelect}
        value={searchValue}
      >
        {options.map((option) => (
          <AutoComplete.Option key={option.place_id} value={option.place_id}>
            {option.description}
          </AutoComplete.Option>
        ))}
      </AutoComplete>
    </div>
  );
};

export default AddressInput;

// // @ts-nocheck
// import React, { useState, useEffect, useRef } from "react";
// import { Select } from "antd";

// const { Option } = Select;

// const GooglePlacesSelect = () => {
//   const [suggestions, setSuggestions] = useState([]);
//   const [value, setValue] = useState("");
//   const [placeDetails, setPlaceDetails] = useState({});
//   const autocompleteServiceRef = useRef(null);
// console.log(placeDetails, "dickks");

//   useEffect(() => {
//     if (window.google && window.google.maps) {
//       autocompleteServiceRef.current =
//         new window.google.maps.places.AutocompleteService();
//     }
//   }, []);

//   const handleSearch = (searchText) => {
//     if (!autocompleteServiceRef.current || !searchText) {
//       setSuggestions([]);
//       return;
//     }

//     autocompleteServiceRef.current.getPlacePredictions(
//       { input: searchText },
//       (predictions, status) => {
//         if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//           setSuggestions(predictions);
//           // predictions.map((prediction) => ({
//           //   value: prediction.place_id,
//           //   label: prediction.description,
//           // }))
//         } else {
//           setSuggestions([]);
//         }
//       }
//     );
//   };

//   const parseAddressComponents = (components) => {
//     let addressDetails = {
//       streetName: "",
//       streetNumber: "",
//       city: "",
//       state: "",
//       country: "",
//       postalCode: "",
//       neighborhood: "",
//     };

//     components.forEach((component) => {
//       const types = component.types;

//       // Each component's type tells you what it represents
//       if (types.includes("street_address")) {
//         addressDetails.streetName = component.long_name;
//       }
//       if (types.includes("street_number")) {
//         addressDetails.streetNumber = component.long_name;
//       }
//       if (types.includes("locality")) {
//         addressDetails.city = component.long_name;
//       }
//       if (types.includes("administrative_area_level_1")) {
//         addressDetails.state = component.long_name;
//       }
//       if (types.includes("country")) {
//         addressDetails.country = component.long_name;
//       }
//       if (types.includes("postal_code")) {
//         addressDetails.postalCode = component.long_name;
//       }
//       if (types.includes("neighborhood")) {
//         addressDetails.neighborhood = component.long_name;
//       }
//     });

//     return addressDetails;
//   };

//   const handleSelect = (value, option) => {
//     const placeData = option.data;  // The selected prediction data
//     const components = placeData.address_components;

//     // Use the parseAddressComponents function to extract details from address_components
//     const parsedAddress = parseAddressComponents(components);

//     setPlaceDetails(parsedAddress);
//     onChange(parsedAddress);  // Send the parsed address to the parent
//   };

//   return (
//     <Select
//       showSearch
//       // value={value}
//       placeholder="Search for a location"
//       onSearch={handleSearch}
//       onSelect={handleSelect}
//       filterOption={false}
//       // options={suggestions}
//       style={{ width: "100%" }}
//     >
//       {suggestions.map((prediction) => (
//         <Select.Option key={prediction.place_id} value={prediction.place_id} data={prediction}>
//           {prediction.description}
//         </Select.Option>
//       ))}
//       </Select>
//   );
// };

// export default GooglePlacesSelect;
