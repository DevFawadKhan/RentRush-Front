// import React from "react";
import Navbar from "../customer/Navbar";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  { src: "/src/assets/showroom.jpg", alt: "Image 1" },
  { src: "/src/assets/car.jpg", alt: "Image 2" },
  { src: "/src/assets/showroom.jpg", alt: "Image 3" },
  { src: "/src/assets/car.jpg", alt: "Image 4" },
  { src: "/src/assets/showroom.jpg", alt: "Image 5" },
];

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} next-arrow`}
      style={{ ...style, display: "block", right: "10px" }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} prev-arrow`}
      style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <Navbar />
      <div className="mt-6 max-w-screen-lg mx-auto mb-52">
        <div className="h-screen sm:w-auto p-5 lg:p-0">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-96 object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 p-10 lg:p-0">
          <div
            onClick={() => navigate("/customer/cars")}
            className="border p-6 rounded-lg shadow-lg bg-primary cursor-pointer hover:shadow-xl duration-300 hover:scale-105 transition-transform transform"
          >
            <img
              src="/src/assets/car.jpg"
              alt="Cars"
              className="w-full h-40 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-2xl text-white font-semibold mb-2">Cars</h2>
            <p className="text-white">Search by car name or car model.</p>
          </div>
          <div
            onClick={() => navigate("/customer/showrooms")}
            className="border p-6 rounded-lg shadow-lg bg-primary cursor-pointer hover:shadow-xl duration-300 hover:scale-105 transition-transform transform"
          >
            <img
              src="/src/assets/showroom.jpg"
              alt="Cars"
              className="w-full h-40 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-2xl text-white font-semibold mb-2">Showrooms</h2>
            <p className="text-white">Search by showroom name or showroom location.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
