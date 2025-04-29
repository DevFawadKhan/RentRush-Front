import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  function scrollToHome() {
    const element = document.getElementById("Home");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  function scrollToSteps() {
    const element = document.getElementById("steps");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  function scrollToRequirements() {
    const element = document.getElementById("Documents");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  function scrollToDetails() {
    const element = document.getElementById("detail");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  function scrollToTest() {
    const element = document.getElementById("rent");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 h-[70px] flex justify-between items-center w-[100%]">
      <div className="mx-auto px-4 flex justify-between items-center w-[100%]">
        <div className="flex items-center">
          <Link to="/">
            <div className="flex items-center">
              <img
                src="/src/assets/logo.png"
                alt="Logo"
                className="-my-3 h-[80px] mr-2"
              />
              <h1 className="list-none cursor-pointer font-bold text-[30px] text-[#00004b]">
                RentRush
              </h1>
            </div>
          </Link>
        </div>

        <div className="flex flex-row justify-between">
          <div className="flex flex-row ">
            <div className="hidden md:flex space-x-4 px-2 items-center gap-3 mr-5">
              <li className="list-none cursor-pointer  hover:text-[#C17D3C] text-[18px] text-[#000000] opacity-60 hover:opacity-100 font-medium">
                <Link to="/">Home</Link>
              </li>
              <li
                onClick={scrollToSteps}
                className="list-none cursor-pointer  hover:text-[#C17D3C] text-[18px] text-[#000000] opacity-60 hover:opacity-100 font-medium"
              >
                <Link to="/#steps">How it Works</Link>
              </li>
              <li
                onClick={scrollToRequirements}
                className="list-none cursor-pointer  hover:text-[#C17D3C] text-[18px] text-[#000000] opacity-60 hover:opacity-100 font-medium"
              >
                Documents
              </li>
              <li
                onClick={scrollToDetails}
                className="list-none cursor-pointer  hover:text-[#C17D3C] text-[18px] text-[#000000] opacity-60 hover:opacity-100 font-medium"
              >
                Why Choose Us
              </li>
              <li
                className="list-none cursor-pointer  hover:text-[#C17D3C] text-[18px] text-[#000000] opacity-60 hover:opacity-100 font-medium"
                onClick={scrollToTest}
              >
                Testimonials
              </li>
              <li className="list-none text-[#000000] opacity-60 hover:opacity-100 font-medium">
                |
              </li>
              <li className="list-none relative group cursor-pointer hover:text-[#C17D3C] text-[18px] text-[#000000] opacity-60 hover:opacity-100 font-medium">
  <span className="flex items-center">
      Register
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </span>
  
  {/* Dropdown Menu */}
  <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-1 py-1 w-48 z-10">
    <Link
      to="/showroom/signup"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#C17D3C] hover:text-white"
    >
      Showroom
    </Link>
    <Link
      to="/signup"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#C17D3C] hover:text-white"
    >
      Customer/User
    </Link>
  </div>
</li>
            </div>
          </div>
          <div>
            <div className="flex space-x-4 justify-center items-center">
              <Link
                to="/login"
                className=" border border-[#C17D3C] bg-[#C17D3C] rounded py-2 px-5 text-white font-poppins text-lg tracking-widest"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
