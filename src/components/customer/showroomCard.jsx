import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserCard from "./userCard";
const Base_Url = import.meta.env.VITE_API_URL;
const ShowroomCard = ({ value }) => {
  const [showdialog, setshowdialog] = useState(false);
  const [allcar, setallcar] = useState([]);
  const [Filter, setFilter] = useState("Available");
  let showroomid = value?._id;
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
  }, [value?._id]);
  // filtercars
  const filtercars = allcar.filter((car) =>
    Filter === "available"
      ? car.availability === "Available"
      : car.availability === "Rented Out",
  );
  return (
    <>
      <div
        onClick={() => setshowdialog(true)}
        className="bg-white shadow-2xl rounded-lg overflow-hidden w-64 relative transform transition-transform duration-300 hover:scale-105"
      >
        <div className="relative">
          <img
            src={`/uploads/${value.images}`}
            alt={`Showroom: ${value.showroomName}`}
            className="w-full h-40 object-cover"
            onError={(e) => {
              e.target.src = "/path/to/default/image.png"; // Fallback image if the image fails to load
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-center text-lg text-blue-900 mb-2">
            Showroom: {value.showroomName}
          </h3>
          <div className="pb-4 text-center">
            <span className="text-md font-semibold text-gray-700">
              Address: {value.address}
            </span>
          </div>
        </div>
      </div>
      {/* Dialog box for  cardetails */}
      {showdialog && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-7xl h-[95vh] overflow-y-auto">
              {/* navbar */}
              <nav className="bg-blue-400 w-full mb-5 h-12 border rounded-md">
                <div className="flex justify-end">
                  <ul className="flex mr-8 gap-5 p-2 text-white text-2xl font-bold  cursor-pointer">
                    <li className="hover:underline">About</li>
                    <Link to="/showroom/services">
                      <li className="hover:underline">Services</li>
                    </Link>
                    <Link to="/showroom/reviews">
                      <li className="hover:underline">Reviews</li>
                    </Link>
                  </ul>
                </div>
              </nav>
              {/* Showroom Header Section - with smaller logo */}
              <div className="flex flex-col lg:flex-row gap-8 mb-10">
                <div className="w-full lg:w-2/5 relative">
                  <img
                    src={`/uploads/${value.images}`}
                    alt={`Showroom: ${value.showroomName}`}
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
                        {value.showroomName}
                      </h1>
                      <div className="flex items-center text-gray-700">
                        <svg
                          className="w-6 h-6 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
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
                        <p className="text-xl">{value.address}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setshowdialog(false)}
                      className="text-4xl font-light text-gray-500 hover:text-gray-800 transition transform hover:scale-110"
                    >
                      &times;
                    </button>
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

              {/* Cars Grid - Larger Cards */}
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
                      xmlns="http://www.w3.org/2000/svg"
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
          </div>{" "}
        </>
      )}
    </>
  );
};
ShowroomCard.propTypes = {
  value: PropTypes.shape({
    images: PropTypes.string.isRequired,
    showroomName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShowroomCard;
