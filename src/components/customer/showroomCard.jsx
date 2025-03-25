import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from './userCard';
const Base_Url = import.meta.env.VITE_API_URL;
const ShowroomCard = ({ value }) => {
 const [showdialog, setshowdialog] = useState(false)
const [allcar, setallcar] = useState([])
const [Filter, setFilter] = useState("Available")
  let showroomid=value?._id
useEffect(()=>{
 const fetchcar=async ()=>{
  try {
    const response= await axios.get(`${Base_Url}/api/getshowroomcar/${showroomid}`,{
      withCredentials:true,
    })

    setallcar(response.data.totalcar);
  } catch (error) {
    console.log("error in get all cars",error.response);
  }
 }
 fetchcar()
},[value?._id])
// filtercars
const filtercars=allcar.filter((car)=> Filter==="available"?car.availability==="Available":car.availability==="Rented Out")
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
<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
  <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full max-w-full max-h-full overflow-y-auto">
    {/* Header with Close Button */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold font-serif">Total Cars Of This Showroom</h2>
      {/* Add dropdown */}
      <select
            className="border lg:ml-6 border-gray-300  bg-slate-200 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={Filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="available">Available Cars</option>
            <option value="rented">Rented Out Cars</option>
          </select>
      <button  
        onClick={() => setshowdialog(false)} 
        className="text-5xl font-bold text-black rounded-full hover:bg-gray-200 transition">
        &times;
      </button>
    </div>

    {/* Cars Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {filtercars.length > 0 ? (
            filtercars.map((car, index) => <UserCard key={index} car={car} />)
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              {Filter === "available"
                ? "Sorry, no available cars."
                : "No rented out cars."}
            </p>
          )}
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
