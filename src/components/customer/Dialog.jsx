import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FiClock, FiCheckCircle, FiAlertTriangle, FiX } from 'react-icons/fi';

const BookingProgressBar = ({ startTime, endTime }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  
  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Calculate progress percentage
  const totalDuration = endTime - startTime;
  const elapsedTime = currentTime - startTime;
  const progress = Math.min(100, Math.max(0, (elapsedTime / totalDuration) * 100));
  
  // Determine booking status
  const [status, setStatus] = useState('pending');
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (currentTime < startTime) {
      setStatus('pending');
      setTimeLeft('Booking not started yet');
    } else if (currentTime >= startTime && currentTime <= endTime) {
      setStatus('active');
      // Calculate time left
      const remaining = endTime - currentTime;
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m remaining`);
    } else if (currentTime > endTime) {
      setStatus('overdue');
      setTimeLeft('Booking overdue');
    } else {
      setStatus('completed');
      setTimeLeft('Booking completed');
    }
  }, [currentTime, startTime, endTime]);

  const getProgressColor = () => {
    switch(status) {
      case 'overdue': return 'bg-gradient-to-r from-red-500 to-red-700';
      case 'completed': return 'bg-gradient-to-r from-green-500 to-green-700';
      default: return 'bg-gradient-to-r from-blue-500 to-blue-700';
    }
  };

  const getStatusMessage = () => {
    switch(status) {
      case 'pending': return 'Booking will start soon';
      case 'active': return 'Booking in progress';
      case 'completed': return 'Booking completed successfully';
      case 'overdue': return 'Booking overdue - please return the car';
      default: return '';
    }
  };

  const getStatusIcon = () => {
    switch(status) {
      case 'active': return <FiClock className="mr-1" />;
      case 'completed': return <FiCheckCircle className="mr-1" />;
      case 'overdue': return <FiAlertTriangle className="mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="w-full mb-6">
      <div className="w-full max-w-[90vw] sm:max-w-[600px] mx-auto relative">
        {/* Progress Bar Container */}
        <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
          {/* Progress Indicator */}
          <div
            className={`h-full rounded-full ${getProgressColor()} shadow-md transition-all duration-300`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Moving Car Icon */}
        <div
          className="absolute top-0 transform -translate-y-1/2 transition-all duration-300"
          style={{ left: `calc(${progress}% - 35px)` }}
        >
          <img
            src="/src/assets/barcar.png"
            alt="Car Icon"
            className="w-20 h-20"
          />
        </div>

        {/* Status and Time Information */}
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center text-sm font-medium">
            {getStatusIcon()}
            <span className={status === 'overdue' ? 'text-red-600' : 'text-gray-700'}>
              {getStatusMessage()}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {timeLeft}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dialog = ({ isOpen, onClose, car, bookingDetails, showroom }) => {
  if (!isOpen) return null;

  // Convert booking dates to timestamps
  const startTime = new Date(bookingDetails.startDateTime).getTime();
  const endTime = new Date(bookingDetails.endDateTime).getTime();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 h-auto max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <FiX size={24} />
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

        {/* Progress Bar */}
        <BookingProgressBar startTime={startTime} endTime={endTime} />

        {/* Combined Table for Booking and Car Details */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border text-sm">
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-bold">Booked By</td>
                <td className="border p-2">{localStorage.getItem("name")}</td>
                <td className="border p-2 font-bold">Renting Period</td>
                <td className="border p-2">
                  {bookingDetails.startDateTime} - {bookingDetails.endDateTime}
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-bold">Car Model</td>
                <td className="border p-2">{car.carModel}</td>
                <td className="border p-2 font-bold">Color</td>
                <td className="border p-2">{car.color}</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-bold">Mileage</td>
                <td className="border p-2">{car.mileage} miles</td>
                <td className="border p-2 font-bold">Transmission</td>
                <td className="border p-2">{car.transmission}</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-bold">Engine Type</td>
                <td className="border p-2">{car.engineType}</td>
                <td className="border p-2 font-bold">Registration Year</td>
                <td className="border p-2">{car.year}</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-bold">Fuel Type</td>
                <td className="border p-2">{car.fuelType}</td>
                <td className="border p-2 font-bold">Seat Capacity</td>
                <td className="border p-2">{car.seatCapacity}</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-bold">Body Type</td>
                <td className="border p-2">{car.bodyType}</td>
                <td className="border p-2 font-bold">Price</td>
                <td className="border p-2 font-bold">{car.rentRate} Rs/Day</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-bold">Showroom Name</td>
                <td className="border p-2">{showroom?.showroomName}</td>
                <td className="border p-2 font-bold">Showroom Address</td>
                <td className="border p-2">{showroom?.address}</td>
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
    images: PropTypes.arrayOf(PropTypes.string),
    color: PropTypes.string,
    mileage: PropTypes.string,
    transmission: PropTypes.string,
    engineType: PropTypes.string,
    year: PropTypes.string,
    fuelType: PropTypes.string,
    seatCapacity: PropTypes.string,
    bodyType: PropTypes.string,
    rentRate: PropTypes.string,
  }).isRequired,
  bookingDetails: PropTypes.shape({
    startDateTime: PropTypes.string.isRequired,
    endDateTime: PropTypes.string.isRequired,
  }).isRequired,
  showroom: PropTypes.shape({
    showroomName: PropTypes.string,
    address: PropTypes.string,
  }),
};

export default Dialog;
