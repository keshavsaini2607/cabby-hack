import React, { useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { BiCurrentLocation } from "react-icons/bi";
import Image from "next/image";

const Map: React.FC = () => {
   const [center, setCenter] = useState<any>(null);
   const [currentLocation, setCurrentLocation] = useState<any>(null);
   const [map, setMap] = useState<any>(null);
   const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: "AIzaSyBk6KCBbjo2Fo6K29huI8utZc9348sO2t8",
      libraries: ["places"],
   });

   useEffect(() => {
      navigator.geolocation.getCurrentPosition(
         ({ coords: { latitude: lat, longitude: lng } }) => {
            const pos = { lat, lng };
            setCurrentLocation(pos);
            setCenter(pos);
         }
      );
   }, []);

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
         <Marker position={center} />
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
