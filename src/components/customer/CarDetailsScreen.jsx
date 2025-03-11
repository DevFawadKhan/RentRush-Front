import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
const Base_Url = import.meta.env.VITE_API_URL;
const CarDetailsScreen = () => {
    // State for Extend Booking modal
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [rentalStartDate, setRentalStartDate] = useState("");
    const [rentalEndDate, setRentalEndDate] = useState("");
    const [rentalStartTime, setRentalStartTime] = useState("");
    const [rentalEndTime, setRentalEndTime] = useState("");
    const [Price, setPrice] = useState(0);  
    // const [hours, sethours] = useState(0);
    // const [days, setdays] = useState(0);
    // let Total_Days=null;
    // let Total_hours=null;
    // let difference_millisecond
    // let EndDate
    // let StartDate
  const { bookingId } = useParams(); // GET BOOKING ID FROM URL
  console.log("booking id", bookingId);
  
  useEffect(() => {
    const FetchBookingDetail = async () => {
      try {
        const res = await axios.get(`${Base_Url}/api/bookcar/bookcar-detail/${bookingId}`,{
          withCredentials: true,
        });
        console.log("response from booking detail", res.data);
        setRentalStartDate(res.data.rentalStartDate)
        setRentalEndDate(res.data.rentalEndDate)
        setRentalStartTime(res.data.rentalStartTime)
        setRentalEndTime(res.data.rentalEndDate)
        setPrice(res.data.totalPrice)
        //  StartDate=new Date(rentalStartDate)
        //  EndDate=new Date(rentalEndDate)
        //  difference_millisecond=EndDate-StartDate;
        //  Total_hours=difference_millisecond/ (1000 * 60 * 60);
        //  Total_Days=difference_millisecond / (1000 * 60 * 60 * 24);
        // console.log("TOTAL HOURS",Total_hours);
        // console.log("Total Days",Total_Days);
      } catch (error) {
        console.log("ERROR IN", error.message);
      }
    };
    if (bookingId) {
      FetchBookingDetail();
    }
  }, [bookingId]);
  
  // State for progress and time left
  // const [progress, setProgress] = useState(0);
  // const [timeLeft, setTimeLeft] = useState("");

  // Calculate progress and time left
  // useEffect(() => {
  //   const startDate = new Date(car.rentalStartDate);
  //   const endDate = new Date(car.rentalEndDate);
  //   const now = new Date();

  //   // Calculate total duration in milliseconds
  //   const totalDuration = endDate - startDate;

  //   // Calculate elapsed time in milliseconds
  //   const elapsedTime = now - startDate;

  //   // Calculate progress percentage
  //   const progressPercentage = Math.min(100, (elapsedTime / totalDuration) * 100);
  //   setProgress(progressPercentage);

  //   // Calculate time left
  //   const timeLeftMs = endDate - now;
  //   if (timeLeftMs > 0) {
  //     const daysLeft = Math.floor(timeLeftMs / (1000 * 60 * 60 * 24));
  //     const hoursLeft = Math.floor((timeLeftMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     setTimeLeft(`${daysLeft} days ${hoursLeft} hours left`);
  //   } else {
  //     setTimeLeft("Rental period has ended");
  //   }
  // }, [car.rentalStartDate, car.rentalEndDate]);

  // Handle Extend Booking button click
  const handleExtendBooking = () => {
    setShowBookingModal(true); // Show the modal
  };

  // Handle modal close
  const closeBookingModal = () => {
    setShowBookingModal(false);
    setErrorMessage(""); // Clear any error messages
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!rentalStartDate || !rentalEndDate || !rentalStartTime || !rentalEndTime) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Perform the booking extension logic here
    console.log("Extending booking with:", {
      rentalStartDate,
      rentalEndDate,
      rentalStartTime,
      rentalEndTime,
    });

    // Close the modal after submission
    closeBookingModal();
  };

  return (
    <>
    <Navbar/>
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      {/* Car Image */}
      <div className="mb-6">
        <img
          src=""
          alt=""
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      {/* Car Name and Price */}
      {/* <h1 className="text-2xl font-bold text-gray-800 mb-4">{car.name}</h1>
      <p className="text-lg text-gray-600 mb-6">{car.price}</p> */}

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            // style={{ width: `${progress}%` }}
          ></div>
        </div>
        {/* <p className="text-sm text-gray-500 mt-2">{timeLeft}</p> */}
      </div>

      {/* Details Table */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-700">Rental Start Date</span>
          <span className="text-gray-900 font-semibold">{rentalStartDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Rental End Date</span>
          <span className="text-gray-900 font-semibold">{rentalEndDate}</span>
        </div>
        {/* <div className="flex justify-between">
          <span className="text-gray-700">Rental Duration</span>
          <span className="text-gray-900 font-semibold">{Total_hours}{"day"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Rental Hours</span>
          <span className="text-gray-900 font-semibold">{Total_Days}</span>
        </div> */}
      </div>

      {/* Total Amount */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between">
          <span className="text-lg font-bold text-gray-800">Total Amount</span>
          <span className="text-lg font-bold text-gray-800">{Price}</span>
        </div>
      </div>

      {/* Extend Booking Button */}
      <div className="mt-6">
        <button
          onClick={handleExtendBooking}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Extend Booking
        </button>
      </div>

      {/* Extend Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg relative h-auto w-96">
            {/* Close Button */}
            <button
              onClick={closeBookingModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              &#10005;
            </button>

            {/* Error Message */}
            {/* {errorMessage && <p className="text-red-500 text-center">{}</p>} */}

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label htmlFor="startDate" className="text-sm font-semibold">
                  Rental Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={rentalStartDate}
                  onChange={(e) => setRentalStartDate(e.target.value)}
                  className="border p-2 rounded-md"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="endDate" className="text-sm font-semibold">
                  Rental End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={rentalEndDate}
                  onChange={(e) => setRentalEndDate(e.target.value)}
                  className="border p-2 rounded-md"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="startTime" className="text-sm font-semibold">
                  Rental Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  value={rentalStartTime}
                  onChange={(e) => setRentalStartTime(e.target.value)}
                  className="border p-2 rounded-md"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="endTime" className="text-sm font-semibold">
                  Rental End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  value={rentalEndTime}
                  onChange={(e) => setRentalEndTime(e.target.value)}
                  className="border p-2 rounded-md"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-md w-full hover:bg-blue-700"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default CarDetailsScreen;
