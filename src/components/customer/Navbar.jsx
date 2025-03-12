import { User, Calendar, LogOut, House, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [name, setname] = useState("");
  const [First_letter, setFirst_letter] = useState("");

  useEffect(() => {
    const Fetchemail = () => {
      try {
        const userdata = localStorage.getItem("name");
        if (userdata) {
          setname(userdata);
          setFirst_letter(userdata.charAt(0));
        }
      } catch (error) {
        console.error(error);
      }
    };
    Fetchemail();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/customer/dashboard">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="-my-3 h-[80px] mr-2"
            />
          </Link>
          <h1 className="list-none cursor-pointer font-bold text-[30px] text-[#00004b]">RentRush</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link to="/customer/cars" className="text-gray-700 hover:text-primary transition-colors">
            Cars
          </Link>
          <Link to="/customer/showrooms" className="text-gray-700 hover:text-primary transition-colors">
            Showrooms
          </Link>
          <Link to="/customer/bookings" className="text-gray-700 hover:text-primary transition-colors">
            Bookings
          </Link>
          <Link to="/customer/invoice" className="text-gray-700 hover:text-primary transition-colors">
            Invoice
          </Link>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="flex items-center space-x-3 hover:cursor-pointer p-2 border border-gray-300 rounded-full hover:shadow-md transition-shadow"
          >
            <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-lg font-bold">{First_letter}</span>
            </div>
            <span className="text-gray-700 font-medium pr-2">{name}</span>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-14 right-0 w-56 bg-white shadow-lg rounded-lg py-2 z-50 border border-gray-100">
              <Link
                to="/customer/dashboard"
                className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <House className="mr-3 text-gray-600" size={18} />
                <span className="text-gray-700">Home</span>
              </Link>
              <Link
                to="/customer/profile"
                className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <User className="mr-3 text-gray-600" size={18} />
                <span className="text-gray-700">Profile</span>
              </Link>
              <Link
                to="/customer/bookings"
                className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <Calendar className="mr-3 text-gray-600" size={18} />
                <span className="text-gray-700">My Bookings</span>
              </Link>
              <Link
                to="/customer/invoice"
                className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <FileText className="mr-3 text-gray-600" size={18} />
                <span className="text-gray-700">Invoices</span>
              </Link>
              <div className="border-t border-gray-100 my-1"></div>
              <div className="border-t border-gray-100 my-1"></div>
              <Link
                to="/"
                className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <LogOut className="mr-3 text-gray-600" size={18} />
                <span className="text-gray-700">Logout</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
