import PropTypes from 'prop-types';

const Dialog = ({ isOpen, onClose, car, bookingDetails, progress }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Close dialog when clicking outside
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 h-auto max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the dialog from closing it
      >
        {/* Close Button */}
        <button
          onClick={onClose}
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

        {/* Progress Bar - Centered */}
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-[90vw] sm:max-w-[600px]">
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
                <td className="border p-2">RentRush</td>
                <td className="border p-2 font-bold">Showroom Address</td>
                <td className="border p-2">DHA 1, Sector C, Street#1, House#4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  car: PropTypes.shape({
    carBrand: PropTypes.string.isRequired,
    carModel: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    color: PropTypes.string.isRequired,
    mileage: PropTypes.string.isRequired,
    transmission: PropTypes.string.isRequired,
    engineType: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    bodyType: PropTypes.string.isRequired,
    rentRate: PropTypes.string.isRequired,
  }).isRequired,
  bookingDetails: PropTypes.shape({
    customerName: PropTypes.string.isRequired,
    startDateTime: PropTypes.string.isRequired,
    endDateTime: PropTypes.string.isRequired,
  }).isRequired,
  progress: PropTypes.number.isRequired, // Add progress prop
};

export default Dialog;
