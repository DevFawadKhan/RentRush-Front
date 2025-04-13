import React, { useState, useEffect } from "react";
import ShowroomNavbar from "./showroomNavbar";
import axios from "axios";
import Toast from "../Toast";
import CarCard from "./carCard";
import CarMaintenanceChecklist from "./CarMaintenanceChecklist";
import MarkCompleteMaintenance from "./MarkCompleteMaintenance";
const Base_Url = import.meta.env.VITE_API_URL;

const CarMaintenancePage = () => {
  const [maintenanceSelectedCar, setMaintenanceSelectedCar] = useState(null);
  const [completeMaintenanceSelectedCar, setCompleteMaintenanceSelectedCar] =
    useState(null);
  const [cars, setCars] = useState(null);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        `${Base_Url}/api/car/get-all-return-cars`,
        {
          withCredentials: true,
        }
      );
      setCars(response.data); // Set the fetched data to vehicles state
    } catch (err) {
      console.log(err);
      Toast(err.data || err.message || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    try {
      fetchVehicles();
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      Toast("Failed to fetch vehicles", "error");
    }
  }, []);

  const handleMaintenanceCarSelect = (car) => {
    setMaintenanceSelectedCar(car);
  };

  const handleCompleteMaintenanceCarSelect = (car) => {
    setCompleteMaintenanceSelectedCar(car);
  };

  const handleCloseCompleteMaintenanceSelectedCar = () => {
    setCompleteMaintenanceSelectedCar(null);
    fetchVehicles();
  };

  const handleCloseChecklist = () => {
    setMaintenanceSelectedCar(null);
    fetchVehicles();
  };

  return (
    <>
      <ShowroomNavbar />
      <div className="p-8 bg-[#F9FAFB] min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#0B132A]">
          Select a Car for Maintenance Update
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {cars?.map((car) => (
            <div
              key={car._id}
              onClick={() =>
                car.availability === "Pending Return"
                  ? handleMaintenanceCarSelect(car)
                  : handleCompleteMaintenanceCarSelect(car)
              }
              className="cursor-pointer"
            >
              <CarCard car={car} />
            </div>
          ))}
        </div>

        {maintenanceSelectedCar && (
          <CarMaintenanceChecklist
            car={maintenanceSelectedCar}
            onClose={handleCloseChecklist}
          />
        )}
        {completeMaintenanceSelectedCar && (
          <MarkCompleteMaintenance
            carId={completeMaintenanceSelectedCar._id}
            onClose={handleCloseCompleteMaintenanceSelectedCar}
          />
        )}
      </div>
    </>
  );
};

export default CarMaintenancePage;
