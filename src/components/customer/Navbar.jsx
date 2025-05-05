import { User, Calendar, LogOut, House, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Base_Url = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [firstLetter, setFirstLetter] = useState("");
  const navigate = useNavigate();

  const callLogoutApi = async () => {
    try {
      await axios.post(
        `${Base_Url}/api/logout`,
        {},
        { withCredentials: true }
      );
      sessionStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const fetchUserData = () => {
      try {
        const userData = sessionStorage.getItem("name");
        if (userData) {
          setName(userData);
          setFirstLetter(userData.charAt(0).toUpperCase());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const navLinks = [
    { path: "/customer/cars", label: "Cars" },
    { path: "/customer/showrooms", label: "Showrooms" },
    { path: "/customer/bookings", label: "Bookings" },
    { path: "/customer/invoice", label: "Invoices" }
  ];

  const dropdownItems = [
    { icon: House, path: "/customer/dashboard", label: "Home" },
    { icon: User, path: "/customer/profile", label: "Profile" },
    { icon: Calendar, path: "/customer/bookings", label: "My Bookings" },
    { icon: FileText, path: "/customer/invoice", label: "Invoices" }
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-30 backdrop-blur-sm bg-opacity-80">
      <div className="mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link to="/customer/dashboard" className="flex items-center">
            <img
              src="/src/assets/logo.png"
              alt="RentRush Logo"
              className="h-[100px] mr-3 transition-transform hover:rotate-[-5deg]"
            />
            <h1 className="text-3xl font-bold text-[#C17D3C] leading-tight">
              RentRush
            </h1>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <motion.div
              key={link.path}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.path}
                className="relative text-gray-600 hover:text-blue-600 transition-colors font-medium group"
              >
                {link.label}
                <span className="absolute left-0 bottom-[-4px] h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <motion.div
            onClick={toggleDropdown}
            className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-sm">
              <span className="font-semibold">{firstLetter}</span>
            </div>
            <span className="text-gray-700 font-medium hidden md:inline">{name}</span>
            {isDropdownOpen ? (
              <ChevronUp className="text-gray-500" size={18} />
            ) : (
              <ChevronDown className="text-gray-500" size={18} />
            )}
          </motion.div>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
              >
                {dropdownItems.map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={item.path}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <item.icon className="mr-3 text-blue-600" size={18} />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
                <div className="border-t border-gray-100"></div>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <button
                    onClick={callLogoutApi}
                    className="flex w-full items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="mr-3 text-red-500" size={18} />
                    <span>Logout</span>
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
