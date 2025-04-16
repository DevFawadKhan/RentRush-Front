import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Toast from "./Toast";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Base_Url = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  console.log("params", token);
  const navigate = useNavigate();
  // const location = useLocation();
  // const token = new URLSearchParams(location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Toast("Passwords do not match", "error");
      return;
    }
    try {
      const response = await axios.post(
        `${Base_Url}/api/reset-password/${token}`,
        {
          password: password,
        },
      );
      if (response.status === 200) {
        Toast("Password reset successfully!", "success");
        navigate("/login");
      }
    } catch (error) {
      Toast(error.response?.data?.message || "An error occurred", "error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center background h-[calc(100vh-70px)]">
        <div className="w-screen max-w-md py-5 px-8 bg-gray-300 backdrop-blur-lg bg-white/30 border border-white/10 rounded-3xl shadow-lg">
          <div className="flex justify-center">
            <img src="/src/assets/logo.png" className="-ml-4 p w-[150px]" />
          </div>
          <h2 className="pt-2 font-bold text-[35px] text-[#02073F] ml-5">
            Reset Password
          </h2>
          <form className="mt-8 rounded mb-4 ml-5" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                className="block text-[#02073F] text-sm font-bold mb-2"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="New Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-[#02073F] text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
                placeholder="Confirm Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-[#C17D3C] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
