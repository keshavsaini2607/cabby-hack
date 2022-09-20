import React from "react";

type props = {
   btnTitle?:string;
}

const FormButton:React.FC<props> = ({btnTitle}) => {
   return (
      <button
         type="submit"
         className=" w-full rounded px-5 py-2.5 overflow-hidden group bg-border relative hover:bg-gradient-to-r hover:from-border hover:to-primary text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300"
      >
         <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
         <span className="relative">{btnTitle ?? "Continue"}</span>
      </button>
   );
};

export default FormButton;
