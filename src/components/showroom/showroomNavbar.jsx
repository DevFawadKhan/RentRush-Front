import React from "react";
import { Link } from "react-router-dom";
import { AlignJustify } from "lucide-react";

function ShowroomNavbar({ onMenuClick }) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/showroom/dashboard">
            <img
              src="/src/assets/logo.svg"
              alt="Logo"
              className="-my-3 h-[100px] mr-2"
            />
          </Link>
        </div>
        <div className="flex flex-row gap-3">
          <div className="flex space-x-4 justify-center items-center">
            
            <button onClick={onMenuClick}>
              <AlignJustify />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default ShowroomNavbar;
