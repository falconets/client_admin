import axios from "axios";
import { useState } from "react";


const SearchRoute = () => {
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState<boolean>(false)

  const getRoute = async(origin:string, destination:string)=>{
    setLoading(true)
    try {
      axios
        .post(
          "https://routes.googleapis.com/directions/v2:computeRoutes",
          {
            origin: {
              address: origin, //'H7HP+8FQ Lusaka Intercity Bus Terminus, Lusaka, Zambia',
            },
            destination: {
              address: destination, //'Bus Terminal, Livingstone, Zambia',
            },
            travelMode: "DRIVE",
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": import.meta.env.VITE_X_GOOG_API_KEY,
              "X-Goog-FieldMask":
                "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
            },
          }
        )
        .then((response) => {
          // Handle the response
          console.log(response.data);
          setLoading(false)
          setData(response.data)
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error);
          setLoading(false)
          setError(error);
        });
    } catch (error) {
      console.error("Error searching places:", error);
    }
  }

  return {
    data,
    error,
    loading,
    getRoute
  }
};

export default SearchRoute;
