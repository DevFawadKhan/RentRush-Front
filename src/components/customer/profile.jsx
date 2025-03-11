import React, { useState } from "react";
import Navbar from "../customer/Navbar";

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        address: "123 Main St",
        cnic: "12345-6789012-3"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handleEdit = () => setIsEditing(true);

    const handleSave = () => {
        setIsEditing(false);
        // Add logic to save the updated user info
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Optionally, reset the form to the original values
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />

            <div className="flex justify-center items-center mt-10">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-[#C17D3C]">Profile</h2>

                    <div className="space-y-6">
                        <div className="flex flex-col space-y-2">
                            <label className="text-lg font-semibold text-gray-700">Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={userInfo.name}
                                    onChange={handleInputChange}
                                    className="border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#C17D3C] transition duration-300"
                                />
                            ) : (
                                <div className="border-2 border-gray-200 p-3 rounded-lg bg-gray-50">
                                    {userInfo.name}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-lg font-semibold text-gray-700">Email</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleInputChange}
                                    className="border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#C17D3C] transition duration-300"
                                />
                            ) : (
                                <div className="border-2 border-gray-200 p-3 rounded-lg bg-gray-50">
                                    {userInfo.email}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-lg font-semibold text-gray-700">Phone Number</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={userInfo.phone}
                                    onChange={handleInputChange}
                                    className="border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#C17D3C] transition duration-300"
                                />
                            ) : (
                                <div className="border-2 border-gray-200 p-3 rounded-lg bg-gray-50">
                                    {userInfo.phone}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-lg font-semibold text-gray-700">Address</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="address"
                                    value={userInfo.address}
                                    onChange={handleInputChange}
                                    className="border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#C17D3C] transition duration-300"
                                />
                            ) : (
                                <div className="border-2 border-gray-200 p-3 rounded-lg bg-gray-50">
                                    {userInfo.address}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-lg font-semibold text-gray-700">CNIC</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="cnic"
                                    value={userInfo.cnic}
                                    onChange={handleInputChange}
                                    className="border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#C17D3C] transition duration-300"
                                />
                            ) : (
                                <div className="border-2 border-gray-200 p-3 rounded-lg bg-gray-50">
                                    {userInfo.cnic}
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
}

export default UserProfile;
