import React, { useContext, useEffect, useState } from "react";
import {
   useJsApiLoader,
   GoogleMap,
   Marker,
   DirectionsRenderer,
} from "@react-google-maps/api";
import { BiCurrentLocation } from "react-icons/bi";
import Image from "next/image";
import { AppContext } from "../../shared/appContext";
import Geocode from "react-geocode";
import axios from "axios";

const Map: React.FC = () => {
   Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);
   const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      libraries: ["places"],
   });
   const {
      state: { directionsResult, rides },
      dispatch,
   } = useContext(AppContext);
   const [center, setCenter] = useState<any>(null);
   const [currentLocation, setCurrentLocation] = useState<any>(null);
   const [map, setMap] = useState<any>(null);

   console.log({rides})

   useEffect(() => {
      (async () => {
         const res = await axios.get("https://geolocation-db.com/json/");
         console.log(res);
         // setIP(res.data.IPv4);
         dispatch({
            type: "SET_CURRENT_IP",
            payload: res.data.IPv4
         })
      })();
   }, []);

   useEffect(() => {
      (async () => {
         if (!currentLocation) {
            navigator.geolocation.getCurrentPosition(
               ({ coords: { latitude: lat, longitude: lng } }) => {
                  const pos = { lat, lng };
                  setCurrentLocation(pos);
                  setCenter(pos);
               }
            );
         }

         if (currentLocation) {
            Geocode.fromLatLng(currentLocation?.lat, currentLocation?.lng).then(
               (response) => {
                  const address = response.results[0].formatted_address;
                  dispatch({
                     type: "SET_CURRENT_ADDRESS",
                     payload: address,
                  });
               },
               (error) => {
                  console.error(error);
               }
            );
         }
      })();
   }, [currentLocation]);

   if (!isLoaded) {
      return <h1>Loading Map...</h1>;
   }
   return (
      <GoogleMap
         center={center}
         zoom={15}
         mapContainerStyle={{ width: "100%", height: "100%" }}
         options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: false,
         }}
         onLoad={(map) => setMap(map)}
      >
         {!directionsResult && <Marker position={center} />}
         {directionsResult && (
            <DirectionsRenderer directions={directionsResult} />
         )}
         <div
            className="p-2 bg-primary absolute top-0 left-0 cursor-pointer rounded-br-lg shadow-lg"
            onClick={() => map.panTo(currentLocation)}
         >
            <Image
               src="/assets/cabby_logo.svg"
               width="80px"
               height="60px"
               alt="logo"
            />
         </div>
         <div
            className="p-4 bg-gray-200 bg-blend-soft-light absolute bottom-0 right-0 cursor-pointer"
            onClick={() => map.panTo(currentLocation)}
         >
            <BiCurrentLocation
               size="30px"
               color={center === currentLocation ? "blue" : "black"}
            />
         </div>
      </GoogleMap>
   );
};

export default Map;
