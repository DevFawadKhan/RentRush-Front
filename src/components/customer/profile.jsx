import React, { useEffect, useState } from "react";
import Navbar from "../customer/Navbar";
import axios from "axios";
const Base_Url = import.meta.env.VITE_API_URL;
import { toast } from "react-toastify";
const UserProfile = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phonenum, setphonenum] = useState("");
  const [address, setaddress] = useState("");
  const [cnic, setcnic] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const FetchUserData = async () => {
      try {
        const response = await axios.get(`${Base_Url}/api/getuser`, {
          withCredentials: true,
        });
        console.log(response.data.userdata);
        setname(response.data.userdata.ownerName);
        setemail(response.data.userdata.email);
        setaddress(response.data.userdata.address);
        setphonenum(response.data.userdata.contactNumber);
        setcnic(response.data.userdata.cnic);
      } catch (error) {
        console.log("Error in Edit Profile", error.message);
      }
    };
    FetchUserData();
  }, []);
  const handleEdit = () => setIsEditing(true);
  const handleSave = async () => {
    setIsEditing(false);
    // Add logic to save the updated user info
    try {
      const response = await axios.put(
        `${Base_Url}/api/updateprofile`,
        {
          name: name,
          email: email,
          phonenum: phonenum,
          address: address,
          cnic: cnic,
        },
        {
          withCredentials: true,
        },
      );
      toast(response.data.message, "sucess");
    } catch (error) {
      console.log("Error in update controller", error.response.data.message);
      toast("Error in Update", "error");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optionally, reset the form to the original values
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      {console.log("address", address)};
      <div className="flex justify-center items-center mt-10">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#C17D3C]">
            Profile
          </h2>

          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold text-gray-700">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#C17D3C] transition duration-300"
                />
              ) : (
                <div className="border-2 border-gray-200 p-3 rounded-lg bg-gray-50">
                  {name}
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold text-gray-700">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#C17D3C] transition duration-300"
                />
              ) : (
                <div className="border-2 border-gray-200 p-3 rounded-lg bg-gray-50">
                  {email}
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold text-gray-700">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={phonenum}
                  onChange={(e) => setphonenum(e.target.value)}
                  className="border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#C17D3C] transition duration-300"
                />
              ) : (
                <div className="border-2 border-gray-200 p-3 rounded-lg bg-gray-50">
                  {phonenum}
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold text-gray-700">
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                  className="border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#C17D3C] transition duration-300"
                />
              ) : (
                <div className="border-2 border-gray-200 p-3 rounded-lg bg-gray-50">
                  {address}
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold text-gray-700">
                CNIC
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="cnic"
                  value={cnic}
                  onChange={(e) => setcnic(e.target.value)}
                  className="border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#C17D3C] transition duration-300"
                />
              ) : (
                <div className="border-2 border-gray-200 p-3 rounded-lg bg-gray-50">
                  {cnic}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-[#C17D3C] text-white px-8 py-3 rounded-lg hover:bg-[#A56A33] transition duration-300"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
