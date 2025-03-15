import { useState, useEffect } from 'react';
import axios from 'axios';
import Toast from "../Toast";
import ConfirmationDialog from './ConfirmationDialog';
const Base_Url = import.meta.env.VITE_API_URL;
const EditBookingModal = ({ booking, isOpen, onClose }) => {
  const [rentalStartDate, setRentalStartDate] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");
  const [rentalStartTime, setRentalStartTime] = useState("");
  const [rentalEndTime, setRentalEndTime] = useState("");
  const [confirmDialog, setConfirmDialog] = useState(false);
  useEffect(() => {
    if (booking) {
      setRentalStartDate(booking.rentalStartDate || "");
      setRentalEndDate(booking.rentalEndDate || "");
      setRentalStartTime(booking.rentalStartTime || "");
      setRentalEndTime(booking.rentalEndTime || "");
      console.log("Booking from props:", booking._id);
    }
  }, [booking]);

  const handleClose = () => {
    setRentalStartDate("");
    setRentalEndDate("");
    setRentalStartTime("");
    setRentalEndTime("");
    onClose();
  };
  // const formatTo12Hour = (date, time) => {
  //   const [hour, minute] = time.split(":");
  //   const formattedHour = hour % 12 || 12;
  //   const period = hour >= 12 ? "PM" : "AM";
  //   return `${date} ${formattedHour}:${minute} ${period}`;
  // };
  const handleSubmit = async () => {
    if (!rentalEndDate || !rentalEndTime) {
      Toast("All Fields are required", "error");
      return;
    }
    try {
      // const formattedEndTime = formatTo12Hour(rentalEndDate, rentalEndTime);
      // console.log("FormattedEndTime:", formattedEndTime);
      const bookingId = booking._id;
      const res = await axios.put(
        `${Base_Url}/api/bookcar/update/${bookingId}`,
        {
          rentalStartDate:rentalStartDate,
          rentalEndDate:rentalEndDate, 
          rentalStartTime:rentalStartTime,
          rentalEndTime:rentalEndTime
        },
        { withCredentials: true }
      );
      console.log("Response:", res.data);
      if(res.status===200){
        Toast(res.data.message,"success");
        const invoiceUrl = res.data.invoiceUrl;
        if (invoiceUrl) {
          Toast(
            <>
              {res.data.message}{" "}
              <a
                href={invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Click here to download the Invoice
              </a>
            </>
          );
        }
      }

      handleClose();
    } catch (error) {
      console.error("Error in Extend booking:", error.response?.data?.message || error.message);
      Toast(error.response?.data?.message || "An error occurred", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Booking</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="block mb-2">
            <span className="text-gray-700">Rental Start Date:</span>
            <input
              type="date"
              value={rentalStartDate}
              onChange={(e) => setRentalStartDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>

          <label className="block mb-2">
            <span className="text-gray-700">Rental End Date:</span>
            <input
              type="date"
              value={rentalEndDate}
              onChange={(e) => setRentalEndDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Rental Start Time:</span>
            <input
              type="time"
              value={rentalStartTime}
              onChange={(e) => setRentalStartTime(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Rental End Time:</span>
            <input
              type="time"
              value={rentalEndTime}
              onChange={(e) => setRentalEndTime(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>
          <div className="flex justify-end">
            <button
              onClick={() => setConfirmDialog(true)}
              type="button"
              className="bg-blue-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-blue-600 transition"
            >
              Confirm Booking
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
        {confirmDialog && (
          <ConfirmationDialog
            onConfirm={handleSubmit}
            message="Are you sure you want to update the car rental period?"
            onCancel={() => setConfirmDialog(false)}
          />
        )}
      </div>
    </div>
  );
};

export default EditBookingModal;
