import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Toast from "../Toast";
import EditBookingModal from './EditBooking.jsx';
import ConfirmationDialog from "./ConfirmationDialog.jsx";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
const Base_Url = import.meta.env.VITE_API_URL;
const UserBookings = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ModelOpen, setModelOpen] = useState(false);
  const [ShowDialog, setShowDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); // Track the selected booking for cancellation
  const [car, setCar] = useState(null); // Track the car for the details modal
  const currentDate = new Date().toLocaleDateString('en-CA'); // 'YYYY-MM-DD' format
  const openDetailsModal = (carDetails) => {
    setCar(carDetails);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setCar(null);
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Base_Url}/api/bookcar/my-bookings`, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data && response.data.length > 0) {
        setBookings(response.data);
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
  const ReturnCar= async (BookingId)=>{
    try {
      const response = await axios.post(
        `${Base_Url}/api/bookcar/returncar/${BookingId}`,
        {}, 
        {
          withCredentials: true,
        }
      );      
      if(response.status==200){
        toast(response.data.message,"success")
      }
      console.log("Response return car",response.data.message);
    } catch (error) {
      console.log("ERROR IN RETURN CAR",error.response.data.message)
    }
  }
  // Cancel booking API calling function
  const CancleFunction = async (bookingId) => {
    try {
      const response = await axios.delete(`${Base_Url}/api/bookcar/cancel/${bookingId}`, {
        withCredentials: true,
      });
      setBookings((prevBookings) => prevBookings.filter(booking => booking._id !== bookingId));
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
      <div className="px-10">
        <h2 className="flex justify-start items-start text-2xl font-bold my-4">
          Bookings
        </h2>
        {bookings.length === 0 ? (
          <p>No active bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white shadow-md rounded-lg p-4 relative"
                style={{ width: "400px", height: "350px" }}
              >
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="font-bold text-lg">
                      {booking.carDetails.carBrand} {booking.carDetails.carModel}
                    </h3>
                    <p className="text-gray-500">{booking.carDetails.carType}</p>
                  </div>
                  <div className="text-gray-500">
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 6.75l-6.75 6.75m0 0l-6.75-6.75m6.75 6.75v11.25"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <img
                  src={`/uploads/${booking.carDetails.images[0]}`}
                  alt={`${booking.carDetails.carBrand} ${booking.carDetails.carModel}`}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <div className="flex justify-between items-center mb-2">
                  <p className="flex items-center">
                    <span className="text-purple-600 mr-1">
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
                  {/* Show extend booking button */}
                  {console.log("BOOKING START DATE",booking.startDate)}
      {( new Date(Date.now()).toDateString() >= new Date(booking.startDate).toDateString()) && (
        <Link to={`/customer/CarDetailsScreen/${booking._id}`}>
          <button className="text-blue-600 hover:underline">Extend Booking</button>
        </Link>
      )}
            </div>
                <p className="text-lg font-bold">{booking.carDetails.rentRate} Rs/d</p>
                <div className="space-x-12">
                  {/* Return car button based on EndDate and time*/}
                  {console.log("EndDate",booking.EndDate)}
                  {console.log("EndDTime",booking.EndTime)}   
                  {console.log("CurrentDate",currentDate)}               
                  {currentDate === booking?.EndDate ? (
  <button onClick={()=>ReturnCar(booking._id)} className="bg-red-600 text-white px-2 py-3 font-bold rounded-lg ">Return Car</button>
) : (
  <>
    <button
      onClick={() => setModelOpen(true)}
      className="px-3 py-2 bg-blue-300 rounded-lg"
    >
      Update booking
    </button>
    <button
      onClick={() => {
        setSelectedBooking(booking._id);
        setShowDialog(true);
      }}
      className="bg-red-600 text-white px-2 py-3 font-bold rounded-lg"
    >
      Cancel booking
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
            ))}
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
            <h2 className="text-3xl font-bold text-center mb-4">{car.carBrand} {car.carModel}</h2>
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
                  <tr className="hover:bg-gray-50">
                    <td className="border p-2 font-bold">Color</td>
                    <td className="border p-2">{car.color}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-2 font-bold">Mileage</td>
                    <td className="border p-2">{car.mileage} miles</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-2 font-bold">Body Type</td>
                    <td className="border p-2">{car.bodyType}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-2 font-bold">Transmission</td>
                    <td className="border p-2">{car.transmission}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-2 font-bold">Engine Type</td>
                    <td className="border p-2">{car.engineType || "N/A"}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-2 font-bold">Registration Year</td>
                    <td className="border p-2">{car.year || "N/A"}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-2 font-bold">Price</td>
                    <td className="border p-2 font-bold">{car.rentRate} rs/Day</td>
                  </tr>
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
    </div>
  );
};

export default UserBookings;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";
// import EditBookingModal from "./EditBooking";

// const Base_Url = import.meta.env.VITE_API_URL;

// const UserBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);

//     const fetchBookings = async () => {
//       setLoading(true); // Set loading to true when starting the fetch
//       try {
//         const response = await axios.get(`${Base_Url}/api/bookcar/my-bookings`, {
//           withCredentials: true,
//         });

//         // Handle successful response
//         if (response.status === 200) {
//           if (response.data.length === 0) {
//             setError("You have no active bookings, book a car first.");
//             setBookings([]); // Ensure bookings state is empty
//           } else {
//             setBookings(response.data);
//             setError(""); // Clear any previous error
//           }
//         } else if (response.status === 204) {
//           // No content but successful request
//           setError("You have no active bookings, book a car first.");
//           setBookings([]); // No bookings
//         }
//       } catch (err) {
//         // General error handling
//         if (err.response) {
//           // Server responded with a status code out of the 2xx range
//           if (err.response.status === 404) {
//             setError("You have no active bookings, book a car first."); // Specific message for 404
//           } else {
//             setError("Server error. Please try again later."); // Handle other server errors
//           }
//         } else if (err.request) {
//           // No response received
//           setError("API is not working, failed to fetch bookings.");
//         } else {
//           // Other unexpected errors
//           setError("Failed to fetch bookings.");
//         }
//       } finally {
//         setLoading(false); // Set loading to false after the fetch is complete
//       }
//     };

//     useEffect(() => {
//       fetchBookings();
//     }, []);

//     if (loading) {
//       return <div>Loading...</div>;
//     }

//     if (error) {
//       return <div>{error}</div>;
//     }

//     return (
//       <div>
//         <Navbar />
//         <div className="px-10">
//           <h2 className="flex justify-center items-center text-2xl font-bold my-4">
//             Your Bookings
//           </h2>
//           {bookings.length === 0 ? (
//             <p>No active bookings found.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-60">
//               {bookings.map((booking) => (
//                 <div
//                   key={booking._id}
//                   className="bg-white shadow-md rounded-lg p-4"
//                 >
//                   <img
//                     src={`/uploads/${booking.carDetails.images}`}
//                     alt={`${booking.carDetails.carBrand} ${booking.carDetails.carModel}`}
//                     className="w-full h-60 rounded"
//                   />
//                   <p>
//                     <strong>Car Brand:</strong> {booking.carDetails.carBrand}{" "}
//                     {/* Adjusted to match your schema */}
//                   </p>
//                   <p>
//                     <strong>Car Model:</strong> {booking.carDetails.carModel}{" "}
//                     {/* Adjusted to match your schema */}
//                   </p>
//                   <p>
//                     <strong>Daily Rent:</strong> {booking.carDetails.rentRate}{" "}
//                     Rs/- {/* Adjusted to match your schema */}
//                   </p>
//                   <p>
//                     <strong>Rental Start:</strong>{" "}
//                     {new Date(booking.rentalStartDate).toLocaleString()}
//                   </p>
//                   <p>
//                     <strong>Rental Start Time:</strong> {booking.rentalStartTime}
//                   </p>
//                   <p>
//                     <strong>Rental End:</strong>{" "}
//                     {new Date(booking.rentalEndDate).toLocaleString()}
//                   </p>
//                   <p>
//                     <strong>Rental End Time:</strong> {booking.rentalEndTime}
//                   </p>
//                   <p>
//                     <strong>Total Price:</strong> {booking.totalPrice} Rs/-
//                   </p>
//                   <div className="bottom-4 right-4 space-x-4 my-5">
//                 <button className="bg-green-600 text-white py-2 px-4 rounded">
//                   Edit Details
//                 </button>
//                 <button className="bg-red-600 text-white py-2 px-4 rounded">
//                   Cancel Booking
//                 </button>
//               </div>
//                 </div>

//               ))}

//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   export default UserBookings;