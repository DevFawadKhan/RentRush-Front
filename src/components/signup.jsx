import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Toast from "./Toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Eye, EyeOff } from 'lucide-react';
const Base_Url = import.meta.env.VITE_API_URL;

function SignUp() {
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [contact, setcontact] = useState('');
  const [cnic, setcnic] = useState('');
  const [address, setaddress] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
const [showPassword, setShowPassword] = useState(false);

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(name)) {
      setNameError("Name should contain only letters");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = (email) => {
    // Standard email regex that allows alphabets, numbers, and certain special characters
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password) => {
    // Password should contain at least one letter, one number and one special character
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^..&*()_+])[A-Za-z\d!@#..$%^&*()_+]{8,}$/;
    if (!regex.test(password)) {
      setPasswordError("Password must contain letters, numbers, and special characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Reset errors
    setPasswordError('');
    setNameError('');
    setEmailError('');

    // Validate fields
    if (!validateName(name)) {
      Toast("Name should contain only letters", "error");
      return;
    }

    if (!validateEmail(email)) {
      Toast("Please enter a valid email address", "error");
      return;
    }

    if (!validatePassword(password)) {
      Toast("Password must contain letters, numbers, and special characters", "error");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      Toast("Passwords do not match", "error");
      return;
    }

    // Proceed with signup if all validations pass
    axios.post(`${Base_Url}/api/signup`, {
      ownerName: name,
      cnic: cnic,
      contactNumber: contact,
      address: address,
      email: email,
      password: password,
      role: 'client',
    })
      .then(response => {
        Toast(response.data, "success", () => navigate('/login'));
        console.log(response);
      })
      .catch((error) => {
        Toast(error.response?.data || "An error occurred", "error");
        console.log(error.response?.data);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center background min-w-max min-h-screen py-16">
        <div className="w-screen h-fit max-w-md py-5 px-7 bg-gray-300 backdrop-blur-lg bg-white/30 border border-white/10 rounded-3xl p-5 shadow-lg">
          <div className="flex justify-center">
            <img
              src="/src/assets/logo.png"
              className="-ml-4 p w-[100px]"
              alt=""
            />
          </div>
          <h2 className="text-3xl font-bold text-[#02073F]">Create Account</h2>
          <form onSubmit={handleSignup} className="mt-8 rounded mb-4">
            {/* Name */}
            <div className="mb-4">
              <label
                className="text-sm block text-[#02073F] font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                  validateName(e.target.value);
                }}
                type="text"
                id="name"
                placeholder="John Doe"
                className={`shadow placeholder:text-xs appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline ${
                  nameError ? 'border-red-700' : ''
                }`}
                required
              />
              {nameError && (
                <p className="text-red-700 text-xs mt-1">{nameError}</p>
              )}
            </div>

            {/* CNIC */}
            <div className="mb-4">
              <label
                className="text-sm block text-[#02073F] font-bold mb-2"
                htmlFor="cnic"
              >
                CNIC
              </label>
              <input
                value={cnic}
                onChange={(e) => setcnic(e.target.value)}
                type="text"
                id="cnic"
                placeholder="12345-6789012-3"
                className="shadow placeholder:text-xs appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
                pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}"
                title="Enter CNIC in the format 12345-6789012-3"
                required
              />
            </div>

            {/* Contact */}
            <div className="mb-4">
              <label
                className="text-sm block text-[#02073F] font-bold mb-2"
                htmlFor="contact"
              >
                Contact Number
              </label>
              <input
                value={contact}
                onChange={(e) => setcontact(e.target.value)}
                type="tel"
                id="contact"
                placeholder="0300-1234567"
                className="shadow placeholder:text-xs appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
                pattern="[0-9]{4}-[0-9]{7}"
                title="Enter contact number in the format 0300-1234567"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label
                className="text-sm block text-[#02073F] font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                type="text"
                id="address"
                placeholder="1234 Main St, City, Country"
                className="shadow placeholder:text-xs appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                className="text-sm block text-[#02073F] font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                  validateEmail(e.target.value);
                }}
                type="email"
                id="email"
                placeholder="you@example.com"
                className={`shadow placeholder:text-xs appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline ${
                  emailError ? 'border-red-700' : ''
                }`}
                required
              />
              {emailError && (
                <p className="text-red-700 text-xs mt-1">{emailError}</p>
              )}
            </div>

            {/* Password */}
      <div className="mb-2 relative">
    <label
      className="block text-[#02073F] text-sm font-bold mb-2"
      htmlFor="password"
    >
      Password
    </label>
    <input
      type={showPassword ? 'text' : 'password'}
      value={password}
      id="password"
      onChange={(e) => setpassword(e.target.value)}
      placeholder="Password"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
      required
    />
    <span
      className="absolute top-9 right-3 cursor-pointer"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
    </span>
    </div>

        {/* Confirm Password */}
    <div className="mb-2 relative">
    <label
      className="block text-[#02073F] text-sm font-bold mb-2"
      htmlFor="password"
    >
      Password
    </label>
    <input
      type={showPassword ? 'text' : 'password'}
      value={confirmPassword}
      id="password"
      onChange={(e) => setConfirmPassword(e.target.value)}
      placeholder="Password"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
      required
    />
    <span
      className="absolute top-9 right-3 cursor-pointer"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
    </span>
    </div>

            {/* Centered Sign Up Button */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-[#C17D3C] text-white font-bold py-2 px-4 rounded focus:outline-none w-full focus:shadow-outline"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div>
            {/* Redirect to Login */}
            <p className="mt-4 text-center text-[#02073F] text-xs">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#02073F] hover:cursor-pointer hover:text-[#ffffff] font-bold"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;