import React from "react";
import ChecklistItem from "./ChecklistItem";

const checklistItems = [
  "Inspect exterior for damage",
  "Check tire pressure",
  "Ensure all lights are functioning",
  "Clean interior and exterior",
  "Check fluid levels (oil, coolant, brake fluid)",
  "Test brakes",
  "Check battery health",
  "Inspect wipers",
  "Check mileage and record",
  "Inspect spare tire and tools",
  "Verify documents (insurance, registration)",
];

const CarMaintenanceChecklist = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Car Maintenance Checklist
      </h1>
      <div className="space-y-4">
        {checklistItems.map((item, index) => (
          <ChecklistItem key={index} label={item} />
        ))}
      </div>
      <button className="mt-6 w-full py-2 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary">
        Submit Checklist
      </button>
    </div>
  );
};

export default CarMaintenanceChecklist;
