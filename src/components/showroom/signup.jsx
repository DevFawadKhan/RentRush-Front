import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Toast from "../Toast";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Base_Url = import.meta.env.VITE_API_URL;

function ShowroomSignUp() {
  const navigate = useNavigate();
  const [sname, setsname] = useState("");
  const [owner, setowner] = useState("");
  const [cnic, setcnic] = useState("");
  const [contact, setcontact] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [image, setimage] = useState(null);
  const [logo, setLogo] = useState(null);
  const [passwordError, setPasswordError] = useState(""); // State for password mismatch error
  const [ownerError, setOwnerError] = useState(""); // State for owner name validation error

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setimage(file);
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const validateOwnerName = (name) => {
    const regex = /^[A-Za-z\s]+$/; // Only alphabets and spaces allowed
    return regex.test(name);
  };

  const Handlesubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setPasswordError("");
    setOwnerError("");

    // Validate Owner Name
    if (!validateOwnerName(owner)) {
      setOwnerError("Owner name should only contain alphabets and spaces.");
      return;
    }

    // Validate Password Match
    if (password !== cpassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    if (!image) {
      Toast("Image is required", "error");
      return;
    }

    const formData = new FormData();
    formData.append("images", image);
    formData.append("ownerName", owner);
    formData.append("showroomName", sname);
    formData.append("cnic", cnic);
    formData.append("contactNumber", contact);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", "showroom");

    axios
      .post(`${Base_Url}/api/signup`, formData)
      .then((response) => {
        if (response.status === 201) {
          Toast(response.data, "success", () => navigate("/login"));
        }
      })
      .catch((error) => {
        Toast(error.response?.data || "Error occurred", "error");
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center background min-h-screen py-16">
        <div className="w-screen h-fit max-w-lg p-5 bg-gray-300 backdrop-blur-lg bg-white/30 border border-white/10 rounded-3xl shadow-lg">
          <div className="flex justify-center">
            <img src="/src/assets/logo.png" className="-ml-4 w-[150px]" alt="Logo" />
          </div>
          <h2 className="text-3xl font-bold text-[#02073F] text-center mb-4">Register Showroom</h2>

          <form onSubmit={Handlesubmit} className="rounded mb-4">
            {/* Image Upload */}
            <div className="mb-4 text-center">
              <label className="block text-sm font-bold mb-2 text-[#02073F]">
                Choose Showroom Picture
              </label>
              <div className="flex justify-center items-center mb-4">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <img
                    src={logo || "/assets/avatar-placeholder.png"}
                    alt=""
                    className="w-28 h-28 object-cover rounded-full border-4 border-gray-300 shadow-md"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                    <span className="text-white text-sm font-semibold">Showroom Logo</span>
                  </div>
                </div>
              </div>
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={handleLogoChange}
                className="text-sm text-gray-600"
              />
            </div>

            {/* Form Table */}
            <table className="w-full text-sm text-left">
              <tbody>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Showroom Name</td>
                  <td className="py-4">
                    <input
                      value={sname}
                      onChange={(e) => setsname(e.target.value)}
                      type="text"
                      placeholder="Cars Club"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C]"
                      required
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Owner Name</td>
                  <td className="py-4">
                    <input
                      type="text"
                      value={owner}
                      onChange={(e) => {
                        setowner(e.target.value);
                        setOwnerError(""); // Clear error when typing
                      }}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C]"
                      required
                    />
                    {ownerError && (
                      <p className="text-red-900 text-xs mt-1">{ownerError}</p>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Owner's CNIC</td>
                  <td className="py-4">
                    <input
                      type="text"
                      value={cnic}
                      onChange={(e) => setcnic(e.target.value)}
                      placeholder="12345-6789012-3"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C]"
                      pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}"
                      required
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Contact Number</td>
                  <td className="py-4">
                    <input
                      type="tel"
                      value={contact}
                      onChange={(e) => setcontact(e.target.value)}
                      placeholder="0300-1234567"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C]"
                      pattern="[0-9]{4}-[0-9]{7}"
                      required
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Address</td>
                  <td className="py-4">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                      placeholder="1234 Main St, City"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C]"
                      required
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Email</td>
                  <td className="py-4">
                    <input
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      type="email"
                      placeholder="name@example.com"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C]"
                      required
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Password</td>
                  <td className="py-4">
                    <input
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      type="password"
                      placeholder="********"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C]"
                      required
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Confirm Password</td>
                  <td className="py-4">
                    <input
                      value={cpassword}
                      onChange={(e) => {
                        setcpassword(e.target.value);
                        setPasswordError(""); // Clear error when typing
                      }}
                      type="password"
                      placeholder="********"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C]"
                      required
                    />
                    {passwordError && (
                      <p className="text-red-900 text-xs mt-1">{passwordError}</p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Sign Up Button */}
            <div className="flex items-center justify-center mt-4">
              <button
                type="submit"
                className="bg-[#C17D3C] text-white font-bold py-2 px-4 rounded focus:outline-none w-full"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Redirect to Login */}
          <p className="mt-4 text-center text-[#02073F] text-xs">
            Already have an account?{" "}
            <Link to="/login" className="text-[#02073F] font-bold hover:text-[#ffffff]">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default ShowroomSignUp;
