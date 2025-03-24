import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Base_Url = import.meta.env.VITE_API_URL;
const ShowroomCard = ({ value }) => {
 const [showdialog, setshowdialog] = useState(false)
const [allcar, setallcar] = useState([])
 console.log("showroomid",value?._id);
  let showroomid=value?._id
useEffect(()=>{
 const fetchcar=async ()=>{
  try {
    const response= await axios.get(`${Base_Url}/api/getshowroomcar/${showroomid}`,{
      withCredentials:true,
    })
    console.log("responefromget all cars",response.data);
    setallcar(response.data.totalcar);
  } catch (error) {
    console.log("error in get all cars",error.response);
  }
 }
 fetchcar()
},[value?._id])
  return (
    <>
    <div onClick={()=>setshowdialog(true)} className="bg-white shadow-2xl rounded-lg overflow-hidden w-64 relative transform transition-transform duration-300 hover:scale-105">
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
    {/* Dialog box for  cardetails */}
    {showdialog && (
  <>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl font-bold text-center mb-4 font-serif">Total Cars Of This Showroom</h2>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allcar.map((car, index) => (
            <div 
              key={index}
              className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              {/* Car Image */}
              <div className="relative">
                <img
                  src={`/uploads/${car.images}`}
                  alt={`${car.carBrand} ${car.carModel}`}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.target.src = "/path/to/default/image.png";
                  }}
                />
                {car.availability ? (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    Available
                  </span>
                ) : (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    Not Available
                  </span>
                )}
              </div>

              {/* Car Details */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-blue-900 mb-1">
                  {car.carBrand} - {car.carModel}
                </h3>
                <p className="text-sm text-gray-500">Year: {car.year}</p>
                <p className="text-sm text-gray-500">Engine: {car.engineType}</p>
                <p className="text-sm text-gray-500">Body Type: {car.bodyType}</p>
                <p className="text-sm text-gray-500">Color: {car.color}</p>
                <p className="text-sm text-gray-500">Mileage: {car.mileage} km</p>
                <p className="text-sm text-gray-500">Transmission: {car.transmission}</p>

                {/* Rent Rate */}
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold text-green-600">
                    Rs. {car.rentRate} / day
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button 
            onClick={() => setshowdialog(false)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </>
)}

    </>

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
