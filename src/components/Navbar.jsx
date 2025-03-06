import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  function scrollToHome() {
    const element = document.getElementById('Home');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  function scrollToSteps() {
    const element = document.getElementById('steps');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  function scrollToRequirements() {
    const element = document.getElementById('requirements');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  function scrollToDetails() {
    const element = document.getElementById('detail');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }function scrollToTest() {
    const element = document.getElementById('rent');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 h-[70px] flex justify-between items-center w-[100%]">
      <div className="mx-auto px-4 flex justify-between items-center w-[100%]">
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/src/assets/logo.svg"
              alt="Logo"
              className="-my-3 h-[77px] mr-2 fill-white"
            />
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
                Requirements
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
              <li className="list-none cursor-pointer  hover:text-[#C17D3C] text-[18px] text-[#000000] opacity-60 hover:opacity-100 font-medium">
                <Link to="/signup" className="">
                  Register
                </Link>
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
