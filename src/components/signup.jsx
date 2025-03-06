import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import Toast from "./Toast";
const Base_Url = import.meta.env.VITE_API_URL;
function SignUp() {
  const navigate = useNavigate();
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [contact, setcontact] = useState('')
  const [cnic, setcnic] = useState('')
  const [address, setaddress] = useState('')
  const [password, setpassword] = useState('')
  const handleSignup=(e)=>{
   e.preventDefault();
   axios.post(`${Base_Url}/api/signup`,{
    ownerName:name,
    cnic:cnic,
    contactNumber:contact,
    address:address,
    email:email,
    password:password,
    role:'client',
   }).then(response=>{
    Toast(response.data, "success", ()=>navigate('/login'))
    console.log(response)
  }).catch(error=>{
    Toast(error.response.data || "error occured", "error")
    console.log(error.response.data)
   })
  }
  return (
    <div className="flex items-center justify-center background min-w-max min-h-screen py-16">
      <div className="w-screen h-fit max-w-md py-5 px-7 bg-gray-300 backdrop-blur-lg bg-white/30 border border-white/10 rounded-3xl  p-5 shadow-lg">
        <img
          src="/src/assets/logo.svg"
          className="w-[80px] -my-5 -mx-5 -mt-4"
          alt=""
        />
        <h2 className="text-3xl font-bold text-[#02073F]">Create Account</h2>
        <form onSubmit={handleSignup} className="mt-8  rounded mb-4">
          {/* Name */}
          <div className="mb-4">
            <label
               className=" text-sm block text-[#02073F] font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
             value={name} onChange={(e)=>setname(e.target.value)} type="text"
              id="name"
              placeholder="John Doe"
              className="shadow placeholder:text-xs appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* CNIC */}
          <div className="mb-4">
            <label
              className=" text-sm block text-[#02073F] font-bold mb-2"
              htmlFor="cnic"
            >
              CNIC
            </label>
            <input
             value={cnic} onChange={(e)=>setcnic(e.target.value)}  type="text"
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
              className=" text-sm block text-[#02073F] font-bold mb-2"
              htmlFor="contact"
            >
              Contact Number
            </label>
            <input
             value={contact} onChange={(e)=>setcontact(e.target.value)}  type="tel"
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
              className=" text-sm block text-[#02073F] font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
            value={address} onChange={(e)=>setaddress(e.target.value)}   type="text"
              id="address"
              placeholder="1234 Main St, City, Country"
              className="shadow placeholder:text-xs appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className=" text-sm block text-[#02073F] font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
             value={email} onChange={(e)=>setemail(e.target.value)}  type="email"
              id="email"
              placeholder="you@example.com"
              className="shadow placeholder:text-xs appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className=" text-sm block text-[#02073F] font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
             value={password} onChange={(e)=>setpassword(e.target.value)}  type="password"
              id="password"
              placeholder="********"
              className="shadow placeholder:text-xs appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label
              className=" text-sm block text-[#02073F] font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="********"
              className="shadow placeholder:text-xs appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Centered Sign Up Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#C17D3C] text-white font-bold py-2 px-4 rounded focus:outline-none w-full  focus:shadow-outline"
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
  );
}
export default SignUp;
