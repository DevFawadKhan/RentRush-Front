import Card from "./Card";
import React from "react";

function Reason() {
  const arr = [
    {
      title: "Customer Support",
      desc: "At RentRush, our dedicated customer support team is here to assist you with your car rental management.",
      img: "icon1",
    },
    {
      title: "Many Locations",
      desc: "Accessible rentals across various locations. Flexible Book and Return Locations.",
      img: "icon2",
    },
    {
      title: "Best Price Guaranteed",
      desc: "At RentRush, we offer the Best Price Guarantee. If you find a lower price elsewhere for your car rental, ensuring you receive the most competitive rates for your reservations.",
      img: "icon3",
    },
  ];

  return (
    <div className="bg-[#0B132A] py-12 text-white">
      <h1 className="text-3xl text-center font-bold">Why Choose Us</h1>
      <p className="text-sm text-center mx-4 mt-2">
        Choose RentRush for our unbeatable prices, extensive location options,
        and a commitment to exceptional customer service.
      </p>
      <div className="flex flex-col lg:flex-row justify-center items-center mt-8">
        <div className="hidden lg:block w-[40%]">
          <img
            src="/src/assets/choose/redcar.png"
            className="w-full max-w-md"
            alt="Car"
          />
        </div>
        <div className="w-full lg:w-[50%] flex flex-col space-y-4 px-6">
          {arr.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              desc={item.desc}
              img={item.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reason;
