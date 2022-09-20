import React, { FormEvent, useState } from "react";
import FormButton from "../button/FormButton";
import RideTile from "./RideTile";
import { BiArrowBack } from "react-icons/bi";

const formSteps = {
   step1: {
      fields: [
         { title: "source", placeHolder: "Source", type: "text" },
         { title: "destination", type: "text", placeHolder: "Destination" },
      ],
   },
};

const rideOptions = [
   {
      id: "1",
      title: "SUV",
      budget: "15 INR/KM (prices might differ as per the time of the day)",
      icon: "/assets/suv.png",
   },
   {
      id: "2",
      title: "Mini Car",
      budget: "12 INR/KM (prices might differ as per the time of the day)",
      icon: "/assets/mini.png",
   },
   {
      id: "3",
      title: "Scooter",
      budget: "8 INR/KM (prices might differ as per the time of the day)",
      icon: "/assets/scooter.png",
   },
];

const BookingForm: React.FC = () => {
   const [currentStep, setCurrentStep] = useState(1);
   const [selectedRide, setSelectedRide] = useState("");

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      setCurrentStep(2);
   };

   const resetForm = () => {
      setCurrentStep(1);
      setSelectedRide("");
   };

   return (
      <div>
         <form
            className="mt-10 flex flex-col space-y-10"
            onSubmit={handleSubmit}
         >
            <span className="flex items-center">
               {currentStep === 2 && (
                  <BiArrowBack className="cursor-pointer" onClick={resetForm} />
               )}
               <span className="ml-2">Step {currentStep} / 2</span>
            </span>
            {currentStep === 1 ? (
               formSteps.step1.fields.map((field) => (
                  <div key={field.title} className="relative">
                     <input
                        key={field.title}
                        name={field.title}
                        placeholder={field.placeHolder}
                        type={field.type}
                        className="form__input"
                     />
                     <div className="hidden p-10 bg-red-500 absolute -bottom-20 left-0 z-10 w-full"></div>
                  </div>
               ))
            ) : (
               <div>
                  <span>Select Your Ride</span>
                  <div>
                     {rideOptions.map((option) => (
                        <RideTile
                           key={option.id}
                           ride={option}
                           selectedRide={selectedRide}
                           setSelectedRide={setSelectedRide}
                        />
                     ))}
                  </div>
               </div>
            )}
            <FormButton
               btnTitle={currentStep === 1 ? "Next" : "Book My Ride"}
            />
         </form>
      </div>
   );
};

export default BookingForm;
