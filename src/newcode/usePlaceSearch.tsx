import React from "react";
import { parseAddressComponents } from "./utilities";

type PlacePrediction = {
  description: string;
  place_id: string;
};

type UsePlaceSearchProps = {
  countryCode: string;
  statesData?: any[];
};

const usePlaceSearch = ({
  countryCode,
  statesData = [],
}: UsePlaceSearchProps) => {
  const [options, setOptions] = React.useState<PlacePrediction[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const mapRef = React.useRef<google.maps.Map | null>(null);
  const markerRef = React.useRef<google.maps.Marker | null>(null);

  React.useEffect(() => {
    if (window.google) {
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
  }, []);

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

  const handleSelect = (
    placeId: string,
    setAddressDetails: (details: any) => void
  ) => {
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
            const addressComponents = place.address_components;
            if (addressComponents && place.geometry) {
              const fullAddress = parseAddressComponents(
                addressComponents,
                statesData
              );
              const latitude = place.geometry.location.lat();
              const longitude = place.geometry.location.lng();

              setAddressDetails({
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

  return {
    options,
    searchValue,
    handleSearch,
    handleSelect,
  };
};

export default usePlaceSearch;
