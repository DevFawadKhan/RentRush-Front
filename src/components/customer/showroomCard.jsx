import PropTypes from 'prop-types';

const ShowroomCard = ({ value }) => {
  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-64 relative transform transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={`/uploads/${value.images}`}
          alt={`Showroom: ${value.showroomName}`}
          className="w-full h-40 object-cover"
          onError={(e) => {
            e.target.src = '/path/to/default/image.png'; // Fallback image if the image fails to load
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-center text-lg text-blue-900 mb-2">
          Showroom: {value.showroomName}
        </h3>
        <div className="pb-4 text-center">
          <span className="text-md font-semibold text-gray-700">
            Address: {value.address}
          </span>
        </div>
      </div>
    </div>
  );
};

ShowroomCard.propTypes = {
  value: PropTypes.shape({
    images: PropTypes.string.isRequired,
    showroomName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShowroomCard;
