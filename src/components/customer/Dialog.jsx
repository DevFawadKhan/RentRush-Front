import PropTypes from 'prop-types';

const Dialog = ({ isOpen, onClose, carDetails, customerName, startDateTime, endDateTime }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Car Rental Details</h2>

        {/* Car Details */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Car Details</h3>
          <p className="text-gray-600">{carDetails}</p>
        </div>

        {/* Customer Name */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Booked By</h3>
          <p className="text-gray-600">{customerName}</p>
        </div>

        {/* Renting Start Date and Time */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Renting Start</h3>
          <p className="text-gray-600">{startDateTime}</p>
        </div>

        {/* Renting End Date and Time */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700">Renting End</h3>
          <p className="text-gray-600">{endDateTime}</p>
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  carDetails: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
  startDateTime: PropTypes.string.isRequired,
  endDateTime: PropTypes.string.isRequired,
};

export default Dialog;
