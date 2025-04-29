import React from "react";
import { Link } from "react-router-dom";
import EditBookingModal from "./EditBooking";

function BookingCard({
  booking,
  handleSeeDetails,
  ReturnCar,
  setModelOpen,
  setSelectedBooking,
  setShowDialog,
  openDialog,
  ModelOpen,
}) {
  const CurrentDate = new Date();
  const BookingStartDate = new Date(booking.rentalStartDate);
  const BookingEndDate = new Date(booking.rentalEndDate);

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col w-[300px] transition duration-300 hover:shadow-xl">
      <img
        src={`http://localhost:3000/uploads/${booking.carDetails.images[0]}`}
        alt={`${booking.carDetails.carBrand} ${booking.carDetails.carModel}`}
        className="w-full h-48 object-contain bg-gray-100"
      />

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-800 truncate">
            {booking.carDetails.carBrand} {booking.carDetails.carModel}
          </h3>
          <p className="text-sm text-gray-500">{booking.carDetails.carType}</p>
        </div>

        <div className="flex justify-between items-center mb-3">
          <p className="flex items-center text-sm text-purple-600 font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75L12 6.75m0 0l2.25 3m-2.25-3v10.5"
              />
            </svg>
            {booking.carDetails.transmission}
          </p>

          {CurrentDate <= BookingEndDate && (
            <Link to={`/customer/CarDetailsScreen/${booking._id}`}>
              <button className="text-xs text-blue-600 hover:underline">
                Extend Booking
              </button>
            </Link>
          )}
        </div>

        <p className="text-base font-semibold text-gray-800 mb-2">
          PKR {booking.carDetails.rentRate} / day
        </p>

        <div className="flex flex-col gap-2">
          {booking.status === "returned" ? (
            <p className="text-green-600 font-bold text-sm">✔️ Completed</p>
          ) : booking.carDetails.availability === "In Maintenance" ? (
            <>
              <p className="text-red-600 font-bold text-sm">
                🛠️ In Maintenance
              </p>
              <p className="text-red-600 font-bold text-sm">⏳ Payment Due</p>
              <button
                onClick={() => handleSeeDetails(booking)}
                className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition"
              >
                See Details
              </button>
            </>
          ) : booking.status === "return initiated" ? (
            <p className="text-red-600 font-bold text-sm">⏳ Pending Return</p>
          ) : CurrentDate >= BookingEndDate ? (
            <button
          onClick={()=>ReturnCar(booking._id)}
              className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
            >
              🔙 Return Car
            </button>
          ) : CurrentDate > BookingStartDate ? (
            <p className="text-blue-600 font-semibold text-sm">
              🚀 Your Booking Starts Now
            </p>
          ) : (
            <>
              <button
                onClick={() => setModelOpen(true)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition"
              >
                ✏️ Update Booking
              </button>
              <button
                onClick={() => {
                  setSelectedBooking(booking._id);
                  setShowDialog(true);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
              >
                ❌ Cancel Booking
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => openDialog(booking)}
          className="mt-3 text-xs text-blue-600 font-medium hover:underline"
        >
          📄 View Details
        </button>
      </div>

      {/* Edit Booking Modal */}
      <EditBookingModal
        booking={booking}
        isOpen={ModelOpen}
        onClose={() => setModelOpen(false)}
      />
    </div>
  );
}

export default BookingCard;
