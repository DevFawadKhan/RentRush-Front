import React from "react";
import Navbar from "./Navbar.jsx";
import Steps from "./Steps.jsx";
import Details from "./Detail.jsx";
import Reason from "./Reason.jsx";
import Variety from "./Variety.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <Navbar />
      <div id="Home">
        {/* Hero Section */}
        <div className="background bg-cover bg-center w-full h-screen flex flex-col justify-center px-6 sm:px-14">
          <div className="info lg:w-[50%]">
            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-white font-poppins">
              FAST AND EASY WAY TO <span className="text-[#C17D3C]">RENT</span> A CAR
            </h1>
            <p className="text-md sm:text-lg lg:text-xl font-poppins py-6 text-white lg:pr-40">
              Our RentRush online booking system is designed to meet the specific needs of car rental business owners. This easy-to-use car rental software will let you manage.
            </p>
            <div className="buttons flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="bg-[#C17D3C] rounded py-3 px-8 text-white font-poppins text-lg font-medium text-center hover:bg-[#A56A33] transition-all"
              >
                BOOKING NOW
              </Link>
              <Link
                to="/showroom/signup"
                className="bg-transparent border border-[#C17D3C] rounded py-3 px-8 text-white font-poppins font-medium text-lg text-center hover:bg-[#C17D3C] transition-all"
              >
                REGISTER SHOWROOM
              </Link>
            </div>
          </div>
        </div>

        {/* Car Images Section */}
        <div className="hidden md:flex justify-evenly py-6 bg-[#ffffff]">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index}>
              <img
                src={`/src/assets/cars/car${index + 1}.png`}
                className="w-14 h-14 cursor-pointer"
                alt="Car"
              />
            </div>
          ))}
        </div>

        {/* Other Sections */}
        <Steps />
        <Details />
        <Reason />
        <Variety />
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
