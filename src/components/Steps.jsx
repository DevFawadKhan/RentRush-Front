import React from "react";

function Steps() {
  return (
    <div className="bg-[#0B132A] py-12 text-white">
      {/* Heading */}
      <h1 className="text-3xl text-center font-bold">How it Works</h1>
      <p className="text-lg text-center mx-auto max-w-2xl mt-2">
        A high-performing web-based car rental system for any rent-a-car company and website.
      </p>

      {/* Steps Section */}
      <div className="relative flex flex-col lg:flex-row justify-center items-center mt-12 space-y-12 lg:space-y-0 lg:space-x-12 px-6">
        {/* Line Connector (Curved) */}
        <div className="absolute hidden lg:block w-full top-1/2 h-1 border-t-2 border-gray-500 left-0 right-0 z-0"></div>

        {/* Step 1 */}
        <div className="relative flex flex-col items-center text-center bg-[#0B132A] z-10">
          <div className="bg-[#C17D3C] p-6 rounded-full">
            <img src="/src/assets/work/gps.png" alt="Choose Location" className="w-10 h-10" />
          </div>
          <h2 className="text-lg font-bold mt-4">Choose Location</h2>
          <p className="text-sm max-w-xs mt-2">
            Enable car rentals across various locations. Flexible book and return locations.
          </p>
        </div>

        {/* Step 2 */}
        <div className="relative flex flex-col items-center text-center bg-[#0B132A] z-10">
          <div className="bg-[#C17D3C] p-6 rounded-full">
            <img src="/src/assets/work/celender.png" alt="Pick-up Date" className="w-10 h-10" />
          </div>
          <h2 className="text-lg font-bold mt-4">Pick-up Date</h2>
          <p className="text-sm max-w-xs mt-2">
            Anytime, anywhere, pick your date and enjoy your trip. Select your pick-up date for your rental car.
          </p>
        </div>

        {/* Step 3 */}
        <div className="relative flex flex-col items-center text-center bg-[#0B132A] z-10">
          <div className="bg-[#C17D3C] p-6 rounded-full">
            <img src="/src/assets/work/caricon.png" alt="Book your car" className="w-10 h-10" />
          </div>
          <h2 className="text-lg font-bold mt-4">Book your car</h2>
          <p className="text-sm max-w-xs mt-2">
            Offer updated car information and models. Allow users to choose and own their preferred car models.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Steps;
