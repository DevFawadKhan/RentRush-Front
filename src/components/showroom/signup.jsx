import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Toast from "../Toast";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Base_Url = import.meta.env.VITE_API_URL;

function ShowroomSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sname: "",
    owner: "",
    cnic: "",
    contact: "",
    address: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({
    sname: "",
    owner: "",
    cnic: "",
    contact: "",
    address: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [image, setimage] = useState(null);
  const [logo, setLogo] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setimage(file);
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "sname":
        if (!value) error = "Showroom name is required";
        else if (!/^[a-zA-Z0-9\s&'-]+$/.test(value))
          error =
            "Showroom name can only contain letters, numbers, spaces, &, ', or -";
        break;
      case "owner":
        if (!value) error = "Owner name is required";
        else if (!/^[a-zA-Z\s]+$/.test(value))
          error = "Owner name can only contain letters and spaces";
        break;
      case "cnic":
        if (!value) error = "CNIC is required";
        else if (!/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(value))
          error = "CNIC must be in format XXXXX-XXXXXXX-X";
        break;
      case "contact":
        if (!value) error = "Contact number is required";
        else if (!/^[0-9]{4}-[0-9]{7}$/.test(value))
          error = "Contact must be in format XXXX-XXXXXXX";
        break;
      case "address":
        if (!value) error = "Address is required";
        else if (value.length < 10)
          error = "Address must be at least 10 characters";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        )
          error = "Please enter a valid email address";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (
          !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
            value,
          )
        )
          error =
            "Password must contain letters, numbers, and special characters";
        break;
      case "cpassword":
        if (!value) error = "Please confirm your password";
        else if (value !== formData.password) error = "Passwords do not match";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    Object.keys(formData).forEach((field) => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    if (!isValid) {
      Toast("Please fix the errors in the form", "error");
      return;
    }

    if (!image) {
      Toast("Showroom logo/image is required", "error");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("images", image);
      formDataToSend.append("ownerName", formData.owner);
      formDataToSend.append("showroomName", formData.sname);
      formDataToSend.append("cnic", formData.cnic);
      formDataToSend.append("contactNumber", formData.contact);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("role", "showroom");

      const response = await axios.post(
        `${Base_Url}/api/signup`,
        formDataToSend,
      );

      if (response.status === 201) {
        Toast("Showroom registered successfully!", "success", () =>
          navigate("/login"),
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      Toast(
        error.response?.data?.message || "Error occurred during registration",
        "error",
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center background min-h-screen py-16">
        <div className="w-screen h-fit max-w-lg p-5 bg-gray-300 backdrop-blur-lg bg-white/30 border border-white/10 rounded-3xl shadow-lg">
          <div className="flex justify-center">
            <img
              src="/src/assets/logo.png"
              className="-ml-4 w-[150px]"
              alt="Logo"
            />
          </div>
          <h2 className="text-3xl font-bold text-[#02073F] text-center mb-4">
            Register Showroom
          </h2>

          <form onSubmit={handleSubmit} className="rounded mb-4">
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
                    <span className="text-white text-sm font-semibold">
                      Showroom Logo
                    </span>
                  </div>
                </div>
              </div>
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={handleLogoChange}
                className="text-sm text-gray-600"
                required
              />
            </div>

            {/* Form Table */}
            <table className="w-full text-sm text-left">
              <tbody>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Showroom Name</td>
                  <td className="py-4">
                    <input
                      name="sname"
                      value={formData.sname}
                      onChange={handleChange}
                      type="text"
                      placeholder="Cars Club"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
                        errors.sname ? "border-red-900" : ""
                      }`}
                    />
                    {errors.sname && (
                      <p className="text-red-900 text-xs mt-1">
                        {errors.sname}
                      </p>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Owner Name</td>
                  <td className="py-4">
                    <input
                      name="owner"
                      type="text"
                      value={formData.owner}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
                        errors.owner ? "border-red-900" : ""
                      }`}
                    />
                    {errors.owner && (
                      <p className="text-red-900 text-xs mt-1">
                        {errors.owner}
                      </p>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Owner's CNIC</td>
                  <td className="py-4">
                    <input
                      name="cnic"
                      type="text"
                      value={formData.cnic}
                      onChange={handleChange}
                      placeholder="12345-6789012-3"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
                        errors.cnic ? "border-red-900" : ""
                      }`}
                    />
                    {errors.cnic && (
                      <p className="text-red-900 text-xs mt-1">{errors.cnic}</p>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Contact Number</td>
                  <td className="py-4">
                    <input
                      name="contact"
                      type="tel"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="0300-1234567"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
                        errors.contact ? "border-red-900" : ""
                      }`}
                    />
                    {errors.contact && (
                      <p className="text-red-900 text-xs mt-1">
                        {errors.contact}
                      </p>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Address</td>
                  <td className="py-4">
                    <input
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="1234 Main St, City"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
                        errors.address ? "border-red-900" : ""
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-900 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Email</td>
                  <td className="py-4">
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="name@example.com"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
                        errors.email ? "border-red-900" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-900 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Password</td>
                  <td className="py-4">
                    <div className="relative">
                      <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
                          errors.password ? "border-red-900" : ""
                        }`}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-900 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Confirm Password</td>
                  <td className="py-4">
                    <input
                      name="cpassword"
                      value={formData.cpassword}
                      onChange={handleChange}
                      type="password"
                      placeholder="********"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
                        errors.cpassword ? "border-red-900" : ""
                      }`}
                    />
                    {/* <button
                      type="button"
                      className="absolute right-3 top-2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button> */}
                    {errors.cpassword && (
                      <p className="text-red-900 text-xs mt-1">
                        {errors.cpassword}
                      </p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Sign Up Button */}
            <div className="flex items-center justify-center mt-4">
              <button
                type="submit"
                className="bg-[#C17D3C] hover:bg-[#B06F35] text-white font-bold py-2 px-4 rounded focus:outline-none w-full transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Redirect to Login */}
          <p className="mt-4 text-center text-[#02073F] text-xs">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#02073F] font-bold hover:text-[#ffffff]"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default ShowroomSignUp;
