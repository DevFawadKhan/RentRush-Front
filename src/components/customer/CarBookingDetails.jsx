import { useState } from 'react';

const CarBookingDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Example data (replace with actual data from your application)
  const car = {
    carBrand: "Toyota",
    carModel: "Camry",
    color: "Red",
    mileage: "15000",
    bodyType: "Sedan",
    transmission: "Automatic",
    engineType: "Hybrid",
    year: "2023",
    rentRate: "2500",
    images: ["car.jpg"], // Example image paths
  };

  const bookingDetails = {
    customerName: "John Doe",
    startDateTime: "2023-10-15 10:00 AM",
    endDateTime: "2023-10-17 10:00 AM",
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Car Booking Details</h1>

      {/* Button to Open Modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        View Booking Details
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg relative w-11/12 md:w-3/4 lg:w-1/2 h-auto max-h-[90vh] overflow-y-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
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
                  {/* Row 1: Car Details */}
                  <tr className="hover:bg-gray-50">
                    <td className="border p-2 font-bold">Car Model</td>
                    <td className="border p-2">{car.carModel}</td>
                    <td className="border p-2 font-bold">Color</td>
                    <td className="border p-2">{car.color}</td>
                  </tr>

                  {/* Row 2: Booking Details */}
                  <tr className="hover:bg-gray-50">
                    <td className="border p-2 font-bold">Booked By</td>
                    <td className="border p-2">{bookingDetails.customerName}</td>
                    <td className="border p-2 font-bold">Renting Period</td>
                    <td className="border p-2">
                      {bookingDetails.startDateTime} - {bookingDetails.endDateTime}
                    </td>
                  </tr>

                  {/* Row 3: Additional Car Details */}
                  <tr className="hover:bg-gray-50">
                    <td className="border p-2 font-bold">Mileage</td>
                    <td className="border p-2">{car.mileage} miles</td>
                    <td className="border p-2 font-bold">Transmission</td>
                    <td className="border p-2">{car.transmission} </td>
                  </tr>

                  {/* Row 4: Additional Car Details */}
                  <tr className="hover:bg-gray-50">
                    <td className="border p-2 font-bold">Engine Type</td>
                    <td className="border p-2">{car.engineType} </td>
                    <td className="border p-2 font-bold">Registration Year</td>
                    <td className="border p-2">{car.year} </td>
                  </tr>

                  {/* Row 5: Additional Car Details */}
                  <tr className="hover:bg-gray-50">
                    <td className="border p-2 font-bold">Body Type</td>
                    <td className="border p-2">{car.bodyType} </td>
                    <td className="border p-2 font-bold">Price</td>
                    <td className="border p-2 font-bold">{car.rentRate} rs/Day</td>
                  </tr>

                   {/* Row 6: Additional Car Details */}
                   <tr className="hover:bg-gray-50">
                    <td className="border p-2 font-bold">Showroom Name</td>
                    <td className="border p-2">RentRush </td>
                    <td className="border p-2 font-bold">Showroom Address</td>
                    <td className="border p-2 font-bold">Islamabad</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarBookingDetails;
