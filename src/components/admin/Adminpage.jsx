import {
  faBell,
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
  const [approvalRequests, setApprovalRequests] = useState(false);
  const [Customerdata, setCustomerdata] = useState([]);
  const [Showroomdata, setShowroomdata] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCustomer = () => {
    setShowroom(false);
    setApprovalRequests(false);
    setCustomer(true);
  };

  const handleShowroom = () => {
    setCustomer(false);
    setApprovalRequests(false);
    setShowroom(true);
  };

  const handleHome = () => {
    setCustomer(false);
    setShowroom(false);
    setApprovalRequests(false);
  };

  const fetchdata = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${Base_Url}/api/admin/adminview`);
      setCustomerdata(response.data.clientSection);
      setShowroomdata(response.data.showroomSection);
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPendingApprovals = async () => {
    try {
      const filteredShowroomData = Showroomdata.filter(
        (showroom) => showroom.isApproved === 0
      );
      setPendingApprovals(filteredShowroomData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    fetchPendingApprovals();
  }, [Showroomdata]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#02073F] to-[#1A2A6C] p-6 text-white fixed h-full shadow-lg">
        <h2 className="text-2xl font-bold mb-8 tracking-wide">
          Admin Dashboard
        </h2>
        <nav className="space-y-2">
          {[
            {
              icon: faHome,
              text: "Home",
              handler: handleHome,
              active: !Customer && !showroom && !approvalRequests,
            },
            {
              icon: faUsers,
              text: "Customers",
              handler: handleCustomer,
              active: Customer,
            },
            {
              icon: faCar,
              text: "Showrooms",
              handler: handleShowroom,
              active: showroom,
              badge:
                pendingApprovals.length > 0 ? pendingApprovals.length : null,
            },
            {
              icon: faSignOutAlt,
              text: "Logout",
              handler: () => {
                sessionStorage.clear();
                navigate("/login");
              },
              active: false,
            },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.handler}
              className={`flex items-center space-x-3 text-base p-3 rounded-lg w-full transition-all duration-300 ${
                item.active
                  ? "bg-[#394A9A] shadow-md"
                  : "hover:bg-[#394A9A]/80 hover:shadow-md"
              } relative`}
            >
              <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
              <span>{item.text}</span>
              {item.badge && (
                <span className="absolute right-3 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64">
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#394A9A]"></div>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            {error}
          </div>
        )}
        {!isLoading && !Customer && !showroom && !approvalRequests && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-[#02073F] mb-2 tracking-tight">
                Welcome, Admin!
              </h1>
              <p className="text-gray-600 text-lg">
                Manage customers, showrooms, and approval requests with ease.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: faUserPlus,
                  title: "Total Customers",
                  value: Customerdata.length,
                  color: "blue",
                },
                {
                  icon: faStore,
                  title: "Total Showrooms",
                  value: Showroomdata.length,
                  color: "green",
                },
                {
                  icon: faBell,
                  title: "Pending Approvals",
                  value: pendingApprovals.length,
                  color: "red",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`bg-${card.color}-100 text-${card.color}-700 p-3 rounded-full text-2xl`}
                  >
                    <FontAwesomeIcon icon={card.icon} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700">
                      {card.title}
                    </h4>
                    <p className="text-2xl text-[#394A9A] font-bold">
                      {card.value}
                    </p>
                  </div>
                </div>
              ))}
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
