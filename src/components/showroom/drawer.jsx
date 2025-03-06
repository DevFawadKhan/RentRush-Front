import React from "react";
import { Link } from "react-router-dom";

function Drawer({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg z-50`}
      >
        <div className="bg-gray-200 p-4 shadow">
          <h2 className="text-xl font-bold text-black">Menu</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500"
          >
            X
          </button>
        </div>

        <div className="p-6 space-y-4">
          <Link
            to="/"
            className="block text-lg font-semibold text-gray-800 hover:bg-gray-100 p-2 rounded"
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            to="/showroom/inventory"
            className="block text-lg font-semibold text-gray-800 hover:bg-gray-100 p-2 rounded"
            onClick={onClose}
          >
            Inventory
          </Link>
          <button
            onClick={() => {
              console.log("Sign out clicked");
              onClose();
            }}
            className="block text-lg font-semibold text-gray-800 hover:bg-gray-100 p-2 rounded"
          >
            Sign Out
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
    </>
  );
}

export default Drawer;
