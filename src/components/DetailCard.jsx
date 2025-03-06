import React from "react";

function DetailCard({ img, title, requirement }) {
  return (
    <>
      <div className="shadow-md shadow-gray-300 mx-auto flex flex-row items-center justify-start gap-8 w-[100%] lg:w-[70%] md:w-[70%] rounded-3xl relative">
        <div
          className="w-[40px] h-[100px] bg-[#C17D3C] rounded-l-3xl  "
        ></div>{" "}
        <img
          src={`/src/assets/requirements/${img}.png`}
          className="absolute left-1 h-[80px] top-4"
          alt=""
        />
        <div className="pl-4 ">
          <h1 className="text-xl py-3 font-bold">{title}</h1>
          <p className="text-xs text-gray-500">{requirement}</p>
        </div>
      </div>
    </>
  );
}

export default DetailCard;
