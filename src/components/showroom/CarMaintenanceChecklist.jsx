import React, { useState, useEffect } from "react";
import axios from "axios";
const Base_Url = import.meta.env.VITE_API_URL;
import Toast from "../Toast";

const CarMaintenanceChecklist = ({ car, onClose }) => {
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

  const [submitted, setSubmitted] = useState(false);
  const [repairCosts, setRepairCosts] = useState({});
  const [checkAll, setCheckAll] = useState(false);

  const handleCheckAllChange = (e) => {
    const checked = e.target.checked;
    setCheckAll(checked);
    const updatedParts = {};
    Object.keys(checkedParts).forEach((part) => {
      updatedParts[part] = checked;
    });
    setCheckedParts(updatedParts);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckedParts((prev) => ({ ...prev, [name]: checked }));
  };

  const submitMaintenanceLog = async () => {
    try {
      const response = await axios.post(
        `${Base_Url}/api/car/start-maintenance`,
        {
          carId: car._id,
          maintenanceLog: checkedParts,
          maintenanceCost: repairCosts,
          showroomId: car.rentalInfo.showroomId,
          rentalStartDate: car.rentalInfo.rentalStartDate,
          rentalEndDate: car.rentalInfo.rentalEndDate,
          rentalStartTime: car.rentalInfo.rentalStartTime,
          rentalEndTime: car.rentalInfo.rentalEndTime,
        },
        {
          withCredentials: true,
        }
      );
      Toast("Maintenance log submitted", "success");
      const invoiceUrl = response.data.invoiceUrl;
      if (invoiceUrl) {
        Toast(
          <>
            {response.data.message}{" "}
            <a
              href={invoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Click here to download the Invoice
            </a>
          </>
        );
      }
    } catch (err) {
      console.log(err);
      Toast(
        err?.response?.data || err.message || "Something went wrong",
        "error"
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMaintenanceLog();
    console.log("Maintenance checklist for", car.carBrand, checkedParts);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center text-[#0B132A]">
              Maintenance Checklist
            </h2>
            <p className="text-center text-sm mb-6">
              Car: <strong>{car.carBrand + " " + car.carModel}</strong>
            </p>
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="checkAll"
                  checked={checkAll}
                  onChange={handleCheckAllChange}
                  className="w-4 h-4"
                />
                <label htmlFor="checkAll" className="font-medium text-sm">
                  Check All Items
                </label>
              </div>
            </div>
            <p className="text-sm mb-2">Select the parts to be repaired:</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.keys(checkedParts).map((part) => (
                <div
                  key={part}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-100 p-3 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={part}
                      checked={checkedParts[part]}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4"
                    />
                    <label htmlFor={part} className="capitalize text-sm">
                      {part}
                    </label>
                  </div>

                  {!checkedParts[part] && (
                    <input
                      type="number"
                      placeholder="Repair cost"
                      min="0"
                      value={repairCosts[part] || ""}
                      onChange={(e) =>
                        setRepairCosts((prev) => ({
                          ...prev,
                          [part]: e.target.value,
                        }))
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full sm:w-40 text-sm"
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#C17D3C] text-white px-4 py-2 rounded hover:bg-[#a96a33]"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-[#0B132A]">
              Maintenance Submitted
            </h3>
            <p>The checklist has been saved successfully.</p>
            <button
              onClick={onClose}
              className="mt-4 py-2 px-6 bg-[#C17D3C] text-white rounded-lg hover:bg-[#a96a33]"
            >
              Close
            </button>
          </div>
        )}
        {/* Close (X) button in corner */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default CarMaintenanceChecklist;
