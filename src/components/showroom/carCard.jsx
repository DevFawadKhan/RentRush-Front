import { CircleGauge, Fuel, GripHorizontal, Users } from "lucide-react";
import { useState } from "react";

const CarCard = ({ car }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-65 relative">
      <div className="relative">
        <img
          src={`/uploads/${car.images}`}
          alt={car.carBrand + " " + car.carModel}
          className="w-full h-40 object-cover"
        />
      </div>

      <div className="p-4">
        {/* Car Name */}
        <h3 className="font-bold text-lg text-center mb-4">
          {car.carBrand + " " + car.carModel}
        </h3>

        {/* Grid for mileage, fuel type, and transmission */}
        <div className="grid grid-cols-3 gap-4 text-sm text-black mb-4">
          <div className="flex flex-col items-center">
            <CircleGauge className="w-5 h-5" />
            <span className="text-gray-500 mt-1">{car.mileage} km</span>
          </div>
          <div className="flex flex-col items-center">
            <Fuel className="w-5 h-5" />
            <span className="text-gray-500 mt-1">{car.fuelType} </span>
          </div>
          <div className="flex flex-col items-center">
            <GripHorizontal className="w-5 h-5" />
            <span className="text-gray-500 mt-1">{car.transmission}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center mb-4">
          <span className="text-xl font-bold">Rs {car.rentRate}/Day</span>
        </div>

        {/* Seating capacity */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Users className="w-5 h-5 mr-2" />
          <span>{car.seatCapacity} Seats</span>
        </div>

        {/* View Details button (only shown if car is rented out) */}
        {car.availability === "Rented Out" && (
          <div className="flex mb-4">
            <button
              onClick={openModal}
              className="text-blue-600 hover:underline"
            >
              View Details
            </button>
          </div>
        )}

        {/* Availability badge */}
        <div className="flex justify-center">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold 
            ${
              car.availability === "Available"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {car.availability}
          </span>
        </div>
      </div>

      {/* Modal for rental information */}
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

            <h2 className="text-2xl font-bold mb-4 text-center">
              {car.carBrand + " " + car.carModel}
            </h2>
            <img
              src={`/uploads/${car.images}`}
              alt={car.carBrand + " " + car.carModel}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="text-2xl font-bold mb-4 text-center">
              Rental Information
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Renter Name:</strong>{" "}
                {car.rentalInfo?.userId?.ownerName || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {car.rentalInfo?.userId?.email || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>CNIC:</strong> {car.rentalInfo?.userId?.cnic || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong>{" "}
                {car.rentalInfo?.userId?.contactNumber || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong>{" "}
                {car.rentalInfo?.userId?.address || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Rental Start Date:</strong>{" "}
                {car.rentalInfo?.rentalStartDate || ""}
              </p>
              <p className="text-gray-700">
                <strong>Rental End Date:</strong>{" "}
                {car.rentalInfo?.rentalEndDate || ""}
              </p>
              <p className="text-gray-700">
                <strong>Rental Days:</strong>{" "}
                {car.rentalInfo?.rentalStartDate &&
                car.rentalInfo?.rentalEndDate
                  ? Math.ceil(
                      (new Date(car.rentalInfo.rentalEndDate) -
                        new Date(car.rentalInfo.rentalStartDate)) /
                        (1000 * 60 * 60 * 24),
                    )
                  : ""}
              </p>
              <p className="text-lg font-semibold mt-4">
                <strong>Total Amount:</strong>{" "}
                {car.rentalInfo?.totalPrice || ""} Rs
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarCard;
