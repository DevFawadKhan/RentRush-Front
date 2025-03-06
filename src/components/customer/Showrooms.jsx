import  {useState,useEffect } from "react";
import ShowroomCard from "./showroomCard";
import Navbar from "./Navbar";
import { Search } from "lucide-react";
import axios from 'axios'
const Base_Url = import.meta.env.VITE_API_URL;

const Showrooms = () => {
  //  call api buildapi for admin show showroom and for this module use same api.
  const [data, setdata] = useState([])
  const fetchdata=async()=>{
    try {
      const response=await axios.get(`${Base_Url}/api/admin/adminview`);
    // console.log(response.data.showroomSection)
    setdata(response.data.showroomSection)
    } catch (error) {
      console.log(error.message);
    }
  }
useEffect(() => {
fetchdata();
},[])

  return (
    <>
      <Navbar />
      <div className="mt-4 flex justify-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Search />
          </div>
        </div>
      </div>

      <div className="bg-white flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl px-4 py-10 w-full justify-items-center">
          {data.map((data, index) => (
            <ShowroomCard key={index} value={data} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Showrooms;
