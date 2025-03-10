
import {useState} from "react";
import { CircleGauge, Fuel, GripHorizontal } from "lucide-react";
import axios from "axios";
import Toast from "../Toast";
const Base_Url = import.meta.env.VITE_API_URL;

const UserCard = ({ car }) => {
  // console.log(car);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [rentalStartDate, setRentalStartDate] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");
  const [rentalStartTime, setRentalStartTime] = useState("");
  const [rentalEndTime, setRentalEndTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-64 relative">
      <div className="relative">
        <img
          src={`/uploads/${car.images[0]}`}
          alt={car.name}
          className="w-full h-40 object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg gap-4">{car.name}</h3>
        <button className="text-gray-900 hover:underline">
          {car.carBrand}  {car.carModel}
        </button>
        <div className="grid grid-cols-3 gap-4 text-sm text-black my-2">
          <div className="flex flex-col items-center">
            <CircleGauge />
            <span className="text-gray-500">{car.mileage}</span>
          </div>
          <div className="flex flex-col items-center">
            <Fuel />
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg relative w-4/5 h-4/5 overflow-y-auto">
            <button
              onClick={closeDetailsModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              &#10005;
            </button>
            <div className="flex flex-col items-center space-y-6 border">
              <h2 className="text-2xl font-bold">{car.name}</h2>
              <img
                src={`/uploads/${car.images[0]}`}
                alt={car.name}
                className="w-96 h-60 object-contain rounded mb-4 border shadow-lg bg-gray-100"
              />
              <div className="flex justify-between gap-2 mb-4">
                {car.images?.map((item, index) => (
                  <img
                    key={index}
                    src={`/uploads/${item}`}
                    alt={`Car`}
                    className="w-1/5 h-20 object-contain rounded mb-4 border shadow-lg bg-gray-100"
                  />
                )) || (
                  <>
                    {[...Array(4)].map((_, i) => (
                      <img
                        key={i}
                        src={car.image}
                        alt={`Car Image ${i}`}
                        className="w-1/5 h-20 object-contain rounded mb-4 border shadow-lg bg-gray-100"
                      />
                    ))}
                  </>
                )}
              </div>

              <h2 className="text-2xl font-bold">Car Details</h2>
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
                                className="bg-primary text-white p-2 rounded-md w-full"
                            >
                                Confirm Booking
                            </button>
                        </form>
                    </div>
                </div>
            )}
    </div>
  );
};

export default UserCard;
