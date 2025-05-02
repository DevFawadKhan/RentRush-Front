import {
  faBan,
  faCheck,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import axios from "axios";
import Toast from "../Toast";

const Base_Url = import.meta.env.VITE_API_URL;

const Showroom = ({ value, refectch }) => {
  const [statuses, setStatuses] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShowroom, setSelectedShowroom] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState("");
  const [actionType, setActionType] = useState(""); // To track whether it's ban/activate or approve/reject
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
      if (response?.data?.msg) Toast(response?.data?.msg, "success");

      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [id]: nextStatus,
      }));
      setIsModalOpen(false);
      refectch();
    } catch (error) {
      Toast(error.response?.data?.msg || "An error occurred", "error");
    }
  };

  const updateShowroomApproval = async (id, approve) => {
    try {
      const url = `${Base_Url}/api/admin/approve/${id}`;
      const response = await axios.put(url, { isApproved: approve ? 1 : 0 });
      if (response.data?.message === "Showroom approval rejected!") {
        Toast("Showroom approval rejected!", "warn");
      } else Toast(response.data?.message, "success");

      // Update the selected showroom's approval status
      setSelectedShowroom((prev) => ({
        ...prev,
        isApproved: approve,
      }));
      setIsModalOpen(false);
      refectch();
    } catch (error) {
      Toast(error.response?.message || "An error occurred", "error");
    }
  };

  const openConfirmDialog = (id, status, type) => {
    setSelectedShowroom((prev) => ({ ...prev, _id: id }));
    setNextStatus(status);
    setActionType(type);
    setIsConfirmDialogOpen(true);
  };

  const handleStatusChange = () => {
    if (selectedShowroom?._id) {
      if (actionType === "ban") {
        banShowroom(selectedShowroom._id);
      } else if (actionType === "approve") {
        updateShowroomApproval(selectedShowroom._id, nextStatus === "approved");
      }
    }
    setIsConfirmDialogOpen(false);
    refectch();
  };

  // Filter showrooms for different sections
  const needApprovalShowrooms = value.filter(
    (showroom) => !showroom.isApproved
  );

  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const newShowrooms = value.filter((showroom) => {
    const createdAt = new Date(showroom.createdAt);
    return createdAt > twoDaysAgo;
  });

  const filteredAllShowrooms = value.filter((showroom) =>
    showroom.showroomName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderShowroomCard = (data) => (
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

      {/* Need Approval Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-[#394A9A] mb-4">
          Need Approval
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {needApprovalShowrooms.length > 0 ? (
            needApprovalShowrooms.map(renderShowroomCard)
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No showrooms need approval.
            </p>
          )}
        </div>
      </div>

      {/* New Showrooms Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-[#394A9A] mb-4">
          New Showrooms (Last 2 Days)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newShowrooms.length > 0 ? (
            newShowrooms.map(renderShowroomCard)
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No new showrooms in the last 2 days.
            </p>
          )}
        </div>
      </div>

      {/* All Showrooms Section */}
      <div>
        <h3 className="text-2xl font-semibold text-[#394A9A] mb-4">
          All Showrooms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAllShowrooms.length > 0 ? (
            filteredAllShowrooms.map(renderShowroomCard)
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No showrooms found.
            </p>
          )}
        </div>
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
                <span className="font-semibold">Approval Status:</span>{" "}
                <span
                  className={
                    selectedShowroom.isApproved
                      ? "text-green-600"
                      : "text-yellow-600"
                  }
                >
                  {selectedShowroom.isApproved ? "Approved" : "Pending"}
                </span>
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
              {!selectedShowroom.isApproved && (
                <>
                  <button
                    className="w-full py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors duration-200"
                    onClick={() =>
                      openConfirmDialog(
                        selectedShowroom._id,
                        "approved",
                        "approve"
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faCheck} className="mr-2" />
                    Approve Showroom
                  </button>
                  <button
                    className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors duration-200"
                    onClick={() =>
                      openConfirmDialog(
                        selectedShowroom._id,
                        "rejected",
                        "approve"
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                    Reject Showroom
                  </button>
                </>
              )}
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
                      : "active",
                    "ban"
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
            actionType === "ban"
              ? nextStatus === "banned"
                ? "Are you sure you want to ban this showroom?"
                : "Are you sure you want to activate this showroom?"
              : nextStatus === "approved"
                ? "Are you sure you want to approve this showroom?"
                : "Are you sure you want to reject this showroom?"
          }
          onConfirm={handleStatusChange}
          onCancel={() => setIsConfirmDialogOpen(false)}
        />
      )}
    </section>
  );
};

export default Showroom;
