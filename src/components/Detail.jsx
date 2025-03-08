import React from "react";
import DetailCard from "./DetailCard";

function Detail() {
  const items = [
    {
      title: "Proof of Identity",
      requirements: "Required",
      img: "img1",
    },
    {
      title: "Car Registration Book",
      requirements: "Required",
      img: "img2",
    },
    {
      title: "License",
      requirements: "Required",
      img: "img5",
    },
    {
      title: "Reservation Confirmation",
      requirements: "Required",
      img: "img3",
    },
  ];

  return (
    <div className="bg-gray-100 py-12 flex flex-col lg:flex-row justify-center items-center">
      {/* Left Section (Image and Title) */}
      <div className="hidden lg:flex w-[40%] flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Necessary Documents for Renting
        </h1>
        <img
          src="/src/assets/aboutcar.png"
          className="w-full max-w-sm"
          alt="Car"
        />
      </div>

      {/* Right Section (Cards) */}
      <div className="w-full lg:w-[50%] flex flex-col space-y-4 px-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center lg:hidden mb-6">
          Necessary Documents for Renting
        </h1>
        {items.map((item) => (
          <DetailCard
            key={item.img}
            title={item.title}
            requirement={item.requirements}
            img={item.img}
          />
        ))}
      </div>
    </div>
  );
}

export default Detail;
