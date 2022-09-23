import React, {
   FormEvent,
   useContext,
   useEffect,
   useRef,
   useState,
} from "react";
import FormButton from "../button/FormButton";
import RideTile from "./RideTile";
import { BiArrowBack } from "react-icons/bi";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { AppContext } from "../../shared/appContext";
import { HiLocationMarker } from "react-icons/hi";
import BookingConfirm from "./BookingConfirm";
// import TimePicker from "react-time-picker";

export const rideOptions = [
   {
      id: "0",
      title: "SUV",
      budget: "15 INR/KM (prices might differ as per the time of the day)",
      icon: "/assets/suv.png",
      farePerKm: 15,
   },
   {
      id: "1",
      title: "Mini Car",
      budget: "12 INR/KM (prices might differ as per the time of the day)",
      icon: "/assets/mini.png",
      farePerKm: 12,
   },
   {
      id: "2",
      title: "Scooter",
      budget: "8 INR/KM (prices might differ as per the time of the day)",
      icon: "/assets/scooter.png",
      farePerKm: 8,
   },
];

const BookingForm: React.FC = () => {
   const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      libraries: ["places"],
   });
   const {
      state: { currentAddress, currentIP },
      dispatch,
   } = useContext(AppContext);
   const [currentStep, setCurrentStep] = useState(1);
   const [selectedRide, setSelectedRide] = useState("");
   const [time, setTime] = useState("");

   const sourceRef = useRef() as React.MutableRefObject<HTMLInputElement>;
   const destinationRef = useRef() as React.MutableRefObject<HTMLInputElement>;

   console.log({ currentIP });

   useEffect(() => {
      dispatch({
         type: "SET_RIDE",
         payload: selectedRide,
      });
   }, [selectedRide]);

   async function calculateRoute(e: any) {
      e.preventDefault();
      try {
         if (currentStep === 1) {
            if (
               sourceRef.current.value === "" ||
               destinationRef.current?.value === ""
            ) {
               return;
            }

            const directionsService = new google.maps.DirectionsService();

            const results = await directionsService.route({
               origin: sourceRef.current.value,
               destination: destinationRef.current.value,
               travelMode: google.maps.TravelMode.DRIVING,
            });

            dispatch({
               type: "SET_DIRECTIONS_RESPONSE",
               payload: results,
            });
            dispatch({
               type: "SET_DISTANCE",
               payload: results.routes[0].legs[0].distance?.text,
            });
            dispatch({
               type: "SET_DURATION",
               payload: results.routes[0].legs[0].duration?.text,
            });
            setCurrentStep(2);
         } else {
            setCurrentStep(3);
         }
      } catch (error) {
         alert("No ride available");
         sourceRef.current.value = "";
         destinationRef.current.value = "";
      }
   }

   const resetForm = () => {
      setCurrentStep(1);
      setSelectedRide("");
   };
   if (!isLoaded) {
      return <h1>Loading...</h1>;
   }

   return (
      <div>
         <form
            className="mt-10 flex flex-col space-y-10"
            onSubmit={calculateRoute}
         >
            {currentStep < 3 && (
               <span className="flex items-center">
                  {currentStep === 2 && (
                     <BiArrowBack
                        className="cursor-pointer"
                        onClick={resetForm}
                     />
                  )}
                  <span className="ml-2">Step {currentStep} / 2</span>
               </span>
            )}
            {currentStep === 1 && (
               <>
                  <Autocomplete>
                     <div>
                        <input
                           key="source"
                           name="source"
                           placeholder="Source"
                           className="form__input"
                           ref={sourceRef}
                        />
                        <span
                           className="flex items-center justify-end mt-[1px]"
                           onClick={() => {
                              sourceRef.current.value = currentAddress;
                           }}
                        >
                           <HiLocationMarker className="text-blue-600" />
                           <p className="text-blue-600 cursor-pointer text-sm ml-1">
                              Use my location
                           </p>
                        </span>
                     </div>
                  </Autocomplete>
                  <Autocomplete>
                     <input
                        key="destination"
                        name="destination"
                        placeholder="Destination"
                        className="form__input"
                        ref={destinationRef}
                     />
                  </Autocomplete>
               </>
            )}
            {currentStep === 2 && (
               <div>
                  <span>Select Your Ride</span>
                  <div>
                     {rideOptions.map((option) => (
                        <RideTile
                           key={option.id}
                           ride={option}
                           selectedRide={selectedRide}
                           setSelectedRide={() => setSelectedRide(option.id)}
                        />
                     ))}
                  </div>
               </div>
            )}
            {currentStep === 3 && <BookingConfirm setStep={setCurrentStep} />}
            {currentStep < 3 && (
               <FormButton
                  btnTitle={currentStep === 1 ? "Next" : "Book My Ride"}
               />
            )}
         </form>
      </div>
   );
};

export default BookingForm;
