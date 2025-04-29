import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import UserCard from "../customer/userCard";
import axios from "axios";
import Navbar from "./Navbar";

const Base_Url = import.meta.env.VITE_API_URL;

function Showroomcars() {
  const { id: showroomid } = useParams();
  const location = useLocation();
  const showroom = location.state?.showroom;
  const [allcar, setAllCar] = useState([]);
  const [filter, setFilter] = useState("available");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `${Base_Url}/api/getshowroomcar/${showroomid}`,
          { withCredentials: true }
        );
        setAllCar(response.data.totalcar);
      } catch (error) {
        console.error("Error fetching cars:", error.response);
      }
    };
    fetchCar();
  }, [showroomid]);

  const filteredCars = allcar.filter((car) =>
    filter === "available"
      ? car.availability === "Available"
      : car.availability === "Rented Out"
  );

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="w-full lg:w-1/3">
              <img
                src={`http://localhost:3000/uploads/${showroom.images[0]}`}
                alt={showroom.showroomName}
                className="w-full h-60 object-cover rounded-xl shadow-lg hover:shadow-2xl transition"
                onError={(e) => {
                  e.target.src = "/path/to/default/image.png";
                }}
              />
            </div>

            <div className="w-full lg:w-2/3 flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {showroom.showroomName}
              </h1>
              <p className="flex items-center text-gray-600 text-lg mb-3">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                {showroom.address}
              </p>

              {/* Filter Tabs */}
              <div className="flex space-x-4 mt-4">
                <button
                  className={`px-4 py-2 rounded-full font-semibold ${
                    filter === "available"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setFilter("available")}
                >
                  Available Cars
                </button>
                <button
                  className={`px-4 py-2 rounded-full font-semibold ${
                    filter === "rented"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setFilter("rented")}
                >
                  Rented Out Cars
                </button>
              </div>
            </div>
          </div>

          {/* Cars Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">
              Our Collection
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.length > 0 ? (
                filteredCars.map((car, index) => (
                  <UserCard key={index} car={car} />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <h3 className="text-lg font-semibold text-gray-600">
                    {filter === "available"
                      ? "No available cars currently."
                      : "No cars rented out yet."}
                  </h3>
                </div>
              )}
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-gray-100 rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              Our Services
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>🚗 Car Rentals for Short & Long Term</li>
              <li>🔧 Full Car Maintenance Services</li>
            </ul>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              Customer Reviews
            </h2>
            <div className="space-y-6">
              <div className="border-b pb-4">
                <p className="text-gray-800 font-semibold">
                  "Amazing service! The car was super clean and brand new."
                </p>
                <span className="text-sm text-gray-500">- Ali Khan</span>
              </div>
              <div className="border-b pb-4">
                <p className="text-gray-800 font-semibold">
                  "Quick and smooth booking experience. Highly recommend RentRush!"
                </p>
                <span className="text-sm text-gray-500">- Sana Rauf</span>
              </div>
              <div>
                <p className="text-gray-800 font-semibold">
                  "Affordable prices and great customer support."
                </p>
                <span className="text-sm text-gray-500">- Zain Malik</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Showroomcars;
