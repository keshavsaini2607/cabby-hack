import Image from "next/image";
import React from "react";

type props = {
   ride: {
      id: string;
      title: string;
      budget: string;
      icon: string;
   };

   selectedRide: string;
   setSelectedRide: (val: string) => void;
};

const RideTile: React.FC<props> = ({
   ride: { title, budget, icon, id },
   selectedRide,
   setSelectedRide,
}) => {
   return (
      <div
         className={`border-[1px] p-4 rounded-md my-4 cursor-pointer ${
            selectedRide === id && "border-border"
         }`}
         onClick={() => setSelectedRide(id)}
      >
         <div className="flex items-center space-x-10">
            <Image src={icon} width="60px" height="60px" alt="ride__icon" />
            <div>
               <h1 className="text-lg font-semibold">{title}</h1>
               <p className="text-sm text-gray-600">{budget}</p>
            </div>
         </div>
      </div>
   );
};

export default RideTile;
