import { faBan, faCheck, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import axios from "axios";

const Base_Url = import.meta.env.VITE_API_URL;

const Showroom = ({ value }) => {
  const [statuses, setStatuses] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShowroom, setSelectedShowroom] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const initialStatuses = {};
    value.forEach((showroom) => {
      initialStatuses[showroom._id] = showroom.status || "active";
    });
    setStatuses(initialStatuses);
  }, [value]);

  const banShowroom = async (id) => {
    try {
      const url = `${Base_Url}/api/admin/banshowroom/${id}`;
      const response = await axios.post(url);
      alert(response.data.msg);

      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [id]: nextStatus,
      }));
      setIsModalOpen(false);
    } catch (error) {
      alert(error.response?.data?.msg || "An error occurred");
    }
  };

  const openConfirmDialog = (id, status) => {
    setSelectedShowroom((prev) => ({ ...prev, _id: id }));
    setNextStatus(status);
    setIsConfirmDialogOpen(true);
  };

  const handleStatusChange = () => {
    if (selectedShowroom?._id) {
      banShowroom(selectedShowroom._id);
    }
    setIsConfirmDialogOpen(false);
  };

  const filteredShowrooms = value.filter((showroom) =>
    showroom.showroomName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="mb-8 mx-10 w-full">
      <h2 className="text-4xl font-bold text-[#394A9A] mb-6 text-center">
        Showroom Accounts
      </h2>

      {/* Search Input */}
      <div className="max-w-lg mx-auto mb-10">
        <div className="relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search showrooms by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 pl-12 pr-4 rounded-full border-2 border-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-[#394A9A] focus:border-[#394A9A] transition-all text-sm"
          />
        </div>
      </div>

      {/* Showroom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredShowrooms.length > 0 ? (
          filteredShowrooms.map((data) => (
            <div
              key={data._id}
              onClick={() => {
                setSelectedShowroom(data);
                setIsModalOpen(true);
              }}
              className="cursor-pointer bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <h3 className="text-xl font-bold text-[#2A3F85] hover:text-[#1D2951]">
                {data.showroomName}
              </h3>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No showrooms found.
          </p>
        )}
      </div>

      {/* Showroom Details Modal */}
      {isModalOpen && selectedShowroom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedShowroom.showroomName}
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Owner:</span>{" "}
                {selectedShowroom.ownerName}
              </p>
              <p>
                <span className="font-semibold">CNIC:</span>{" "}
                {selectedShowroom.cnic}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {selectedShowroom.address}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={
                    statuses[selectedShowroom._id] === "active"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {statuses[selectedShowroom._id] === "active"
                    ? "Active"
                    : "Banned"}
                </span>
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <button
                className={`w-full py-2 rounded-lg text-white font-semibold transition-colors duration-200 ${
                  statuses[selectedShowroom._id] === "active"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={() =>
                  openConfirmDialog(
                    selectedShowroom._id,
                    statuses[selectedShowroom._id] === "active"
                      ? "banned"
                      : "active"
                  )
                }
              >
                <FontAwesomeIcon
                  icon={
                    statuses[selectedShowroom._id] === "active"
                      ? faBan
                      : faCheck
                  }
                  className="mr-2"
                />
                {statuses[selectedShowroom._id] === "active"
                  ? "Ban Showroom"
                  : "Activate Showroom"}
              </button>
              <button
                className="w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {isConfirmDialogOpen && (
        <ConfirmationDialog
          message={
            nextStatus === "banned"
              ? "Are you sure you want to ban this showroom?"
              : "Are you sure you want to activate this showroom?"
          }
          onConfirm={handleStatusChange}
          onCancel={() => setIsConfirmDialogOpen(false)}
        />
      )}
    </section>
  );
};

export default Showroom;
