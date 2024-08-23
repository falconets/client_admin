import { createRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
  Libraries
} from "@react-google-maps/api";
import useMapInteraction from "@hooks/useMapInteraction";
import mapStore from "@store/mapStore";
import React from "react";

const MapView = () => {
  const mapRef = createRef<GoogleMap>();
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const libraries:Libraries = ['places']
 
  const { setMapRef, isLoaded:loaded, setIsLoaded } = mapStore();
  const { markers, routeCoordinates, handleMapClick, handleRemoveMarker } =
    useMapInteraction({ mapRef });
  const mapStyles = {
    height: "500px",
    width: "100%",
  };

  const apiKey = import.meta.env.VITE_X_GOOGL_API_KEY;
  const { isLoaded} = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries
  });

  useEffect(() => {
    setIsLoaded(loaded)
  },[loaded])

  useEffect(() => {
    // Set the map reference in the store when the map is loaded
    if (mapRef.current) {
      setMapRef(mapRef);
    }
  }, []);

  console.log('from store', isLoaded)

  const center = { lat: -15.0, lng: 30.0 };

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  return (
    isLoaded && (
      <GoogleMap
        ref={mapRef}
        center={{ lat: -15.0, lng: 30.0 }}
        zoom={8}
        mapContainerStyle={mapStyles}
        onClick={handleMapClick}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            onClick={() => handleRemoveMarker(marker.getPosition())}
            position={marker.getPosition()?.toJSON() || { lat: 0, lng: 0 }}
          />
        ))}
        {routeCoordinates.length > 0 && (
          <Polyline
            path={routeCoordinates}
            options={{
              strokeColor: "#d00c0c",
              strokeOpacity: 0.8,
              strokeWeight: 4,
            }}
          />
        )}
      </GoogleMap>
    )
  );
};

export default React.memo(MapView);
