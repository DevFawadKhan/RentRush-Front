import React from "react";

function DetailCard({ img, title, requirement }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4 hover:shadow-xl transition-all">
      <div className="w-12 h-12 flex items-center justify-center bg-[#C17D3C] rounded-lg">
        <img
          src={`/src/assets/requirements/${img}.png`}
          className="w-8 h-8"
          alt={title}
        />
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-xs text-gray-500">{requirement}</p>
      </div>
    </div>
  );
}

export default DetailCard;
