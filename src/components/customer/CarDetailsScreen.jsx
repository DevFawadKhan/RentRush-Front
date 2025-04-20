import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Toast from "../Toast";
import { toast } from "react-toastify";
const Base_Url = import.meta.env.VITE_API_URL;
const CarDetailsScreen = () => {
  // State for Extend Booking modal
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [rentalStartDate, setRentalStartDate] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");
  const [rentalEndTime, setRentalEndTime] = useState("");
  const [rentalStartTime, setRentalStartTime] = useState("");
  const [image, setimage] = useState([]);
  const [Price, setPrice] = useState(0);
  const [BookingDetails, setBookingDetails] = useState([]);
  // USESTATE FOR EndDate and EndTime POST ON EDIT BOOKING API
  const [EndDate, setEndDate] = useState("");
  const [EndTime, setEndTime] = useState("");
  // State for progress and time left
  const [progress, setProgress] = useState(0);
  const { bookingId } = useParams(); // GET BOOKING ID FROM URL
  console.log("booking id", bookingId);

  useEffect(() => {
    const FetchBookingDetail = async () => {
      try {
        const res = await axios.get(
          `${Base_Url}/api/bookcar/bookcar-detail/${bookingId}`,
          {
            withCredentials: true,
          },
        );
        console.log("response from booking detail", res.data);

        setRentalStartDate(res.data.rentalStartDate);
        setRentalEndDate(res.data.rentalEndDate);
        setRentalStartTime(res.data.rentalStartTime);
        setRentalEndTime(res.data.rentalEndTime);
        setPrice(res.data.totalPrice);
        setimage(res.data.images);

        const booking = res.data;
        const startDate = new Date(booking.rentalStartDate);
        const endDate = new Date(booking.rentalEndDate);

        // ✅ Fix for same date booking (count as 1 day)
        let totalDays = Math.ceil(
          (endDate - startDate) / (1000 * 60 * 60 * 24),
        );
        if (totalDays === 0) totalDays = 1;

        // ✅ Handle timing for same date booking
        let totalHours = 0;

        if (
          booking.rentalStartDate === booking.rentalEndDate &&
          booking.rentalStartTime &&
          booking.rentalEndTime
        ) {
          // ✅ Convert to 24-hour format
          const convertTo24HourFormat = (time) => {
            const [timePart, modifier] = time.split(" ");
            let [hours, minutes] = timePart.split(":").map(Number);
            if (modifier === "PM" && hours !== 12) hours += 12;
            if (modifier === "AM" && hours === 12) hours = 0;
            return { hours, minutes };
          };

          const { hours: startHour, minutes: startMinute } =
            convertTo24HourFormat(booking.rentalStartTime);
          const { hours: endHour, minutes: endMinute } = convertTo24HourFormat(
            booking.rentalEndTime,
          );

          totalHours = endHour - startHour + (endMinute - startMinute) / 60;

          // ✅ Handle negative values in case of incorrect time order
          if (totalHours < 0) totalHours = 0;
        } else if (startDate && endDate) {
          totalHours = (endDate - startDate) / (1000 * 60 * 60);
        }

        setBookingDetails({
          ...booking,
          totalHours: isNaN(totalHours) ? "0.00" : totalHours.toFixed(2), // ✅ Prevent NaN
          totalDays,
        });
      } catch (error) {
        console.log("ERROR IN EXTEND BOOKING", error.message);
      }
    };

    if (bookingId) {
      FetchBookingDetail();
    }
  }, [bookingId]);

  // USE Effect for Progress Bar
  useEffect(() => {
    if (rentalStartDate && rentalEndDate && rentalStartTime && rentalEndTime) {
      const convertTo24HourFormat = (time) => {
        const [timePart, modifier] = time.split(" ");
        let [hours, minutes] = timePart.split(":").map(Number);
        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;
        return { hours, minutes };
      };

      // ✅ Start date + time ko combine karo
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
        setProgress(100); // ✅ Booking complete
      } else {
        setProgress(0); // ✅ Booking abhi start nahi hui
      }
    }
  }, [rentalStartDate, rentalEndDate, rentalStartTime, rentalEndTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EndDate || !EndTime) {
      Toast("All Fields are required", "error");
      return;
    }

    const rentalEndDateTime = new Date(`${EndDate}T${EndTime}:00`);
    console.log("Rental End DateTime:", rentalEndDateTime);

    if (rentalEndDateTime <= new Date()) {
      return Toast("End date and time must be in the future", "error");
    }

    try {
      const res = await axios.patch(
        `${Base_Url}/api/bookcar/extend-booking/${bookingId}`,
        {
          rentalEndDate: EndDate,
          rentalEndTime: EndTime,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Response:", res.data);

      if (res.status === 200) {
        Toast(
          <>
            Please Generate your Updated invoice{" "}
            <a
              href={res.data.invoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Click here to download the Invoice
            </a>
          </>,
        );
      } else {
        Toast(res?.data?.message || "An error occurred", "error");
      }
    } catch (error) {
      console.error(
        "Error in Extend booking:",
        error.response?.data?.message || error.message,
      );
      Toast(error.response?.data?.message || "An error occurred", "error");
    }

    setEndDate("");
    setEndTime("");
    setShowBookingModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        {/* Car Image */}
        <div className="mb-6">
          <img
            src={`/uploads/${image[0]}`}
            alt={image}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        {/* Progress Bar */}
        <div className="mb-6 w-full max-w-[90vw] sm:max-w-[600px]">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full animate-pulse"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            {progress === 100 ? "Booking complete" : "Time Left"}
          </p>
        </div>

        {/* Details Table */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-700">Rental Start Date</span>
            <span className="text-gray-900 font-semibold">
              {rentalStartDate}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Rental End Date</span>
            <span className="text-gray-900 font-semibold">{rentalEndDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Rental Duration</span>
            <span className="text-gray-900 font-semibold">
              {Math.ceil(BookingDetails.totalDays)}
              {" day"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Rental Hours</span>
            <span className="text-gray-900 font-semibold">
              {BookingDetails.totalHours}
            </span>
          </div>
        </div>

        {/* Total Amount */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between">
            <span className="text-lg font-bold text-gray-800">
              Total Amount
            </span>
            <span className="text-lg font-bold text-gray-800">{Price}</span>
          </div>
        </div>

        {/* Extend Booking Button */}
        <div className="mt-6">
          <button
            onClick={() => setShowBookingModal(true)}
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
                onClick={() => setShowBookingModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
              >
                {" "}
                &#10005;
              </button>
              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label htmlFor="endDate" className="text-sm font-semibold">
                    Rental End Date
                  </label>
                  <input
                    value={EndDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    type="date"
                    className="border p-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="endTime" className="text-sm font-semibold">
                    Rental End Time
                  </label>
                  <input
                    value={EndTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    type="time"
                    className="border p-2 rounded-md"
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
