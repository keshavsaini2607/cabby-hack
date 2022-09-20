import React from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";


const Map: React.FC = () => {
   const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY!,
   });

  
   return (
    //   <GoogleMap></GoogleMap>
    <></>
   );
};

export default Map;
