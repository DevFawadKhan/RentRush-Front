import React from "react";
const Base_Url = import.meta.env.VITE_API_URL;

const MarkCompleteMaintenance = ({ onClose }) => {
  return (
    <div className="text-center space-y-4">
      <h3 className="text-2xl font-bold text-[#0B132A]">
        Maintenance Marked Completed
      </h3>
      <p>
        The maintenance is marked completed and car is now available for other
        bookings.
      </p>
      <button
        onClick={onClose}
        className="mt-4 py-2 px-6 bg-[#C17D3C] text-white rounded-lg hover:bg-[#a96a33]"
      >
        Close
      </button>
    </div>
  );
};

export default MarkCompleteMaintenance;
