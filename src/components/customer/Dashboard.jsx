import React from "react";
import Navbar from "../customer/Navbar";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./Footer";

// Import images dynamically
import carAd1 from "../../assets/carad1.jpg";
import carAd2 from "../../assets/carad2.jpg";
import carAd3 from "../../assets/carad3.jpg";
import car1 from "../../assets/car1.png";
import showroom from "../../assets/showroom.jpg";
import carImage from "../../assets/car.jpg";

const images = [
  { src: carAd1, alt: "Luxury car ad" },
  { src: carAd2, alt: "Sleek black car" },
  { src: carAd3, alt: "Sporty convertible" },
  { src: car1, alt: "Classic car showcase" },
  { src: showroom, alt: "Modern car showroom" },
];

const NextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
    onClick={onClick}
    aria-label="Next Slide"
  >
   ➡️
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
    onClick={onClick}
    aria-label="Previous Slide"
  >
    ⬅️
  </button>
);

const UserDashboard = () => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <Navbar />
      <div className="mt-6 max-w-full mx-auto mb-10 px-4">
        {/* Slider Section */}
        <div className="w-full -mt-10">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="relative w-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-center justify-center rounded-lg">
                  <h2 className="text-white text-4xl font-extrabold text-center drop-shadow-md">
                    Find Your Perfect Ride
                  </h2>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        </div>

        {/* Search Section */}
        <div className="text-center font-bold text-2xl text-[#363843] mt-10 mb-6">
          <h1>Find the Best Cars by Brand, Model, or Location! 🔎</h1>
        </div>

        {/* Navigation Cards */}
        <div  id="cars-section" className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 mb-20 p-5 lg:p-0 max-w-screen-xl mx-auto">
          <div
            onClick={() => navigate("/customer/cars")}
            className="border p-6 rounded-lg shadow-lg bg-tertiary cursor-pointer hover:shadow-2xl transition-transform transform hover:scale-105"
          >
            <img
              src={carImage}
              alt="Cars"
              className="w-full h-48 object-cover mb-4 rounded-lg"
              loading="lazy"
            />
            <h2 className="text-2xl text-white font-semibold">Browse Cars</h2>
            <p className="text-white">Find your ideal car by name or model.</p>
          </div>

          <div
            onClick={() => navigate("/customer/showrooms")}
            className="border p-6 rounded-lg shadow-lg bg-tertiary cursor-pointer hover:shadow-2xl transition-transform transform hover:scale-105"
          >
            <img
              src={showroom}
              alt="Showrooms"
              className="w-full h-48 object-cover mb-4 rounded-lg"
              loading="lazy"
            />
            <h2 className="text-2xl text-white font-semibold">Find Showrooms</h2>
            <p className="text-white">Search by showroom name or location.</p>
          </div>
        </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
