import React, { useEffect, useState } from "react";
import UserCard from "./userCard";
import Navbar from "./Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import Toast from "../Toast";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Base_Url = import.meta.env.VITE_API_URL;

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("available"); // New state for dropdown filter

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${Base_Url}/api/car/get-cars`, {
        withCredentials: true,
      });
      setCars(response.data);
    } catch (err) {
      console.log(err);
      Toast(err.data || err.message || "Something went wrong", "error");
    }
  };
  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);
  // Filter cars based on dropdown and search input
  const filteredCars = cars
    .filter((car) =>
      `${car.carBrand} ${car.carModel} ${car.color}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((car) =>
      filter === "available"
        ? car.availability === "Available"
        : car.availability === "Rented Out"
    );
  return (
    <>
      <Navbar />
      <div className="mt-4 flex justify-between items-center">
        {/* Dropdown */}
        <div className="relative">
          <select
            className="border lg:ml-6 border-gray-300 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="available">Available Cars</option>
            <option value="rented">Rented Out Cars</option>
          </select>
        </div>

        {/* Search input */}
        <div className="relative w-[150px] lg:w-[300px]">
          <input
            type="text"
            placeholder="Search by brand, model, or color"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Search />
          </div>
        </div>

        {/* Bookings Button */}
        <Link to="/customer/bookings">
          <div className="bg-blue-900 text-white rounded-md p-3 lg:px-4 lg:py-2 lg:mr-4 font-semibold">
            My Bookings
          </div>
        </Link>
      </div>
      {/* Cars List */}
      <div className="bg-white flex justify-center">
        <div className="grid ml-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl py-10 w-full">
          {filteredCars.length > 0 ? (
            filteredCars.map((car, index) => <UserCard key={index} car={car} />)
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              {filter === "available"
                ? "Sorry, no available cars."
                : "No rented out cars."}
            </p>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Cars;
