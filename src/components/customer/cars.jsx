import  { useEffect, useState } from "react";
import UserCard from "./userCard";
import Navbar from "./Navbar";
// import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { Link } from "react-router-dom";
import Toast from "../Toast";
const Base_Url = import.meta.env.VITE_API_URL;

const Cars = () => {
  const [cars, setCars] = useState([]);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${Base_Url}/api/car/get-cars`, {
        withCredentials: true,
      });
      console.log(response);
      setCars(response.data);
    } catch (err) {
      console.log(err);
      Toast(err.data || err.message || "Something went wrong", "error");
    }
  };
  useEffect(() => {
    fetchVehicles();
  }, []);
  console.log(cars);
  // let cars_no = 0;
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100/25 py-2 mt-5 rounded-xl">
        <div className="mt-4 flex px-12 flex-col">
          <div>
            <span>
              <Link
                to="/customer/Dashboard"
                className="text-[#4287f5]/75 text-lg"
              >
                home
              </Link>
              <span className="text-[#050B20]"> / shop</span>
            </span>
          </div>
          <div className="flex justify-between">
            <h1 className="text-[40px] text-[#0B132A]">Shop</h1>
            <div className="gap-3  text-[#050B20]">
              <span className="mr-3">Sort by</span>
              <select
                name="car-typ"
                className="border bg-transparent pl-2 py-3 border-slate-900/25 rounded-2xl w-[150px]"
                id=""
              >
                <option>Default</option>
                <option value="honda">honda</option>
                <option value="toyota">toyota</option>
                <option value="hundayi">hundayi</option>
              </select>
      <Link to={"/customer/bookings"}><button className="mx-8 bg-red-700 text-white px-2 py-2 rounded-lg">you booking </button></Link>
            </div>
          </div>
          <span className="my-5">{`Showing 1 – 12 of ${cars.length} results`}</span>
        </div>
        <div className="px-[3rem]">
          <div className="flex flex-wrap  justify-start gap-8">
            {cars.map((car, index) => {
              const cars_no = index; // Assign cars_no to index before returning the JSX.
              return <UserCard key={index} car={car} cars_no={cars_no} />;
            })}
          </div>
        </div>
      </div>
      <div className="controlls text-center text-white py-5 flex gap-2 justify-center">
        <button className="rounded-full hover:bg-black hover:text-white bg-gray-500 px-2">
          1
        </button>
        <button className="rounded-full hover:bg-black hover:text-white bg-gray-500 px-2">
          2
        </button>
        <button className="rounded-full hover:bg-black hover:text-white bg-gray-500 px-2">
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Cars;
