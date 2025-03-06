import React from "react";

const Card = ({ title, desc, img }) => {
  return (
    <div className=" p-4 rounded-lg flex flex-row items-center space-x-4">
      <div className="bg-[#C17D3C] rounded-md flex items-center py-4 px-5 justify-center">
        <img src={`/src/assets/choose/${img}.png`} className="w-12 lg:w-8" alt="" />
      </div>
      <div>
        <h2 className="text-white font-bold text-md sm:text-md md:text-lg lg:text-lg">{title}</h2>
        <p className="text-white text-sm font-poppins">{desc}</p>
      </div>
    </div>
  );
};

export default Card;
