import React, { useState } from "react";
import { CircleGauge, Fuel, GripHorizontal } from "lucide-react";

const CarCard = ({ car }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-64 relative">
      <div className="relative">
        <img
          src={`/uploads/${car.images}`}
          alt={car.carBrand + " " + car.carModel}
          className="w-full h-40 object-cover"
        />
      </div>

      <div className="p-4 ">
        <h3 className="font-bold text-lg">
          {car.carBrand + " " + car.carModel}
        </h3>
        <div className="grid grid-cols-3 gap-4 text-sm text-black my-2">
          <div className="flex flex-col items-center">
            <CircleGauge />
            <span className="text-gray-500">{car.mileage}</span>
          </div>
          <div className="flex flex-col items-center">
            <Fuel />
            <span className="text-gray-500">{car.fuelType}</span>
          </div>
          <div className="flex flex-col items-center">
            <GripHorizontal />
            <span className="text-gray-500">{car.transmission}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pb-4">
          <span className="text-xl font-bold">{car.rentRate}rs</span>

          {car.availability === "Rented Out" && (
            <button
              onClick={openModal}
              className="text-blue-600 hover:underline"
            >
              View Details
            </button>
          )}
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold mt-4 
          ${
            car.availability === "Available"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {car.availability}
        </span>
      </div>

      {showModal && car.availability === "Rented Out" && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg relative w-96">
            {/* Cancel button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              &#10005;
            </button>

            <h2 className="text-2xl font-bold mb-4">{car.name}</h2>
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="text-2xl font-bold mb-4">Rental Information</h2>
            <p className="text-gray-700">
              <strong>Renter Name:</strong>{" "}
              {car.rentalInfo?.rentername || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {car.rentalInfo?.renteremail || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {car.rentalInfo?.renterphone || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {car.rentalInfo?.renteraddress || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Rental Start Date:</strong>{" "}
              {car.rentalInfo?.rentalStartDate || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Rental End Date:</strong>{" "}
              {car.rentalInfo?.rentalEndDate || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Rental Days:</strong>{" "}
              {car.rentalInfo?.rentalDays || "N/A"}
            </p>
            <p className="text-lg font-semibold mt-4">
              <strong>Total Amount:</strong>{" "}
              {car.rentalInfo?.totalAmount || "N/A"}rs
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarCard;
