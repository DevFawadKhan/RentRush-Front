import React, { useState, useEffect, useRef } from "react";

function Dialog({ isOpen, onClose, onSave, isEditing, vehicle }) {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    mileage: "",
    year: "",
    engineDisplacement: "",
    rentalPrice: "",
    color: "",
    transmission: "",
    bodyType: "",
    seatCapacity: "", // New field
    luggageCapacity: "", // New field
    fuelType: "", // New field
    carFeatures: "", // New field
    images: [],
  });

  const dialogRef = useRef(null);

  useEffect(() => {
    if (isEditing && vehicle) {
      setFormData({
        id: vehicle._id,
        make: vehicle.carBrand,
        model: vehicle.carModel,
        mileage: vehicle.mileage,
        engineDisplacement: vehicle.engineType,
        year: vehicle.year,
        rentalPrice: vehicle.rentRate,
        color: vehicle.color,
        transmission: vehicle.transmission,
        bodyType: vehicle.bodyType,
        seatCapacity: vehicle.seatCapacity || "", // New field
        luggageCapacity: vehicle.luggageCapacity || "", // New field
        fuelType: vehicle.fuelType || "", // New field
        carFeatures: vehicle.carFeatures || "", // New field
        images: [vehicle.images],
      });
    } else {
      setFormData({
        make: "",
        model: "",
        mileage: "",
        engineDisplacement: "",
        rentalPrice: "",
        color: "",
        transmission: "",
        bodyType: "",
        seatCapacity: "", // New field
        luggageCapacity: "", // New field
        fuelType: "", // New field
        carFeatures: "", // New field
        images: [],
      });
    }
  }, [isEditing, vehicle]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = () => {
    onSave(formData);
    setFormData({
      make: "",
      model: "",
      mileage: "",
      engineDisplacement: "",
      rentalPrice: "",
      color: "",
      transmission: "",
      bodyType: "",
      seatCapacity: "", // New field
      luggageCapacity: "", // New field
      fuelType: "", // New field
      carFeatures: "", // New field
      images: [],
    });
    onClose();
  };

  const handleClickOutside = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={dialogRef}
            className="bg-white rounded-lg p-4 w-[50%] h-auto overflow-y-auto max-h-[80vh]"
          >
            <h2 className="text-4xl text-center font-bold mb-4">
              {isEditing ? "EDIT VEHICLE" : "ADD A NEW VEHICLE"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Existing fields */}
              <div>
                <label className="block text-xl font-bold mb-1">Brand</label>
                <input
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded whitespace-nowrap overflow-hidden text-ellipsis"
                  placeholder="Honda"
                />
              </div>
              <div>
                <label className="block text-xl font-bold mb-1">Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded whitespace-nowrap overflow-hidden text-ellipsis"
                  placeholder="Civic"
                />
              </div>
              <div>
                <label className="block text-xl font-bold mb-1">Mileage</label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded whitespace-nowrap overflow-hidden text-ellipsis"
                  placeholder="200km"
                />
              </div>
              <div>
                <label className="block text-xl font-bold mb-1">
                  Registration Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded whitespace-nowrap overflow-hidden text-ellipsis"
                  placeholder="2025"
                  min="2000"
                  max={new Date().getFullYear()}
                />
              </div>
              <div>
                <label className="block text-xl font-bold mb-1">
                  Engine Displacement
                </label>
                <input
                  type="text"
                  name="engineDisplacement"
                  value={formData.engineDisplacement}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded whitespace-nowrap overflow-hidden text-ellipsis"
                  placeholder="cc"
                />
              </div>
              <div>
                <label className="block text-xl font-bold mb-1">
                  Rental Price
                </label>
                <input
                  type="number"
                  name="rentalPrice"
                  value={formData.rentalPrice}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded whitespace-nowrap overflow-hidden text-ellipsis"
                  placeholder="200/day"
                />
              </div>
              <div>
                <label className="block text-xl font-bold mb-1">Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded whitespace-nowrap overflow-hidden text-ellipsis"
                  placeholder="Red"
                />
              </div>
              <div>
                <label className="block text-xl font-bold mb-1">
                  Transmission
                </label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div>
                <label className="block text-xl font-bold mb-1">
                  Body Type
                </label>
                <select
                  name="bodyType"
                  value={formData.bodyType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Body Type</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                </select>
              </div>

              {/* New fields */}
              <div>
                <label className="block text-xl font-bold mb-1">
                  Seat Capacity
                </label>
                <input
                  type="number"
                  name="seatCapacity"
                  value={formData.seatCapacity}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded whitespace-nowrap overflow-hidden text-ellipsis"
                  placeholder="5"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-xl font-bold mb-1">
                  Luggage Capacity
                </label>
                <input
                  type="number"
                  name="luggageCapacity"
                  value={formData.luggageCapacity}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded whitespace-nowrap overflow-hidden text-ellipsis"
                  placeholder="2"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-xl font-bold mb-1">
                  Fuel Type
                </label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-xl font-bold mb-1">
                  Car Features
                </label>
                <textarea
                  name="carFeatures"
                  value={formData.carFeatures}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter car features (e.g., GPS, Air Conditioning)"
                />
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-xl font-bold mb-1">Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded"
                />
                {formData.images.length > 0 && (
                  <div className="mt-2">
                    {formData.images.map((file, index) => (
                      <p key={index} className="text-sm">
                        {file.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </form>

            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#C17D3C] text-white rounded hover:bg-[#A86428]"
              >
                {isEditing ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dialog;
