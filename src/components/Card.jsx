import React from "react";

const Card = ({ title, desc, img }) => {
  return (
    <div className="p-4 rounded-lg flex items-center space-x-4">
      <div className="bg-[#C17D3C] rounded-md flex items-center justify-center p-4">
        <img src={`/src/assets/choose/${img}.png`} className="w-8" alt={title} />
      </div>
      <div>
        <h2 className="text-white font-bold text-lg">{title}</h2>
        <p className="text-white text-sm">{desc}</p>
      </div>
    </div>
  );
};

export default Card;
