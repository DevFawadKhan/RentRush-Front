import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Toast from "../Toast";
import EditBookingModal from "./EditBooking.jsx";
import ConfirmationDialog from "./ConfirmationDialog.jsx";
import Dialog from "./Dialog";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Base_Url = import.meta.env.VITE_API_URL;

const UserBookings = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ModelOpen, setModelOpen] = useState(false);
  const [ShowDialog, setShowDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [car, setCar] = useState(null);
  const currentDate = new Date().toLocaleDateString("en-PK");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null); // Track the selected booking for the dialog
  const [progress, setProgress] = useState(0);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [maintenanceDetails, setMaintenanceDetails] = useState(null);

  const handleSeeDetails = (booking) => {
    setSelectedBookingDetails(booking);
    setShowMaintenanceModal(true);
  };

  useEffect(() => {
    if (selectedBookingDetails) {
      const { rentalStartDate, rentalEndDate, rentalStartTime, rentalEndTime } =
        selectedBookingDetails;

      const convertTo24HourFormat = (time) => {
        try {
          if (typeof time !== "string")
            throw new Error("Input must be a string.");

          const [timePart, modifier] = time.trim().split(" ");
          if (
            !timePart ||
            !modifier ||
            !["AM", "PM"].includes(modifier.toUpperCase())
          ) {
            throw new Error(
              "Invalid time format. Expected format like '03:45 PM'."
            );
          }

          const [hoursStr, minutesStr] = timePart.split(":");
          if (!hoursStr || !minutesStr) {
            throw new Error(
              "Invalid time component. Hours and minutes are required."
            );
          }

          let hours = parseInt(hoursStr, 10);
          let minutes = parseInt(minutesStr, 10);

          if (
            isNaN(hours) ||
            isNaN(minutes) ||
            hours < 1 ||
            hours > 12 ||
            minutes < 0 ||
            minutes > 59
          ) {
            throw new Error("Invalid numeric values for hours or minutes.");
          }

          if (modifier.toUpperCase() === "PM" && hours !== 12) hours += 12;
          if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;

          setMaintenanceDetails(
            selectedBookingDetails?.carDetails?.maintenanceLogs.filter(
              (log) => log.bookingId === selectedBookingDetails._id
            )
          );

          return { hours, minutes };
        } catch (error) {
          console.error("Time conversion error:", error.message);
          return null; // or throw the error if you want to handle it upstream
        }
      };

      const { hours: startHour, minutes: startMinute } =
        convertTo24HourFormat(rentalStartTime);
      const { hours: endHour, minutes: endMinute } =
        convertTo24HourFormat(rentalEndTime);

      const start = new Date(rentalStartDate);
      start.setHours(startHour, startMinute, 0);

      const end = new Date(rentalEndDate);
      end.setHours(endHour, endMinute, 0);

      const now = Date.now();

      if (now >= start.getTime() && now <= end.getTime()) {
        const totalDuration = end.getTime() - start.getTime();
        const elapsedTime = now - start.getTime();
        const progressPercentage = (elapsedTime / totalDuration) * 100;
        setProgress(progressPercentage);
      } else if (now > end.getTime()) {
        setProgress(100); // Booking complete
      } else {
        setProgress(0); // Booking not started
      }
    }
  }, [selectedBookingDetails]);

  // Function to open the dialog
  const openDialog = (booking) => {
    setSelectedBookingDetails(booking); // Set the selected booking details
    setIsDialogOpen(true); // Open the dialog
  };

  // Function to close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false); // Close the dialog
    setSelectedBookingDetails(null); // Clear the selected booking details
  };

  const openDetailsModal = (carDetails) => {
    setCar(carDetails);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setCar(null);
  };

  // Fetch my booking
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Base_Url}/api/bookcar/my-bookings`, {
        withCredentials: true,
      });

      if (
        response.status === 200 &&
        response.data &&
        response.data.length > 0
      ) {
        setBookings(response.data);
        console.log("booking from array", response.data);
        console.log(
          "bookings from showrrrom",
          selectedBookingDetails?.showroomDetails?.showroomName
        );
        setError("");
      } else if (response.status === 204) {
        setError("You have no active bookings, book a car first.");
        Toast("You have no active bookings, book a car first.", "error");
        setBookings([]);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError("You have no active bookings, book a car first.");
          Toast("You have no active bookings, book a car first.", "error");
        } else {
          setError("Server error. Please try again later.");
        }
      } else if (err.request) {
        setError("API is not working, failed to fetch bookings.");
      } else {
        setError("Failed to fetch bookings.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Return Car API CALL
  const ReturnCar = async (BookingId) => {
    try {
      const response = await axios.post(
        `${Base_Url}/api/bookcar/returncar/${BookingId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast(response.data.message, "success");
      }
      console.log("Response return car", response.data.message);

      fetchBookings();
    } catch (error) {
      console.log("ERROR IN RETURN CAR", error.response.data.message);
    }
  };

  // Cancel booking API calling function
  const CancleFunction = async (bookingId) => {
    try {
      const response = await axios.delete(
        `${Base_Url}/api/bookcar/cancel/${bookingId}`,
        {
          withCredentials: true,
        }
      );
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
      Toast("BOOKING DELETED SUCCESSFULLY", "success");
    } catch (error) {
      if (error.response) {
        console.log("Error Response Data:", error.response.data);
        Toast(error.response.data.message, "error");
      } else {
        console.log("Error in cancel booking:", error.message);
      }
    } finally {
      setShowDialog(false); // Close the confirmation dialog
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="px-6 py-8">
        <h2 className="text-3xl font-semibold mb-6">Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-lg text-gray-500">No active bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => {
              if (!booking.carDetails) return null; // Skip if carDetails is not available
              const CurrentDate = new Date();
              const BookingStartDate = new Date(booking?.rentalStartDate);
              const BookingEndDate = new Date(booking?.rentalEndDate);
              const [time, modifier] = booking?.StartTime.split(" ");
              let [hours, minutes] = time.split(":").map(Number);
              if (modifier === "PM" && hours !== 12) hours += 12;
              if (modifier === "AM" && hours === 12) hours = 0;
              // Date + Time ko combine karo
              BookingStartDate.setHours(hours);
              BookingStartDate.setMinutes(minutes);
              BookingStartDate.setSeconds(0);
              const [time1, modifier1] = booking?.rentalEndTime.split(" ");
              let [hours1, minutes1] = time1.split(":").map(Number);
              if (modifier1 === "PM" && hours1 !== 12) hours1 += 12;
              if (modifier1 === "AM" && hours1 === 12) hours1 = 0;
              // Date + Time ko combine karo
              BookingEndDate.setHours(hours1);
              BookingEndDate.setMinutes(minutes1);
              BookingEndDate.setSeconds(0);

              return (
                <div
                  key={booking._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
                  style={{ width: "100%" }}
                >
                  <div className="flex justify-between items-center p-4 border-b">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {booking.carDetails.carBrand}{" "}
                        {booking.carDetails.carModel}
                      </h3>
                      <p className="text-gray-500">
                        {booking.carDetails.carType}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => openDialog(booking)}
                        className="text-blue-600 font-semibold"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  <img
                    src={`/uploads/${booking.carDetails.images[0]}`}
                    alt={`${booking.carDetails.carBrand} ${booking.carDetails.carModel}`}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />

                  <div className="p-4 flex justify-between items-center">
                    <p className="flex items-center text-sm text-purple-600">
                      <span className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75L12 6.75m0 0l2.25 3m-2.25-3v10.5"
                          />
                        </svg>
                      </span>
                      {booking.carDetails.transmission}
                    </p>

                    {new Date(Date.now()).toDateString() >=
                    new Date(booking.rentalStartDate).toDateString() ? (
                      <Link to={`/customer/CarDetailsScreen/${booking._id}`}>
                        <button className="text-blue-600 hover:underline text-sm">
                          Extend Booking
                        </button>
                      </Link>
                    ) : null}
                  </div>

                  <p className="px-4 text-lg font-semibold">
                    {booking.carDetails.rentRate} Rs/d
                  </p>

                  <div className="p-4 flex flex-col gap-3">
                    {booking?.status === "returned" ? (
                      <p className="text-green-600 font-bold">Completed</p>
                    ) : booking?.carDetails.availability ===
                      "In Maintenance" ? (
                      <>
                        <p className="text-red-600 font-bold">In Maintenance</p>
                        <button
                          onClick={() => handleSeeDetails(booking)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                          See Details
                        </button>
                      </>
                    ) : booking?.status === "return initiated" ? (
                      <p className="text-red-600 font-bold">Pending Return</p>
                    ) : CurrentDate >= BookingEndDate ? (
                      <button
                        onClick={() => ReturnCar(booking._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Return Car
                      </button>
                    ) : CurrentDate > BookingStartDate ? (
                      "YOUR BOOKING STARTS NOW"
                    ) : (
                      <>
                        <button
                          onClick={() => setModelOpen(true)}
                          className="bg-blue-300 px-4 py-2 rounded-lg"
                        >
                          Update Booking
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBooking(booking._id);
                            setShowDialog(true);
                          }}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                          Cancel Booking
                        </button>
                      </>
                    )}
                  </div>

                  {/* Edit Booking Modal */}
                  <EditBookingModal
                    booking={booking}
                    isOpen={ModelOpen}
                    onClose={() => setModelOpen(false)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && car && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={closeDetailsModal}
        >
          <div
            className="bg-white p-6 rounded-lg relative w-11/12 md:w-3/4 lg:w-1/2 h-auto max-h-[90vh] overflow-y-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeDetailsModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold text-center mb-4">
              {car.carBrand} {car.carModel}
            </h2>
            <div className="flex justify-center gap-3 mb-6 flex-wrap">
              {car.images?.map((img, index) => (
                <img
                  key={index}
                  src={`/uploads/${img}`}
                  alt={`Car ${index}`}
                  className="w-full max-w-md h-48 object-cover rounded-lg border shadow-md cursor-pointer hover:scale-105 transition-transform"
                />
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border text-sm">
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-2 font-bold">Model</td>
                    <td className="border p-2">{car.carModel}</td>
                  </tr>
                  {/* More rows for car details */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {ShowDialog && (
        <ConfirmationDialog
          message="Are you sure you want to cancel this booking?"
          onCancel={() => setShowDialog(false)}
          onConfirm={() => CancleFunction(selectedBooking)}
        />
      )}

      {/* Booking Details Dialog */}
      {isDialogOpen && selectedBookingDetails && (
        <Dialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          car={selectedBookingDetails.carDetails}
          showroom={selectedBookingDetails.showroomDetails}
          bookingDetails={{
            customerName: selectedBookingDetails.customerName,
            startDateTime: selectedBookingDetails.rentalStartDate,
            endDateTime: selectedBookingDetails.rentalEndDate,
            starttime: selectedBookingDetails.rentalStartTime,
            endtime: selectedBookingDetails.rentalEndTime,
          }}
          progress={progress} // Pass the progress state
        />
      )}
      {showMaintenanceModal && maintenanceDetails && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setShowMaintenanceModal(false)}
        >
          <div
            className="bg-white p-8 rounded-2xl relative w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowMaintenanceModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold transition duration-300"
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="text-4xl font-bold text-center text-gray-800 mb-6 border-b pb-2">
              🚗 Maintenance Details
            </h2>

            <div className="space-y-6">
              {maintenanceDetails.length > 0 ? (
                maintenanceDetails.map((log, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 transition hover:shadow-md"
                  >
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      🗓️ Date:{" "}
                      <span className="font-normal">
                        {new Date(log.date).toLocaleDateString()}
                      </span>
                    </p>

                    <div className="mb-3">
                      <p className="font-semibold text-gray-600 mb-1">
                        🔧 Repair Tasks Performed On:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {log.tasks.map((task, taskIndex) => (
                          <li key={taskIndex}>
                            <span className="font-medium">
                              {Object.keys(task)[0]}
                            </span>{" "}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-3">
                      <p className="font-semibold text-gray-600 mb-1">
                        📝 Repair Descriptions:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {log.repairDescriptions.map((desc, descIndex) => (
                          <li key={descIndex}>
                            <span className="font-medium">
                              {Object.keys(desc)[0]}:
                            </span>{" "}
                            {desc[Object.keys(desc)[0]]}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-600 mb-1">
                        💰 Repair Costs:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {log.repairCosts.map((cost, costIndex) => (
                          <li key={costIndex}>
                            <span className="font-medium">
                              {Object.keys(cost)[0]}:
                            </span>{" "}
                            Rs. {cost[Object.keys(cost)[0]]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 font-medium">
                  No maintenance logs found for this car.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBookings;
