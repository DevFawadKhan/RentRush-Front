import { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../Toast";
// import ConfirmationDialog from './ConfirmationDialog';
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
    setConfirmDialog(false);
  };
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
          rentalStartDate: rentalStartDate,
          rentalEndDate: rentalEndDate,
          rentalStartTime: rentalStartTime,
          rentalEndTime: rentalEndTime,
        },
        { withCredentials: true },
      );
      console.log("Response:", res.data);
      if (res.status === 200) {
        Toast(res.data.message, "success");
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
            </>,
          );
        }
      }

      handleClose();
    } catch (error) {
      console.error(
        "Error in Extend booking:",
        error.response?.data?.message || error.message,
      );
      Toast(error.response?.data?.message || "An error occurred", "error");
    }
  };

  // USEEFFECT FOR DETAILS DIALOG
  useEffect(() => {
    if (confirmDialog) {
    }
  }, [confirmDialog]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
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
              onClick={handleClose}
              className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
        {confirmDialog && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleClose} // Close dialog when clicking outside
          >
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 h-auto max-h-[90vh] overflow-y-auto p-6 relative">
              {/* Close Button */}
              <button
                // onClick={()=>setModelVisible(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
              >
                &times;
              </button>

              {/* Modal Title */}
              <h2 className="text-3xl font-bold text-center mb-4">
                {booking?.carId?.carBrand} {booking?.carId?.carModel}
              </h2>

              {/* Car Images */}
              <div className="flex justify-center gap-3 mb-6 flex-wrap">
                {booking?.carId?.images.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:3000/uploads/${img}`}
                    alt={`Car ${index}`}
                    className="w-full max-w-md h-48 object-cover rounded-lg border shadow-md cursor-pointer hover:scale-105 transition-transform"
                  />
                ))}
              </div>
              {/* Combined Table for Booking and Car Details */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border text-sm">
                  <tbody>
                    {/* Row 1: Booking Details */}
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-bold">Booked By</td>

                      <td className="border p-2">
                        {sessionStorage.getItem("name")}
                      </td>
                      <td className="border p-2 font-bold">Renting Period</td>
                      <td className="border p-2">
                        {rentalStartDate}-{rentalStartTime}-{rentalEndDate}-
                        {rentalEndTime}
                      </td>
                    </tr>
                    {/* Row 2: Car Details */}
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-bold">Car Model</td>
                      <td className="border p-2">{booking?.carId?.carModel}</td>
                      <td className="border p-2 font-bold">Color</td>
                      <td className="border p-2">{booking?.carId?.color}</td>
                    </tr>

                    {/* Row 3: Additional Car Details */}
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-bold">Mileage</td>
                      <td className="border p-2">
                        {booking?.carId?.mileage} miles
                      </td>
                      <td className="border p-2 font-bold">Transmission</td>
                      <td className="border p-2">
                        {booking?.carId.transmission}
                      </td>
                    </tr>

                    {/* Row 4: Additional Car Details */}
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-bold">Engine Type</td>
                      <td className="border p-2">
                        {booking?.carId.engineType}
                      </td>
                      <td className="border p-2 font-bold">
                        Registration Year
                      </td>
                      <td className="border p-2">{booking?.carId.year}</td>
                    </tr>

                    {/* Row 5: Additional Car Details */}
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-bold">Body Type</td>
                      <td className="border p-2">{booking?.carId?.bodyType}</td>
                      <td className="border p-2 font-bold">Price</td>
                      <td className="border p-2 font-bold">
                        {booking?.carId.rentRate} rs/Day
                      </td>
                    </tr>

                    {/* Row 6: Additional Car Details */}
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-bold">Showroom Name</td>

                      <td className="border p-2">
                        {booking.showroomId?.showroomName}
                      </td>
                      <td className="border p-2 font-bold">Showroom Address</td>
                      <td className="border p-2">
                        {booking?.showroomId?.address}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  className="text-red-200 text-center bg-black px-2 py-2 mt-3 hover:bg-slate-600"
                >
                  Confirm booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBookingModal;
