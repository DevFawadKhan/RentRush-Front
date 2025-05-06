import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Toast from "../Toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Upload, User, Building, CreditCard, Phone, MapPin, Mail, Lock } from "lucide-react";
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
  const [image, setImage] = useState(null);
  const [logo, setLogo] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        Toast("Please select an image file", "error");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        Toast("Image size should be less than 2MB", "error");
        return;
      }
      setImage(file);
      setLogo(URL.createObjectURL(file));
    }
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "sname":
        if (!value.trim()) error = "Showroom name is required";
        else if (!/^[a-zA-Z0-9\s&'-]+$/.test(value))
          error = "Showroom name can only contain letters, numbers, spaces, &, ', or -";
        else if (value.length < 3) error = "Showroom name must be at least 3 characters";
        break;
      case "owner":
        if (!value.trim()) error = "Owner name is required";
        else if (!/^[a-zA-Z\s]+$/.test(value))
          error = "Owner name can only contain letters and spaces";
        else if (value.length < 3) error = "Owner name must be at least 3 characters";
        break;
      case "cnic":
        if (!value.trim()) error = "CNIC is required";
        else if (!/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(value))
          error = "CNIC must be in format XXXXX-XXXXXXX-X";
        break;
      case "contact":
        if (!value.trim()) error = "Contact number is required";
        else if (!/^[0-9]{4}-[0-9]{7}$/.test(value))
          error = "Contact must be in format XXXX-XXXXXXX";
        break;
      case "address":
        if (!value.trim()) error = "Address is required";
        else if (value.length < 10)
          error = "Address must be at least 10 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        )
          error = "Please enter a valid email address";
        break;
      case "password":
        if (!value.trim()) error = "Password is required";
        else if (value.length < 8)
          error = "Password must be at least 8 characters";
        else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
            value,
          )
        )
          error =
            "Password must contain uppercase, lowercase, numbers, and special characters";
        break;
      case "cpassword":
        if (!value.trim()) error = "Please confirm your password";
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

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    let isValid = true;
    Object.keys(formData).forEach((field) => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    if (!isValid) {
      Toast("Please fix the errors in the form", "error");
      setIsSubmitting(false);
      return;
    }

    if (!image) {
      Toast("Showroom logo/image is required", "error");
      setIsSubmitting(false);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen py-8 px-4 flex items-center justify-center">
     
        <div className="absolute inset-0 bg-black/50 z-0">
          <img 
            src="/src/assets/background.png"
            alt="Car Showroom Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 w-full max-w-md p-6 bg-white/50 rounded-2xl shadow-xl backdrop-blur-sm border border-white/20">
          <div className="flex flex-col items-center mb-5">
            <img
              src="/src/assets/logo.png"
              className="h-[100px] object-contain" 
              alt="Logo"
            />
            <h2 className="mt-2 text-2xl font-bold text-[#00004b] text-center leading-tight">  
              Showroom Registration
            </h2>
            <p className="text-gray-900 mt-1 text-sm text-center leading-tight">  {/* Added text-sm */}
              Create your account to start listing vehicles
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">  {/* Reduced space-y from 6 to 4 */}
            {/* Logo Upload */}
            <div className="flex flex-col items-center">
              <label className="relative cursor-pointer group">
                <div className="w-24 h-24 rounded-full border-4 border-dashed border-gray-900 group-hover:border-[#C17D3C] transition-colors flex items-center justify-center overflow-hidden">  {/* Reduced size from 32 to 24 */}
                  {logo ? (
                    <img
                      src={logo}
                      alt="Showroom Logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-900">
                      <Upload size={24} className="mb-1" />  {/* Reduced icon size */}
                      <span className="text-xs">Upload Logo</span>  {/* Reduced text size */}
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  required
                />
              </label>
              {!logo && (
                <p className="mt-1 text-xs text-gray-900 leading-tight"> 
                  Recommended: Square image, 300x300px
                </p>
              )}
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 gap-4">  
              {/* Showroom Name */}
              <div className="space-y-1"> 
                <label className="flex items-center text-sm font-medium text-gray-900 leading-tight">
                  <Building className="w-4 h-4 mr-2 text-[#C17D3C]" />
                  Showroom Name
                </label>
                <input
                  name="sname"
                  value={formData.sname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Cars Club"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                    errors.sname ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.sname && (
                  <p className="text-red-500 text-xs mt-1 leading-tight">{errors.sname}</p>
                )}
              </div>

              {/* Owner Name */}
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-900 leading-tight">
                  <User className="w-4 h-4 mr-2 text-[#C17D3C]" />
                  Owner Name
                </label>
                <input
                  name="owner"
                  type="text"
                  value={formData.owner}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="John Doe"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                    errors.owner ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.owner && (
                  <p className="text-red-500 text-xs mt-1 leading-tight">{errors.owner}</p>
                )}
              </div>

              {/* CNIC */}
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-900 leading-tight">
                  <CreditCard className="w-4 h-4 mr-2 text-[#C17D3C]" />
                  Owner's CNIC
                </label>
                <input
                  name="cnic"
                  type="text"
                  value={formData.cnic}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="12345-6789012-3"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                    errors.cnic ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.cnic && (
                  <p className="text-red-500 text-xs mt-1 leading-tight">{errors.cnic}</p>
                )}
              </div>

              {/* Contact */}
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-900 leading-tight">
                  <Phone className="w-4 h-4 mr-2 text-[#C17D3C]" />
                  Contact Number
                </label>
                <input
                  name="contact"
                  type="tel"
                  value={formData.contact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="0300-1234567"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                    errors.contact ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.contact && (
                  <p className="text-red-500 text-xs mt-1 leading-tight">{errors.contact}</p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-900 leading-tight">
                  <MapPin className="w-4 h-4 mr-2 text-[#C17D3C]" />
                  Address
                </label>
                <input
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="1234 Main St, City"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1 leading-tight">{errors.address}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-900 leading-tight">
                  <Mail className="w-4 h-4 mr-2 text-[#C17D3C]" />
                  Email
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 leading-tight">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-900 leading-tight">
                  <Lock className="w-4 h-4 mr-2 text-[#C17D3C]" />
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C17D3C]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}  {/* Reduced icon size */}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 leading-tight">{errors.password}</p>
                )}
                <p className="text-xs text-gray-800 mt-1 leading-tight">
                  Min 8 chars with uppercase, lowercase, number & special char
                </p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-900 leading-tight">
                  <Lock className="w-4 h-4 mr-2 text-[#C17D3C]" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    name="cpassword"
                    value={formData.cpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                      errors.cpassword ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C17D3C]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.cpassword && (
                  <p className="text-red-500 text-xs mt-1 leading-tight">{errors.cpassword}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">  {/* Reduced padding-top */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 bg-[#C17D3C] hover:bg-[#B06F35] text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:ring-offset-2 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Registering..." : "Register Showroom"}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-900 leading-tight">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#00004b] hover:text-[#B06F35]"
              >
                Log in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ShowroomSignUp;
