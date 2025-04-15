import React from "react";
import { Link } from "react-router-dom";

function ShowroomNavbar() {
  const logoUrl = `${
    import.meta.env.VITE_API_URL
  }/uploads/${localStorage.getItem("logo")}`;
  const showroomName = localStorage.getItem("showroomName");

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left: Logo and Name */}
        <div className="flex items-center gap-4 mb-2 md:mb-0">
          <Link to="/showroom/inventory" className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt="Showroom Logo"
              className="h-16 sm:h-20 max-w-[160px] object-contain drop-shadow-md hover:scale-105 transition-transform rounded-xl"
            />
            <h1 className="text-[#00004b] text-2xl sm:text-3xl font-bold">
              {showroomName}
            </h1>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex space-x-6 justify-center items-center mb-2 md:mb-0">
          {[
            { label: "Home", to: "/showroom/dashboard" },
            { label: "Inventory", to: "/showroom/inventory" },
            { label: "Maintenance", to: "/showroom/maintenance" },
          ].map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="text-[17px] text-[#000000] opacity-70 hover:opacity-100 transition font-medium hover:text-[#C17D3C]"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right: Logout Button */}
        <Link
          to="/"
          className="bg-[#C17D3C] text-white px-5 py-2 rounded-lg text-[16px] font-medium hover:bg-[#a96a33] transition"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default ShowroomNavbar;
