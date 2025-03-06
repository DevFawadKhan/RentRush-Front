import React from "react";
import TestContainer from "./TestContainer";

function Variety() {
  return (
    <div className="relative z-10 h-auto lg:h-screen bg-[#2C2C2C] flex flex-col justify-center items-center" id="rent">
      <div className="h-auto relative bg-[#2C2C2C] w-full py-16">
        <h1 className="text-white font-bold text-2xl lg:text-3xl w-[100%] text-center mx-auto pt-8">
          Trusted by Thousands of Happy Customers
        </h1>
        <p className="w-[100%] mx-auto py-3 text-white text-center">
          “RentRush is proud to be trusted by thousands of satisfied customers,
          ensuring quality and reliability in every rental.”
        </p>
        <TestContainer />
      </div>
    </div>
  );
}

export default Variety;
