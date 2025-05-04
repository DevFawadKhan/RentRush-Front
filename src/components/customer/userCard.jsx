import axios from "axios";
import { CircleGauge, Fuel, GripHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import Toast from "../Toast";
const Base_Url = import.meta.env.VITE_API_URL;
import { 
  FiMapPin, 
  FiX, 
  FiCalendar, 
  FiCheckCircle,
} from "react-icons/fi";

const UserCard = ({ car, handleRefetch }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [rentalStartDate, setRentalStartDate] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");
  const [rentalStartTime, setRentalStartTime] = useState("");
  const [rentalEndTime, setRentalEndTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [ShowDialog, setShowDialog] = useState(false);
  const [ModelVisible, setModelVisible] = useState(false);
  const [minTime, setMinTime] = useState("");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // show one hour deplay
  useEffect(() => {
    const now = new Date();
    now.setHours(now.getHours() + 1); // Add 1 hour

    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const futureTime = `${hours}:${minutes}`;

    setMinTime(futureTime);
    setRentalStartTime(futureTime); // 👈 set default value bhi
  }, []);

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
        { withCredentials: true },
      );
      console.log("Response received:", response.data);
      Toast(response.data.message);
      const invoiceUrl = response.data.invoiceUrl;
      setModelVisible(false);
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
          </>,
        );
      }

      closeBookingModal();
      handleRefetch();
    } catch (error) {
      console.error("Error occurred during booking:", error);
      console.error("Backend Error Response:", error.response?.data); // Log the backend error response
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setRentalStartDate("");
      setRentalEndDate("");
      setRentalStartTime("");
      setRentalEndTime("");
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
            src={`http://localhost:3000/uploads/${car.images[0]}`}
            alt={car.name}
            className="w-full h-40 object-cover"
          />
        </div>

        <div className="p-4">
          <div className="flex justify-between">
            <button className="text-gray-900 font-bold hover:underline">
              {car.carBrand} {car.carModel}
            </button>
            <h3 className="font-bold text-lg">{car.userId?.showroomName}</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm text-black my-2">
            <div className="flex flex-col items-center">
              <CircleGauge />
              <span className="text-gray-500">{car.mileage}</span>
            </div>
            <div className="flex flex-col items-center">
              <Fuel />
              <h1 className="text-gray-500"> </h1>
              <span className="text-gray-500">{car.fuelType}</span>
            </div>
            <div className="flex flex-col items-center">
              <GripHorizontal />
              <span className="text-gray-500">{car.transmission}</span>
            </div>
          </div>
          <div className="flex justify-between items-center pb-4">
            <span className="text-xl font-bold">{car.rentRate}Rs/Day</span>
            <button
              onClick={openDetailsModal}
              className="text-blue-600 hover:underline"
            >
              View Details
            </button>
          </div>
          <div className="flex justify-between items-center pb-4">
            {car?.availability === "Available" ? (
              <button
                onClick={openBookingModal}
                className="bg-primary text-white p-2 rounded-md"
              >
                Book Now
              </button>
            ) : (
              <button className="bg-red-700 text-white p-2 rounded-md">
                Rented Out
              </button>
            )}
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
              <h2 className="text-3xl font-bold text-center mb-4">
                {car.name}
              </h2>

              {
                <div className="flex justify-center gap-3 mb-6 flex-wrap">
                  {car.images?.length > 0
                    ? car.images.map((img, index) => (
                        <img
                          key={index}
                          src={`http://localhost:3000/uploads/${img}`}
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
                </div>
              }

              {/* Car Details Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border text-20px">
                  <tbody>
                  <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-bold">Brand</td>
                      <td className="border p-2">{car.carBrand}</td>
                    </tr>
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
                      <td className="border p-2 font-bold">
                        Registration Year
                      </td>
                      <td className="border p-2">{car.year || "N/A"}</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-bold">Seat Capacity</td>
                      <td className="border p-2">{car.seatCapacity} </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-bold">Luggage Capacity</td>
                      <td className="border p-2">{car.luggageCapacity} </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-bold">Fuel Type</td>
                      <td className="border p-2">{car.fuelType} </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-bold">Rental Price</td>
                      <td className="border p-2 font-bold">
                        {car.rentRate} rs/Day
                      </td>
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

              <h2 className="text-2xl font-bold mb-4 text-center">
                Book Car Now
              </h2>
              {/* 
                        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>} */}

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
                    min={new Date().toISOString().split("T")[0]}
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
                    min={minDate}
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
                    min={minTime}
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
                    if (
                      rentalStartDate &&
                      rentalEndDate &&
                      rentalEndTime &&
                      rentalStartTime
                    ) {
                      // yahan required fields check karo
                      setModelVisible(true);
                    } else {
                      alert("Please fill all fields");
                    }
                  }}
                  type="button"
                  className="bg-primary text-white p-2 rounded-md w-full"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        )}

       {ModelVisible && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
    <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 h-auto max-h-[90vh] overflow-y-auto p-6 relative">
      {/* Close Button */}
      <button
        onClick={() => setModelVisible(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
      >
        <FiX className="text-2xl" />
      </button>
      
      {/* Modal Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {car.carBrand} {car.carModel}
        </h2>
        <p className="text-gray-600 mt-2">Booking Confirmation</p>
      </div>

      {/* Car Images Gallery */}
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {car.images?.map((img, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg">
              <img
                src={`http://localhost:3000/uploads/${img}`}
                alt={`Car ${index}`}
                className="w-full h-48 object-cover rounded-lg border border-gray-200 shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            </div>
          ))}
        </div>
        {errorMessage && (
          <p className="text-red-500 text-center font-medium mt-4">
            {errorMessage}
          </p>
        )}
      </div>

      {/* Booking Details Card */}
      <div className="bg-blue-50 rounded-xl p-5 mb-6 border border-blue-100">
        <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
          <FiCalendar className="mr-2" /> Booking Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Booked By</p>
            <p className="font-medium">{sessionStorage.getItem("name")}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Rental Period</p>
            <div className="space-y-1">
              <p className="font-medium">
                <span className="font-semibold">From:</span> {rentalStartDate} at {rentalStartTime}
              </p>
              <p className="font-medium">
                <span className="font-semibold">To:</span> {rentalEndDate} at {rentalEndTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Car Details Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FiCheckCircle className="mr-2 text-green-600" /> Vehicle Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Model</p>
              <p className="font-medium">{car.carModel}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Color</p>
              <p className="font-medium">{car.color}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Mileage</p>
              <p className="font-medium">{car.mileage} miles</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Engine Type</p>
              <p className="font-medium">{car.engineType}</p>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Transmission</p>
              <p className="font-medium">{car.transmission}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Registration Year</p>
              <p className="font-medium">{car.year}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Body Type</p>
              <p className="font-medium">{car.bodyType}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium text-blue-600">{car.rentRate} rs/Day</p>
            </div>
          </div>
        </div>
      </div>

      {/* Showroom Details */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FiMapPin className="mr-2 text-red-600" /> Showroom Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Showroom Name</p>
            <p className="font-medium">{car.userId?.showroomName}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{car.userId?.address}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
        >
          <FiCheckCircle className="mr-2" /> Confirm Booking
        </button>
        <button
          onClick={() => setModelVisible(false)}
          className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
        >
          <FiX className="mr-2" /> Cancel
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </>
  );
};

export default UserCard;
