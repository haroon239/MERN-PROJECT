import React from "react";
import "./signin.css";
import  { useState, useEffect } from 'react'
import { GrValidate } from "react-icons/gr";
import { MdError } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const home=useNavigate();
  const [email, setemail]= useState();
  const [password,setpassword]=useState();
	const [validemail, setvalidemail]=useState(false);

	const emailvalidation=(e)=>{
              setemail(e.target.value);		 
	}

	useEffect(() => {
		if (email) {
		  var pattern = /^[^ ]+@[^ ]+\.[a-z]{3,3}$/;
		  if (email.match(pattern)) {
			console.log("true");
			setvalidemail(true);
		  } else {
			console.log("false");
			setvalidemail(false);
		  }
		}
	  }, [email]);

    const login=async (e)=>{
      e.preventDefault();
      const formdata={
        email:email,
        password:password
      }
      try {
        await axios.post('http://localhost:6500/signin', formdata).then((res)=>{
          localStorage.setItem("Token",JSON.stringify(res.data.Token));
          const token=localStorage.getItem("Token");
         if(token){
          console.log("token is stored...");
            home('/');
         }
console.log(res);
        })
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div class="h-screen flex">
      <div
        class="hidden lg:flex w-full lg:w-1/2 login_img_section
              justify-around items-center"
      >
        <div class="bg-black opacity-20 inset-0 z-0"></div>
        <div class="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 class="text-white font-bold text-4xl font-sans">SignIn AutoVibe</h1>
          <p class="text-white mt-1">Unlock a world of automotive opportunities! Sign in to your account effortlessly and access exclusive features. Seamlessly manage your listings, track transactions, and connect with the car community.</p>
          <div class="flex justify-center lg:justify-start mt-6">
            <a
              href="#"
              class="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      <div class="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div class="w-full px-8 md:px-32 lg:px-24">
          <form class="bg-white rounded-md shadow-2xl p-5" onSubmit={login}>
            <h1 class="text-gray-800 font-bold text-2xl mb-1">SignIn</h1>
            <p class="text-sm font-normal text-gray-600 mb-8">Welcome to AutoVibe</p>
            <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                id="email"
                class=" pl-2 w-full outline-none border-none"
                type="email"
                name="email"
                placeholder="Email Address"
                autoComplete="off"
                onChange={emailvalidation}
              />
                {validemail ?<GrValidate className='text-green-400'/>:<MdError className='text-red-600'/>} 

            </div>
            <div class="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                class="pl-2 w-full outline-none border-none"
                type="password"
                name="password"
                value={password}
                onChange={(e)=>{setpassword(e.target.value)}}
                id="password"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              class="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
            >
              Login
            </button>
            <div class="flex justify-between mt-4">
              <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                Forgot Password ?
              </span>

              <a
                href="#"
                class="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Don't have an account yet?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
