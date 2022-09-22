import React, { useContext, useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { AppContext } from "../../shared/appContext";
import RideTile from "./RideTile";
import { rideOptions } from "./index";
import Image from "next/image";
import Confetti from "react-confetti";

type props = {
   setStep: React.Dispatch<React.SetStateAction<number>>;
};

const BookingConfirm: React.FC<props> = ({ setStep }) => {
   const {
      state: { directionsResult, distance, ride, duration },
   } = useContext(AppContext);
   const {state, dispatch} = useContext(AppContext);
   const [startPoint, setStartPoint] = useState("");
   const [endPoint, setEndPoint] = useState("");
   const [rideFare, setRideFare] = useState(0);
   const rideDetails = rideOptions[parseInt(ride)];
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (directionsResult) {
         setStartPoint(
            directionsResult?.routes[0]?.legs[0]?.start_address! || ""
         );
         setEndPoint(directionsResult.routes[0].legs[0].end_address);
         const distanceTravelled =
            directionsResult.routes[0].legs[0].distance.value;
         let fare =
            rideDetails.farePerKm * Math.round(distanceTravelled / 1000);
         let dayTime = new Date().toLocaleTimeString();
         console.log(dayTime.slice(0, 2));
         if (parseInt(dayTime.slice(0, 2)) > 18) {
            setRideFare(fare * 1.2);
            return;
         }
         setRideFare(fare);
      }
   }, []);

   const completeRide = () => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
         setStep(1);
         dispatch({
            type: "SET_RIDES",
            payload: {
               start: startPoint,
               end: endPoint,
               duration,
               distance,
               finalPrice: rideFare,
               dateTravelled: new Date().toDateString()
            }
         })
         dispatch({
            type: "SET_DIRECTIONS_RESPONSE",
            payload: null,
         });
         dispatch({
            type: "SET_DISTANCE",
            payload: null,
         });
         dispatch({
            type: "SET_DURATION",
            payload: null,
         });
      }, 4000);
   };

   return (
      <div>
         <div className="flex items-center space-x-4">
            <h1 className="text-2xl text-border font-bold">
               Booking Confirmed
            </h1>
            <AiFillCheckCircle className="text-border text-xl" />
         </div>
         <p className="text-sm mt-2">
            Hi we have just confirmed your booking from{" "}
            <span className="font-bold">{startPoint}</span> ---- to ----{" "}
            <span className="font-bold">{endPoint}</span>
         </p>
         <p className="text-sm">We hope you will love travelling with us ❤️</p>
         <div className="mt-3 bg-yellow-100 p-4 rounded-md">
            <p className="font-bold">Your ride details</p>
            <div>
               <RideTile
                  key={rideDetails.id}
                  ride={rideDetails}
                  selectedRide={rideDetails.id}
                  setSelectedRide={() => {}}
               />
            </div>
            <p className="mt-4 border-b-[1px] border-b-gray-700 text-gray-700 w-max">
               Your Driver For This Trip
            </p>
            <div className=" py-3 flex items-center space-x-5">
               <Image
                  src="/assets/rider.jpeg"
                  width="40px"
                  height="40px"
                  alt="rider"
                  className="rounded-full"
               />
               <div className="text-sm">
                  <p>Mr. Rajesh Dhawan</p>
                  <p>Driving Experience ~15 years</p>
               </div>
            </div>
            <div>
               <p className="border-b-[1px] border-b-gray-700 text-gray-700 w-max">
                  Ride Expenses
               </p>
               <div className="flex items-center justify-between text-sm mt-2">
                  <p>Ride Fare</p>
                  <p>
                     {rideDetails.farePerKm} x {distance} = {rideFare} INR
                  </p>
               </div>
               <div className="flex items-center justify-between text-sm">
                  <p>Expected Ride Duration</p>
                  <p>{duration}</p>
               </div>
               <div className="flex items-center justify-between text-sm">
                  <p>Night Extra Charges</p>
                  <p>
                     {parseInt(new Date().toLocaleTimeString().slice(0, 2)) > 18
                        ? "1.2 times of original fare"
                        : "NA"}
                  </p>
               </div>
            </div>
         </div>
         <div className="flex justify-end p-4">
            <button
               onClick={completeRide}
               disabled={loading}
               className=" w-full rounded px-5 py-2.5 overflow-hidden group bg-border relative hover:bg-gradient-to-r hover:from-border hover:to-primary text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300"
            >
               <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
               <span className="relative">
                  {loading ? "Completing Ride" : "Complete Ride"}
               </span>
            </button>
         </div>
         <Confetti
            run={loading}
            width={window.screen.width}
            height={window.screen.height}
         />
      </div>
   );
};

export default BookingConfirm;
