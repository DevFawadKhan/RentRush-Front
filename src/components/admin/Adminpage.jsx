import {
  faCar,
  faHome,
  faSignOutAlt,
  faStore,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Customers from "./Customers";
import Showroom from "./Showroom";

const Base_Url = import.meta.env.VITE_API_URL;

const Adminpage = () => {
  const [Customer, setCustomer] = useState(false);
  const [showroom, setShowroom] = useState(false);
  const [Customerdata, setCustomerdata] = useState([]);
  const [Showroomdata, setShowroomdata] = useState([]);
  const navigate = useNavigate();

  const handleCustomer = () => {
    setShowroom(false);
    setCustomer(true);
  };

  const handleShowroom = () => {
    setCustomer(false);
    setShowroom(true);
  };

  const handleHome = () => {
    setCustomer(false);
    setShowroom(false);
  };

  const fetchdata = async () => {
    try {
      const response = await axios.get(`${Base_Url}/api/admin/adminview`);
      setCustomerdata(response.data.clientSection);
      setShowroomdata(response.data.showroomSection);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#02073F] p-6 text-white">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          <button
            onClick={handleHome}
            className={`flex items-center space-x-3 text-lg p-3 rounded-lg w-full transition-colors duration-200 ${
              !Customer && !showroom ? "bg-[#394A9A]" : "hover:bg-[#394A9A]"
            }`}
          >
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </button>
          <button
            onClick={handleCustomer}
            className={`flex items-center space-x-3 text-lg p-3 rounded-lg w-full transition-colors duration-200 ${
              Customer ? "bg-[#394A9A]" : "hover:bg-[#394A9A]"
            }`}
          >
            <FontAwesomeIcon icon={faUsers} />
            <span>Customers</span>
          </button>
          <button
            onClick={handleShowroom}
            className={`flex items-center space-x-3 text-lg p-3 rounded-lg w-full transition-colors duration-200 ${
              showroom ? "bg-[#394A9A]" : "hover:bg-[#394A9A]"
            }`}
          >
            <FontAwesomeIcon icon={faCar} />
            <span>Showrooms</span>
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("role");
              sessionStorage.removeItem("showroomName");
              sessionStorage.removeItem("logo");
              sessionStorage.removeItem("name");
              navigate("/login");
            }}
            className="flex items-center space-x-3 text-lg hover:bg-[#394A9A] p-3 rounded-lg w-full transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {!Customer && !showroom && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-[#02073F] mb-2">
                Welcome, Admin!
              </h1>
              <p className="text-gray-600">
                Use the sidebar to manage customers and showrooms.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow p-6 flex items-center space-x-4 hover:shadow-lg transition">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-full text-2xl">
                  <FontAwesomeIcon icon={faUserPlus} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Total Customers</h4>
                  <p className="text-2xl text-[#394A9A] font-bold">
                    {Customerdata.length}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow p-6 flex items-center space-x-4 hover:shadow-lg transition">
                <div className="bg-green-100 text-green-700 p-3 rounded-full text-2xl">
                  <FontAwesomeIcon icon={faStore} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Total Showrooms</h4>
                  <p className="text-2xl text-[#394A9A] font-bold">
                    {Showroomdata.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {Customer && <Customers data={Customerdata} />}
        {showroom && <Showroom value={Showroomdata} refectch={fetchdata} />}
      </main>
    </div>
  );
};

export default Adminpage;
