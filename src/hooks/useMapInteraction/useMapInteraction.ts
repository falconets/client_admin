import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useState } from "react";

interface props {
  mapRef: React.RefObject<GoogleMap> | null;
}

const useMapInteraction = ({ mapRef }: props) => {
  const [clickedCoordinate, setClickedCoordinate] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [predictions, setPredictions] = useState<
    google.maps.places.QueryAutocompletePrediction[]
  >([]);
  const [placeDetails, setPlaceDetails] = useState<google.maps.LatLngLiteral>();
  const [routeCoordinates, setRouteCoordinates] = useState<
    google.maps.LatLngLiteral[]
  >([]);




  //const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);

  //   useEffect(() => {
  //     // Get user's location if available
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const userLatlng = {
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude,
  //           };
  //           setUserLocation(userLatlng);
  //           mapRef.current?.panTo(userLatlng);
  //         },
  //         (error) => {
  //           console.error('Error getting user location:', error);
  //         }
  //       );
  //     }
  //   }, [mapRef]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng && mapRef) {
      const clickedLatlng = event.latLng.toJSON();
      setClickedCoordinate(clickedLatlng);

      const marker = new window.google.maps.Marker({
        position: clickedLatlng,
        map: mapRef.current?.state.map,
      });

      setMarkers((prevMarkers) => [...prevMarkers, marker]);
    } else {
      console.error("Map not selected");
    }
  };

  const handleRemoveMarker = (
    position: google.maps.LatLng | null | undefined
  ) => {
    const markerClicked = markers.find(
      (marker) =>
        marker.getPosition()?.lat() === position?.lat() &&
        marker.getPosition()?.lng() === position?.lng()
    );
    markerClicked?.setMap(null);

    setMarkers((prevMarkers) =>
      prevMarkers.filter(
        (marker: google.maps.Marker) => marker !== markerClicked
      )
    );
  };

  const calculateDistance = (
    point1: google.maps.LatLngLiteral,
    point2: google.maps.LatLngLiteral
  ): number => {
    const distanceInMeters =
      window.google.maps.geometry.spherical.computeDistanceBetween(
        new window.google.maps.LatLng(point1),
        new window.google.maps.LatLng(point2)
      );

    return distanceInMeters;
  };

  /**
   * this function would get input place and 
   * update predictions of the places
   * @param place 
   */
  const placePredictions = (place: string) => {
    const autoCompleteService = new google.maps.places.AutocompleteService();
    const displaySuggestions = (
      predictions: google.maps.places.QueryAutocompletePrediction[] | null,
      status: google.maps.places.PlacesServiceStatus
    ) => {
      if (!predictions || status != google.maps.places.PlacesServiceStatus.OK) {
        return;
      }
      setPredictions(predictions);
      console.log("predictions",predictions)
    }; //end of display suggestion
    autoCompleteService.getPlacePredictions(
      { 
        input: place,
        componentRestrictions: {country: 'zm'}
       },
      displaySuggestions
    );
  };

  /**
   * the function would get an id of the place an set placedetails
   * of the place which is a location coordinate
   * @param placeId 
   */
  const getPlaceDetails = (placeId: string) => {
    const placesService = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    placesService.getDetails(
      { placeId: placeId },
      (placeDetails, detailsStatus) => {
        if (
          !placeDetails ||
          detailsStatus !== google.maps.places.PlacesServiceStatus.OK
        ) {
          return;
        }
        const location = placeDetails.geometry?.location?.toJSON();
        setPlaceDetails(location);
      }
    );
  };

  const getTravellingDetails = (startPoint: string, endPoint: string) => {
    const directionsService = new window.google.maps.DirectionsService();

    const directionsCallback = (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus
    ) => {
          if (result && status === "OK") {
                setDistance(result.routes[0].legs[0].distance?.value ?? null);
                setDuration(result.routes[0].legs[0].duration?.value ?? null);
      }
    };

    const directionsOptions = {
      origin: startPoint,
      destination: endPoint,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(directionsOptions, directionsCallback);
  };

  /**
   * this would draw a route on the map from the start to
   * the end of the journey
   * @param startPoint 
   * @param endPoint 
   */
  const showRoute = (startPoint: string, endPoint: string) => {
    const directionsService = new window.google.maps.DirectionsService();

    const directionsCallback = (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus
    ) => {
      if (result !== null && status === "OK" && mapRef) {
        const overviewPath = result.routes[0].overview_path;
        const startMarker = new window.google.maps.Marker({
          position: overviewPath[0],
          map: mapRef.current?.state.map,
        });

        const endMarker = new window.google.maps.Marker({
          position: overviewPath[overviewPath.length - 1],
          map: mapRef.current?.state.map,
        });

        setMarkers((prevMarkers) => [...prevMarkers, startMarker, endMarker]);

        setRouteCoordinates(
          result.routes[0].overview_path.map((p) => ({
            lat: p.lat(),
            lng: p.lng(),
          }))
        );

        // Center the map on the route
        const bounds = new window.google.maps.LatLngBounds();
        overviewPath.forEach((point) => bounds.extend(point));
        mapRef.current?.state.map?.fitBounds(bounds);
      }
    };

    const directionsOptions = {
      origin: startPoint,
      destination: endPoint,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(directionsOptions, directionsCallback);
  };

  return {
    duration,
    clickedCoordinate,
    markers,
    distance,
    routeCoordinates,
    predictions,
    placeDetails,
    handleRemoveMarker,
    handleMapClick,
    calculateDistance,
    showRoute,
    placePredictions,
    getPlaceDetails,
    getTravellingDetails,
  };
};

export default useMapInteraction;
