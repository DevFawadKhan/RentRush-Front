import React, { useEffect, useState } from "react";
import ShowroomNavbar from "./showroomNavbar";
import Drawer from "./drawer";
import CarCard from "./carCard";
import axios from "axios";
import Toast from "../Toast";
const Base_Url = import.meta.env.VITE_API_URL;

const ShowroomDashboard = () => {
  const [cars, setCars] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${Base_Url}/api/car/get-all-cars`, {
        withCredentials: true,
      });
      setCars(response.data); // Set the fetched data to vehicles state
      const hasRentedCars = response.data.some(
        (car) => car.availability === "Rented Out"
      );
      setActiveTab(hasRentedCars ? "Rented Out" : "Available");
    } catch (err) {
      console.log(err);
      Toast(err.data || err.message || "Something went wrong", "error");
    }
  };
  useEffect(() => {
    fetchVehicles();
  }, []);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const availableCars = cars.filter((car) => car.availability === "Available");
  const rentedCars = cars.filter((car) => car.availability === "Rented Out");
  // const [activeTab, setActiveTab] = useState(
  //   rentedCars.length > 0 ? "Rented Out" : "Available"
  // );
  return (
    <>
      <ShowroomNavbar onMenuClick={toggleDrawer} />

      <div className="flex justify-center mt-4">
        {rentedCars.length > 0 && (
          <button
            className={`px-4 py-2 mr-4 font-semibold text-lg ${
              activeTab === "Rented Out"
                ? "bg-primary text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("Rented Out")}
          >
            Rented Out
          </button>
        )}
        <button
          className={`px-4 py-2 font-semibold text-lg ${
            activeTab === "Available" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("Available")}
        >
          Available
        </button>
      </div>

      <div className="bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-col-4 xl:grid-cols-5 gap-4 px-6 py-10 justify-items-center">
        {activeTab === "Rented Out"
          ? rentedCars.length > 0 &&
            rentedCars.map((car, index) => <CarCard key={index} car={car} />)
          : availableCars.map((car, index) => (
              <CarCard key={index} car={car} />
            ))}
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
};

export default ShowroomDashboard;
