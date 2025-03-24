import React, { useState, useEffect } from "react";
import { CircleGauge, Fuel, GripHorizontal } from "lucide-react";
import axios from "axios";
import Toast from "../Toast";
const Base_Url = import.meta.env.VITE_API_URL;

const UserCard = ({ car }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [rentalStartDate, setRentalStartDate] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");
  const [rentalStartTime, setRentalStartTime] = useState("");
  const [rentalEndTime, setRentalEndTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [ShowDialog, setShowDialog] = useState(false)
  const [ModelVisible, setModelVisible] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting booking request...");
    try {
      const response = await axios.post(
        `${Base_Url}/api/bookcar/book`,
        {
          carId: car._id,
          showroomId: car.userId,
          rentalStartDate,
          rentalStartTime,
          rentalEndDate,
          rentalEndTime,
        },
        { withCredentials: true }
      );
      console.log("Response received:", response.data);
      Toast(response.data.message);
      const invoiceUrl = response.data.invoiceUrl;
      setModelVisible(false)
      if (invoiceUrl) {
        Toast(
          <>
            {response.data.message}{" "}
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
  
      closeBookingModal();
    } catch (error) {
      console.error("Error occurred during booking:", error);
      console.error("Backend Error Response:", error.response?.data); // Log the backend error response
      setErrorMessage(error.response?.data?.message || "An error occurred");
    }
  };

  const openDetailsModal = () => {
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const openBookingModal = () => {
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
  };
  // USEFFECT FOR  OPEN DIALOG DETAILS
  useEffect(() => {
    console.log("ShowDialog value:", ShowDialog);
    if (ShowDialog) {
      console.log("Opening dialog");
      setModelVisible(true);
    }
  }, [ShowDialog]);  

  return (
    <>
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-64 relative">
      <div className="relative">
      {/* <h1 className="list-none cursor-pointer font-bold text-[20px] text-[#00004b]">RentRush Cars</h1> */}
        <img
          src={`/uploads/${car.images}`}
          alt={car.name}
          className="w-full h-40 object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg gap-4">{car.name}</h3>
        <button className="text-gray-900 hover:underline">
          {car.carBrand} {car.carModel}
        </button>
        <div className="grid grid-cols-3 gap-4 text-sm text-black my-2">
          <div className="flex flex-col items-center">
            <CircleGauge />
            <span className="text-gray-500">{car.mileage}</span>
          </div>
          <div className="flex flex-col items-center">
            <Fuel />
            <h1 className="text-gray-500"> Petrol</h1>
            <span className="text-gray-500">{car.fuelType}</span>
          </div>
          <div className="flex flex-col items-center">
            <GripHorizontal />
            <span className="text-gray-500">{car.transmission}</span>
          </div>
        </div>
        <div className="flex justify-between items-center pb-4">
          <span className="text-xl font-bold">{car.rentRate}rs/Day</span>
          <button
            onClick={openDetailsModal}
            className="text-blue-600 hover:underline"
          >
            View Details
          </button>
        </div>

        <div className="flex justify-between items-center pb-4">
          <button
            onClick={openBookingModal}
            className="bg-primary text-white p-2 rounded-md"
          >
            Book Now
          </button>
        </div>
      </div>

      {showDetailsModal && (
  <div
    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    onClick={closeDetailsModal} // Close modal when clicking outside
  >
    <div
      className="bg-white p-6 rounded-lg relative w-11/12 md:w-3/4 lg:w-1/2 h-auto max-h-[90vh] overflow-y-auto shadow-lg"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
    >
      {/* Close Button */}
      <button
        onClick={closeDetailsModal}
        className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
      >
        &times;
      </button>

      {/* Car Name */}
      <h2 className="text-3xl font-bold text-center mb-4">{car.name}</h2>

      {/* Main Car Image */}
      {/* { <div className="flex justify-center mb-6">
        <img
          src={`Rentrush-frontend/Public/uploads/${car.images}`}
          alt={car.name}
          className="w-full max-w-md h-48 object-cover rounded-lg border shadow-md"
        />
      </div>} */}

      { <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {car.images?.length > 0
          ? car.images.map((img, index) => (
              <img
                key={index}
                src={`/uploads/${img}`}
                alt={`Car ${index}`}
                className="w-full max-w-md h-48 object-cover rounded-lg border shadow-md cursor-pointer hover:scale-105 transition-transform"
              />
            ))
          : [...Array(4)].map((_, i) => (
              <img
                key={i}
                src={car.image}
                alt={`Car Image ${i}`}
                className="w-20 h-16 md:w-24 md:h-20 object-cover rounded-lg border shadow-md"
              />
            ))}
      </div> }

      {/* Car Details Table */}
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
      
{showBookingModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg relative h-auto w-96">
                        <button
                            onClick={closeBookingModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black"
                        >
                            &#10005;
                        </button>

                        <h2 className="text-2xl font-bold mb-4 text-center">Book Car Now</h2>

                        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

                        <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
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
    onClick={() => {
        if (rentalStartDate && rentalEndDate && rentalEndTime&&rentalStartTime) { // yahan required fields check karo
          setShowDialog(true);
        } else {
            alert('Please fill all fields');
        }
    }}
    type="submit"
    className="bg-primary text-white p-2 rounded-md w-full"
>
    Confirm Booking
</button>
                        </form>
                    </div>
                </div>
            )}
            {ModelVisible&&(<div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      // onClick={onClose} // Close dialog when clicking outside
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 h-auto max-h-[90vh] overflow-y-auto p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={()=>setModelVisible(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-3xl font-bold text-center mb-4">
          {car.carBrand} {car.carModel}
        </h2>

        {/* Car Images */}
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
        {/* Combined Table for Booking and Car Details */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border text-sm">
            <tbody>
              {/* Row 1: Booking Details */}
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-bold">Booked By</td>
                
                <td className="border p-2">{localStorage.getItem('name')}</td>
                <td className="border p-2 font-bold">Renting Period</td>
                <td className="border p-2">
                  {rentalStartDate} - {rentalEndDate}
                </td>
              </tr>
              {/* Row 2: Car Details */}
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-bold">Car Model</td>
                <td className="border p-2">{car.carModel}</td>
                <td className="border p-2 font-bold">Color</td>
                <td className="border p-2">{car.color}</td>
              </tr>

              {/* Row 3: Additional Car Details */}
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-bold">Mileage</td>
                <td className="border p-2">{car.mileage} miles</td>
                <td className="border p-2 font-bold">Transmission</td>
                <td className="border p-2">{car.transmission}</td>
              </tr>

              {/* Row 4: Additional Car Details */}
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-bold">Engine Type</td>
                <td className="border p-2">{car.engineType}</td>
                <td className="border p-2 font-bold">Registration Year</td>
                <td className="border p-2">{car.year}</td>
              </tr>

              {/* Row 5: Additional Car Details */}
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-bold">Body Type</td>
                <td className="border p-2">{car.bodyType}</td>
                <td className="border p-2 font-bold">Price</td>
                <td className="border p-2 font-bold">{car.rentRate} rs/Day</td>
              </tr>

              {/* Row 6: Additional Car Details */}
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-bold">Showroom Name</td>
                
                <td className="border p-2">{car.userId?.showroomName}</td>
                <td className="border p-2 font-bold">Showroom Address</td>
                <td className="border p-2">{car.userId?.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
    <button onClick={handleSubmit} className="text-red-200 text-center bg-black px-2 py-2 mt-3">Confirm booking</button>
</div>
      </div>
    </div>)}
    </div>
</>
  );
};

export default UserCard;

