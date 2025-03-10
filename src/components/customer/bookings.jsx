import  { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Toast from "../Toast";
import EditBookingModal from './EditBooking.jsx';
import ConfirmationDialog from "./ConfirmationDialog.jsx";
const Base_Url = import.meta.env.VITE_API_URL;
const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ModelOpen, setModelOpen] = useState(false)
  const [ShowDialog, setShowDialog] = useState(false)

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Base_Url}/api/bookcar/my-bookings`, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data && response.data.length > 0) {
        setBookings(response.data);
        if (response.data.length === 0) {
          setError("You have no active bookings, book a car first.");
          Toast("You have no active bookings, book a car first.","error")
          setBookings([]);
        } else {
          setBookings(response.data);
          setError("");
        }
      } else if (response.status === 204) {
        setError("You have no active bookings, book a car first.");
        Toast("You have no active bookings, book a car first.","error")
        setBookings([]);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError("You have no active bookings, book a car first.");
          Toast("You have no active bookings, book a car first.","error")
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
// Cancle booking api calling function 
 const CancleFunction=(bookingId)=>{
  try {
    const response=axios.delete(`${Base_Url}/api/bookcar/cancel/${bookingId}`,{
      withCredentials: true,
    }
  )
  setBookings((prevBookings) => {
    const updatedBookings = prevBookings.filter(booking => booking._id !== bookingId);
    console.log("Updated Bookings:", updatedBookings);
    return updatedBookings;
  });
  console.log(response);
  Toast("BOOKING DELETE SUCESSFULLY","success");
  } catch (error) {
    if (error.response) {
    console.log("Error Response Data:", error.response.data); // Backend ka exact response
    console.log("Error Status:", error.response.status); // 400 confirm karne ke liye
    Toast(error.response.data.message,"error")
    } else {
    console.log("error in edit booking", error.message);
    }
  }
 }
  return (
    <div>
      <Navbar/>
      <div className="px-10">
        <h2 className="flex justify-start items-start text-2xl font-bold my-4">
          Bookings
        </h2>
        {bookings.length === 0 ? (
          <p>No active bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white shadow-md rounded-lg p-4 relative"
                style={{ width: "400px", height: "350px" }}
              >
                <div className="flex justify-between items-center mb-3 ">
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
                  {/* <p className="flex items-center">
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
                          d="M16.5 3.75H7.5a4.5 4.5 0 00-4.5 4.5v7.5a4.5 4.5 0 004.5 4.5h9a4.5 4.5 0 004.5-4.5v-7.5a4.5 4.5 0 00-4.5-4.5z"
                        />
                      </svg>
                    </span>
                    {booking.carDetails.seatingCapacity} Seats
                  </p> */}
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
                  <p className="text-blue">Details</p>
                </div>
                <p className="text-lg font-bold">{booking.carDetails.rentRate} Rs/d</p>
                {/* Add button update booking */}
                <div className="space-x-12">
                <button onClick={()=>setModelOpen(true)}  className="px-3 py-2 bg-blue-300 rounded-lg ">Update booking</button>
                <button onClick={()=>setShowDialog(true)}  className="bg-red-600 text-white px-2 py-3 font-bold rounded-lg">Cancle booking</button>
                </div>
                {/* open dialop edit booking model*/}
                <EditBookingModal booking={booking} isOpen={ModelOpen} onClose={()=>setModelOpen(false)}/>
                {/* Cancle Booking dialog */}
              {ShowDialog&&(<ConfirmationDialog message="Are you sure to cancle booking" onCancel={()=>setShowDialog(false)} onConfirm={()=>CancleFunction(booking._id)} />)}
              </div>
            ))}
          </div>
        )}
      </div>
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