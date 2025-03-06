import React from "react";

function Steps() {
  return (
    <>
      <div className="bg-[#0B132A] py-5 text-white min-h-screen flex flex-col justify-center items-center" id="steps">
        <h1 className="text-center text-3xl font-bold">How it Works</h1>
        <p className="text-lg text-center w-4/5 sm:w-1/3 mx-auto py-4">
          A high-performing web-based car rental system for any rent-a-car company and website
        </p>

        <div className="flex flex-col items-center py-10 space-y-10 px-10 sm:flex-row sm:justify-evenly sm:space-y-0 sm:space-x-10">
         
          <div className="flex flex-col justify-center items-center">
            <div className="bg-[#C17D3C] w-fit p-6 rounded-2xl mx-auto">
              <img src="/src/assets/work/gps.png" alt="Choose Location" />
            </div>
            <h1 className="py-3 text-center font-bold text-lg">Choose Location</h1>
            <p className="text-center mx-12 sm:mx-12 lg:mx-auto text-sm sm:text-base">
              Enable car rentals across various locations. Flexible Book and Return Locations.
            </p>
          </div>

          
          <div className="flex flex-col justify-center items-center">
            <div className="bg-[#C17D3C] mx-auto w-fit p-6 rounded-2xl">
              <img src="/src/assets/work/celender.png" alt="Pick-up Date" />
            </div>
            <h1 className="py-3 text-center font-bold text-lg">Pick-up Date</h1>
            <p className="text-center mx-12 sm:mx-12 lg:mx-auto text-sm sm:text-base">
              Anytime, Anywhere, Pick your Date and Enjoy your Trip. Select your pick-up date for your rental car.
            </p>
          </div>
   
          <div className="flex flex-col justify-center items-center">
            <div className="bg-[#C17D3C] mx-auto w-fit p-6 rounded-2xl">
              <img src="/src/assets/work/caricon.png" alt="Book your car" />
            </div>
            <h1 className="py-3 text-center font-bold text-lg">Book your car</h1>
            <p className="text-center mx-12 sm:mx-12 lg:mx-auto text-sm sm:text-base">
              Offer updated car information and models. Allow users to choose and own their preferred car models.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Steps;
