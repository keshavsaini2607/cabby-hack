import { NextPage } from "next";
import Image from "next/image";
import React, { FormEvent } from "react";
import FormButton from "../components/button/FormButton";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { createUser } from "./api/auth";

const Signup: NextPage = () => {
   const handleSubmit = async (e: any) => {
      try {
         e.preventDefault();
         const name = e?.target[0].value;
         const email = e?.target[1].value;
         const password = e?.target[2].value;

         const result = await createUser(email, password);
         console.log("result", result);

      } catch (error) {
         console.log("something went wrong");
      }
   };

   return (
      <div className="bg-primary h-screen flex justify-center items-center">
         <div className="w-[35%] flex flex-col items-center">
            <div className="flex flex-col">
               <Image
                  src="/assets/cabby_logo.svg"
                  width="200px"
                  height="160px"
                  alt="logo"
               />
            </div>
            <form className="flex flex-col space-y-5 w-[90%]" onSubmit={handleSubmit}>
               <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  className="form__input"
               />
               <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="form__input"
               />
               <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="form__input"
               />
               <div className="flex justify-center items-center">
                  <FormButton />
               </div>
            </form>
            <span className="mt-4 justify-end">
               <p className="flex space-x-3">
                  Have an account ?{" "}
                  <Link href="/login">
                     <p className="ml-2 cursor-pointer border-b-[1px] font-bold border-b-heading">
                        Login
                     </p>
                  </Link>
               </p>
            </span>
            <span className="mt-5">
               <p>Or</p>
            </span>
            <button className="flex items-center space-x-5 border-blue-400 border-[1px] p-4 rounded-full hover:bg-blue-200 hover:text-white mt-5">
               <FcGoogle size="30px" />
               <p>Continue with Google</p>
            </button>
         </div>
      </div>
   );
};

export default Signup;
