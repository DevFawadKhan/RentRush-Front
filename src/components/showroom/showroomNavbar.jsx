import React from "react";
import { Link } from "react-router-dom";

function ShowroomNavbar() {
  const showroomLogoUrl = `${
    import.meta.env.VITE_API_URL
  }/uploads/${sessionStorage.getItem("logo")}`;
  const showroomName = sessionStorage.getItem("showroomName");

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-5 md:px-8">
      <div className="max-w-screen-4xl mx-auto flex items-center justify-between h-20">
        {/* Left: RentRush Logo + Name */}
        <div className="flex items-center gap-3">
          <Link to="/showroom/dashboard" className="flex items-center">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="-my-3 h-[80px] mr-2"
            />
            <div className="flex flex-col">
              <h1 className="list-none cursor-pointer font-bold text-[28px] text-[#00004b] leading-none">
                RentRush
              </h1>
              <span className="text-[14px] text-[#666] font-medium">
                Showroom Dashboard
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: "Home", to: "/showroom/dashboard" },
            { label: "Inventory", to: "/showroom/inventory" },
            { label: "Maintenance", to: "/showroom/maintenance" },
          ].map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="text-[18px] font-semibold text-[#444] hover:text-[#C17D3C] transition-all"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right: Showroom Details + Logout */}
        <div className="flex items-center gap-6">
          {/* Showroom Info */}
          <div className="hidden sm:flex items-center gap-3 pr-4 border-r">
            <img
              src={showroomLogoUrl}
              alt="Showroom Logo"
              className="h-11 w-11 rounded-full object-cover"
            />
            <span className="text-[17px] font-semibold text-[#1a1a2e] truncate max-w-[150px]">
              {showroomName}
            </span>
          </div>

          {/* Logout Button */}
          <Link
            to="/login"
            onClick={() => {
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("role");
              sessionStorage.removeItem("showroomName");
              sessionStorage.removeItem("logo");
              sessionStorage.removeItem("name");
            }}
            className="bg-[#C17D3C] hover:bg-[#a96a33] text-white text-base font-semibold px-5 py-2.5 rounded-lg transition-all"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default ShowroomNavbar;
