import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Toast from "../Toast";
import { useNavigate } from "react-router-dom";
const Base_Url = import.meta.env.VITE_API_URL;
function ShowroomSignUp() {
  const navigate=useNavigate()
  const [sname, setsname] = useState('')
  const [owner, setowner] = useState('')
  const [cnic, setcnic] = useState('')
  const [contact, setcontact] = useState('')
  const [address, setaddress] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [cpassword, setcpassword] = useState('')
 const [image, setimage] = useState(null)
  const [logo, setLogo] = useState(null);
  // const [license, setLicense] = useState("");

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setimage(file);
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };
  const Handlesubmit = (e) => {
    e.preventDefault();
    if(!image){
      return console.log('Image is required');
    }
    const formData=new FormData();
    formData.append('images',image);
    formData.append('ownerName',owner)
    formData.append("showroomName", sname);
    formData.append("cnic", cnic);
    formData.append("contactNumber", contact);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", "showroom");
    if (password !== cpassword) {
      let msg = "Check your confirm password";
      Toast(msg, "error");
      return;
    }
    // if (license === "") {
    //   Toast("License or Registration number is required", "error");
    //   return;
    // }
    axios.post(`${Base_Url}/api/signup`,formData).then((response) => {
        console.log(response);
        console.log(response.data);
        console.log(response.status);
        if (response.status === 201) {
          Toast(response.data, "sucess", navigate("/login"));
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          Toast(error.response.data, "error");
        }
        Toast(error.response, "error");
      });
  };
  return (
    <div className="flex items-center justify-center background min-w-max min-h-screen py-16">
      <div className="w-screen h-fit max-w-md py-5 px-7 bg-gray-300 backdrop-blur-lg bg-white/30 border border-white/10 rounded-3xl  p-5 shadow-lg">
        <img
          src="/src/assets/logo.svg"
          className="w-[80px] -my-5 -mx-5 -mt-4"
          alt=""
        />
        <h2 className="text-3xl font-bold text-[#02073F]">Register Showroom</h2>
        <form onSubmit={Handlesubmit} className="mt-8  rounded mb-4">
          <div className="mb-4 text-center">
            <label className="block text-sm text-[#02073F] font-bold mb-2">
              Choose Showroom Picture
            </label>
            <div className="flex justify-center items-center mb-4">
              <img
                src={logo || "/assets/avatar-placeholder.png"}
                alt=""
                className="w-24 h-24 object-cover rounded-full border border-gray-300"
              />
            </div>
            <input
              type="file"
              name="images"
              accept="image/*"
              onChange={handleLogoChange}
              className="text-sm text-gray-600"
            />
          </div>

          {/* Name */}
          <div className="mb-4">
            <label
              className=" text-sm block text-[#02073F] font-bold mb-2"
              htmlFor="Sname"
            >
              Showroom Name
            </label>
            <input
              value={sname}
              onChange={(e) => setsname(e.target.value)}
              type="text"
              id="Sname"
              placeholder="Cars Club"
              className="shadow placeholder:text-xs appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/*Owner Name */}
          <div className="mb-4">
            <label
              className=" text-sm block text-[#02073F] font-bold mb-2"
              htmlFor="Oname"
            >
              Owner Name
            </label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setowner(e.target.value)}
              id="Oname"
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
              Owner&#39;s cnic
            </label>
            <input
              type="text"
              value={cnic}
              onChange={(e) => setcnic(e.target.value)}
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
              Owner&#39;s Contact Number
            </label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setcontact(e.target.value)}
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
              Showroom Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
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
              Company/Owner Email
            </label>
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              id="email"
              placeholder="name@example.com"
              className="shadow placeholder:text-xs appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {/* license */}
          {/* <div className="mb-4">
            <label
              className=" text-sm block text-[#02073F] font-bold mb-2"
              htmlFor="email"
            >
              Showroom License or registration
            </label>
            <input
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              type="text"
              id="License"
              placeholder="12345BB12AA"
              className="shadow placeholder:text-xs appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div> */}

          {/* Password */}
          <div className="mb-4">
            <label
              className=" text-sm block text-[#02073F] font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
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
              value={cpassword}
              onChange={(e) => setcpassword(e.target.value)}
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
              className="text-[#02073F] font-bold hover:text-[#ffffff]"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default ShowroomSignUp;
