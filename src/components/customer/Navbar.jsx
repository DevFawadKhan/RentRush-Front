import { User, Calendar, LogOut, House } from "lucide-react";
// import { Gauge, GlassesIcon, Car, LogOutIcon, Shapes, CaravanIcon, Calendar, Settings } from "lucide-react";
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
      <div className="mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/customer/dashboard">
            <img
              src="/src/assets/logo.svg"
              alt="Logo"
              className="-my-3 h-[100px] mr-2"
            />
          </Link>
        </div>

        <div className="relative flex justify-center items-center">
          <div
            onClick={toggleDropdown}
            className="flex items-center space-x-3 hover:cursor-pointer p-1 border border-black rounded-3xl"
          >
            <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-lg font-bold">{First_letter}</span>
            </div>
            <span className="text-gray-700 font-medium pr-2">{name}</span>
          </div>

          {isDropdownOpen && (
            <div className="absolute top-12 right-0 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
              <Link
                to="/customer/dashboard"
                className="flex items-center px-4 py-2 hover:bg-gray-100"
              >
                <House className="mr-2" /> Home
              </Link>
              <Link
                to="/customer/profile"
                className="flex items-center px-4 py-2 hover:bg-gray-100"
              >
                <User className="mr-2" /> Profile
              </Link>
              <Link
                to="/customer/bookings"
                className="flex items-center px-4 py-2 hover:bg-gray-100"
              >
                <Calendar className="mr-2" /> Your Bookings
              </Link>
              <Link
                to=""
                className="flex items-center px-4 py-2 hover:bg-gray-100"
              >
                <LogOut className="mr-2" /> Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>

    // <>
    //   <nav className="bg-white h-screen w-64 shadow-md fixed top-0 left-0 z-50">
    //     <div className="flex flex-col justify-between h-full">
    //       {/* Logo */}
    //       <div className="mt-8">
    //         <div className="flex justify-center items-center">
    //           <Link to="/customer/dashboard">
    //             <img
    //               src="/src/assets/logo.svg"
    //               alt="Logo"
    //               className="h-16 w-16"
    //             />
    //           </Link>
    //         </div>
    //       </div>

    //       {/* Navigation Items */}
    //       <div className="mt-8">
    //         <ul className="space-y-4 text-gray-700">
    //           <li>
    //             <Link
    //               to="/customer/dashboard"
    //               className="flex items-center px-6 py-2 hover:bg-gray-100"
    //             >
    //               <DashboardIcon className="mr-2" /> Dashboard
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/customer/assets"
    //               className="flex items-center px-6 py-2 hover:bg-gray-100"
    //             >
    //               <AssetsIcon className="mr-2" /> Assets
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/customer/bookings"
    //               className="flex items-center px-6 py-2 hover:bg-gray-100"
    //             >
    //               <CarIcon className="mr-2" /> Booking
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/customer/rent-cars"
    //               className="flex items-center px-6 py-2 hover:bg-gray-100"
    //             >
    //               <RentCarIcon className="mr-2" /> Rent Cars
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/customer/services"
    //               className="flex items-center px-6 py-2 hover:bg-gray-100"
    //             >
    //               <ServicesIcon className="mr-2" /> Services
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/customer/calendar"
    //               className="flex items-center px-6 py-2 hover:bg-gray-100"
    //             >
    //               <CalendarIcon className="mr-2" /> Calendar
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>

    //       {/* Settings and Logout */}
    //       <div className="mb-8">
    //         <ul className="space-y-4 text-gray-700">
    //           <li>
    //             <Link
    //               to="/customer/settings"
    //               className="flex items-center px-6 py-2 hover:bg-gray-100"
    //             >
    //               <SettingsIcon className="mr-2" /> Settings
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/logout"
    //               className="flex items-center px-6 py-2 hover:bg-gray-100"
    //             >
    //               <LogOutIcon className="mr-2" /> Logout
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // </>
  );
};

export default Navbar;
