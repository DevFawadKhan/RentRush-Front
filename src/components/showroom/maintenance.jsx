/*import React, { useState } from "react";
import ShowroomNavbar from "./showroomNavbar";

function Maintenance() { 
  const [checkedParts, setCheckedParts] = useState({
    engine: false,
    tyres: false,
    brakes: false,
    oil: false,
    airFilter: false,
    coolant: false,
    lights: false,
    wipers: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedParts((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected Maintenance Parts:", checkedParts);
  };

  return (
    <>
    <ShowroomNavbar/>
    <div className="bg-opacity-70 bg-gray-500 backdrop-blur-lg w-full h-full flex justify-center items-center">
      <div className="mt-10 mb-10 bg-[#0B132A] text-white w-[500px] p-6 rounded-xl shadow-xl min-h-[60vh] text-center">
        <h2 className="text-2xl font-semibold mb-4">Car Maintenance Checklist</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-start">
          {Object.keys(checkedParts).map((part) => (
            <div key={part} className="flex items-center gap-4 bg-[#2C2C2C] p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#C17D3C] w-full hover:scale-105">
              <input
                type="checkbox"
                name={part}
                checked={checkedParts[part]}
                onChange={handleCheckboxChange}
                id={part}
                className="w-4 h-4 border-2 border-[#C17D3C] rounded-md transition-transform duration-200 checked:bg-[#C17D3C] transform hover:scale-110"
              />
              <label htmlFor={part} className="text-lg cursor-pointer">
                {part.charAt(0).toUpperCase() + part.slice(1)}
              </label>
            </div>
          ))}
          <button type="submit" className="mt-4 py-2 px-4 bg-[#C17D3C] text-white rounded-lg text-sm w-24 hover:scale-105 transition-all duration-200">
            Submit
          </button>
        </form>
      </div>
    </div></>
  );
}

export default Maintenance;*/
import React, { useState } from "react";
import ShowroomNavbar from "./showroomNavbar";

function Maintenance() { 
  const [checkedParts, setCheckedParts] = useState({
    engine: false,
    tyres: false,
    brakes: false,
    oil: false,
    airFilter: false,
    coolant: false,
    lights: false,
    wipers: false,
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedParts((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected Maintenance Parts:", checkedParts);
    setShowPopup(true);  // Show popup after submission
  };

  const handleClosePopup = () => {
    setShowPopup(false);  // Close the popup
  };

  return (
    <>
    <ShowroomNavbar/>
    <div className="bg-opacity-70 bg-gray-500 backdrop-blur-lg w-full h-screen flex justify-center items-center">
      <div className="bg-[#0B132A] text-white w-[500px] p-6 rounded-xl shadow-xl min-h-[60vh] text-center">
        <h2 className="text-2xl font-semibold mb-4">Car Maintenance Checklist</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-start">
          {Object.keys(checkedParts).map((part) => (
            <div key={part} className="flex items-center gap-4 bg-[#2C2C2C] p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#C17D3C] w-full hover:scale-105">
              <input
                type="checkbox"
                name={part}
                checked={checkedParts[part]}
                onChange={handleCheckboxChange}
                id={part}
                className="w-4 h-4 border-2 border-[#C17D3C] rounded-md transition-transform duration-200 checked:bg-[#C17D3C] transform hover:scale-110"
              />
              <label htmlFor={part} className="text-lg cursor-pointer">
                {part.charAt(0).toUpperCase() + part.slice(1)}
              </label>
            </div>
          ))}
          <button type="submit" className="mt-4 py-2 px-4 bg-[#C17D3C] text-white rounded-lg text-sm w-24 hover:scale-105 transition-all duration-200">
            Submit
          </button>
        </form>
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-gray-800">
          <div className="bg-white text-[#0B132A] p-8 rounded-lg shadow-xl w-[400px] max-w-full space-y-4">
            <h3 className="text-2xl font-semibold">Maintenance Successful</h3>
            <p className="text-lg text-gray-600">The selected parts have been successfully marked for maintenance. Thank you for your submission!</p>
            <button 
              onClick={handleClosePopup} 
              className="mt-4 py-2 px-6 bg-[#C17D3C] text-white rounded-lg transition-all duration-200 hover:bg-[#a96a33]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div></>
  );
}

export default Maintenance;