import React from "react";

const CarCard = ({img,title}) => (
  <div className="bg-white shadow-md  shadow-gray-900 w-[30%] rounded-lg p-4">
    <img
      src={`/src/assets/${img}`}
      alt="Toyota Corolla T-20"
      className="drop-shadow-md w-full object-cover rounded-t-lg"
    />
    <h2 className="text-xl font-bold mt-2">{title}</h2>
    <ul className="list-none list-inside mt-2 *:my-1">
      <li className="flex flex-row items-center">
        <img src="/src/assets/tick.svg" className="w-7" alt="" />
        Air Conditioned
      </li>
      <li className="flex flex-row items-center">
        {" "}
        <img src="/src/assets/tick.svg" className="w-7" alt="" />
        Bluetooth Sound System
      </li>
      <li className="flex flex-row items-center">
        {" "}
        <img src="/src/assets/tick.svg" className="w-7" alt="" />
        Sunroof Available
      </li>
    </ul>
    <button className="mt-4 bg-[#C17D3C] text-white py-2 px-4 rounded hover:bg-orange-600">
      Rent Now
    </button>
  </div>
);

export default CarCard;
