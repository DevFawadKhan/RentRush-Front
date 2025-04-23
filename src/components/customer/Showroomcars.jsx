import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UserCard from "../customer/userCard";
import axios from "axios";
const Base_Url = import.meta.env.VITE_API_URL;
function Showroomcars() {
  const { id: showroomid } = useParams();
  const [allcar, setallcar] = useState([]);
  const location = useLocation();
  const showroom = location.state?.showroom;
  const [Filter, setFilter] = useState("Available");
  useEffect(() => {
    const fetchcar = async () => {
      try {
        const response = await axios.get(
          `${Base_Url}/api/getshowroomcar/${showroomid}`,
          {
            withCredentials: true,
          },
        );

        setallcar(response.data.totalcar);
      } catch (error) {
        console.log("error in get all cars", error.response);
      }
    };
    fetchcar();
  }, [showroomid]);
  // filtercars
  const filtercars = allcar.filter((car) =>
    Filter === "available"
      ? car.availability === "Available"
      : car.availability === "Rented Out",
  );
  return (
    <>
      <div className="w-full min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-blue-500 border rounded-md p-4 w-full h-14 flex items-center shadow-md px-8 mb-5">
          <ul className="flex gap-6 text-white text-lg font-semibold">
            <li className="hover:underline cursor-pointer">About</li>
            <Link to="/customer/services">
              <li className="hover:underline cursor-pointer">Services</li>
            </Link>
            <Link to="/customer/reviews">
              <li className="hover:underline cursor-pointer">Reviews</li>
            </Link>
          </ul>
        </nav>

        {/* Page Content */}
        <div className="max-w-7xl mx-auto px-4 pb-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-8 mb-10">
            <div className="w-full lg:w-2/5">
              <img
                src={`http://localhost:3000/uploads/${showroom.images[0]}`}
                alt={`Showroom: ${showroom.showroomName}`}
                className="w-full h-72 object-cover rounded-xl shadow-lg"
                onError={(e) => {
                  e.target.src = "/path/to/default/image.png";
                }}
              />
            </div>

            <div className="w-full lg:w-3/5">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">
                    {showroom.showroomName}
                  </h1>
                  <div className="flex items-center text-gray-700">
                    <svg
                      className="w-6 h-6 mr-3"
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="text-xl">{showroom.address}</p>
                  </div>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="mt-8 flex border-b border-gray-200">
                <button
                  className={`py-3 px-6 font-semibold text-base ${Filter === "available" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setFilter("available")}
                >
                  Available Cars
                </button>
                <button
                  className={`py-3 px-6 font-semibold text-base ${Filter === "rented" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setFilter("rented")}
                >
                  Rented Out Cars
                </button>
              </div>
            </div>
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtercars.length > 0 ? (
              filtercars.map((car, index) => (
                <div
                  key={index}
                  className="transform transition duration-300 hover:scale-105"
                >
                  <UserCard car={car} className="w-full h-full" />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  ></path>
                </svg>
                <h3 className="mt-4 text-xl font-medium text-gray-900">
                  {Filter === "available"
                    ? "No available cars at this showroom"
                    : "No cars currently rented out"}
                </h3>
                <p className="mt-2 text-lg text-gray-500">
                  {Filter === "available"
                    ? "Check back later for new arrivals"
                    : "All cars are currently available"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Showroomcars;
