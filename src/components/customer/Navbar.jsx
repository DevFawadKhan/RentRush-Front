import { User, Calendar, LogOut, House, FileText, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [name, setname] = useState("");
  const [First_letter, setFirst_letter] = useState("");
  const location = useLocation();

  useEffect(() => {
    const Fetchemail = () => {
      try {
        const userdata = localStorage.getItem("name");
        if (userdata) {
          setname(userdata);
          setFirst_letter(userdata.charAt(0).toUpperCase());
        }
      } catch (error) {
        console.error(error);
      }
    };
    Fetchemail();
  }, []);

  const navLinks = [
    { path: "/customer/cars", label: "Cars" },
    { path: "/customer/showrooms", label: "Showrooms" },
    { path: "/customer/bookings", label: "Bookings" },
    { path: "/customer/invoice", label: "Invoice" }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
                    <Link to="/">
                    <div className="flex items-center">
                    <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="-my-3 h-[80px] mr-2"
            />
            <h1 className="list-none cursor-pointer font-bold text-[30px] text-[#00004b]">RentRush</h1>
          </div>
                    </Link>
                  </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === link.path
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                } transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Profile Dropdown */}
          <div className="hidden md:block relative ml-4">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-sm font-bold">{First_letter}</span>
              </div>
              <span className="text-gray-700 font-medium">{name}</span>
            </button>

            {isDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1">
                  <Link
                    to="/customer/dashboard"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <House className="mr-3 text-gray-500" size={16} />
                    Home
                  </Link>
                  <Link
                    to="/customer/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User className="mr-3 text-gray-500" size={16} />
                    Profile
                  </Link>
                  <Link
                    to="/customer/bookings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Calendar className="mr-3 text-gray-500" size={16} />
                    My Bookings
                  </Link>
                  <Link
                    to="/customer/invoice"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FileText className="mr-3 text-gray-500" size={16} />
                    Invoices
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <Link
                    to="/"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="mr-3 text-gray-500" size={16} />
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-lg font-bold">{First_letter}</span>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{name}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="/customer/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Your Profile
              </Link>
              <Link
                to="/customer/bookings"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bookings
              </Link>
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
