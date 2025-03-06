import React, { useState } from "react";
import Testimonial from "./Testominial";

function TestContainer() {
  const reviews = [
    {
      name: "Fatimata",
      city: "Islamabad",
      desc: "RentDush made my car rental experience so easy! The online booking was seamless, and I loved the flexibility in pick-up locations. Highly recommended!",
    },
    {
      name: "Saif",
      city: "Lahore",
      desc: "Fantastic service! I loved the variety of cars available and the quick booking process. RentDush is my go-to for rentals!",
    },
    {
      name: "Abdullah",
      city: "Karachi",
      desc: "I couldn't be happier with my experience at RentDush. The team was friendly, and I found the perfect car at an unbeatable price!",
    },
    {
      name: "Sara",
      city: "Quetta",
      desc: "The rental experience was excellent, the car was in perfect condition, and the process was quick and easy.",
    },
    {
      name: "Hassan",
      city: "Peshawar",
      desc: "Great service, affordable prices, and the booking was smooth! I’ll definitely use RentDush again.",
    },
    {
      name: "Ayesha",
      city: "Multan",
      desc: "RentDush saved my day! I needed a car urgently, and the service was fast and reliable. Highly recommend!",
    },
  ];

  // State to track the starting index of testimonials being displayed
  const [currentIndex, setCurrentIndex] = useState(0);

  // Maximum number of testimonials to display at once based on screen size
  const testimonialsPerPage = window.innerWidth <= 640 ? 1 : 3; // 1 for small screens (sm), 3 for medium and above screens

  // Function to handle the Next button click
  const handleNext = () => {
    if (currentIndex + testimonialsPerPage < reviews.length) {
      setCurrentIndex(currentIndex + testimonialsPerPage);
    }
  };

  // Function to handle the Previous button click
  const handlePrevious = () => {
    if (currentIndex - testimonialsPerPage >= 0) {
      setCurrentIndex(currentIndex - testimonialsPerPage);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-evenly flex-wrap" id="Test">
        {reviews
          .slice(currentIndex, currentIndex + testimonialsPerPage)
          .map((card, index) => (
            <div
              key={index}
              className="w-full sm:w-full md:w-1/3 p-2"
            >
              <Testimonial name={card.name} city={card.city} desc={card.desc} />
            </div>
          ))}
      </div>
      <div className="w-full flex flex-row justify-between px-5 bg-[#2C2C2C] items-center mt-4">
        <div className="flex flex-row gap-3">
          <img
            src="/src/assets/next.png"
            onClick={handlePrevious}
            alt="previous"
            className={`cursor-pointer ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            style={{ filter: "invert(100%)" }}
          />
        </div>
        <div className="flex flex-row gap-4">
          <img
            src="/src/assets/previous.png"
            alt="next"
            onClick={handleNext}
            className={`cursor-pointer ${currentIndex + testimonialsPerPage >= reviews.length ? "opacity-50 cursor-not-allowed" : ""}`}
            style={{ filter: "invert(100%)" }}
          />
        </div>
      </div>
    </div>
  );
}

export default TestContainer;
