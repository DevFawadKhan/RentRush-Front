import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "./Toast";
import Navbar from "./Navbar";
const Base_Url = import.meta.env.VITE_API_URL;

function Login() {
  const navigator = useNavigate();
  const [email, setEmial] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${Base_Url}/api/login`,
        { email: email, password: password },
        { withCredentials: true }
      );
      const userRole = response.data.role;
      localStorage.setItem("token", response.data.token);
      if (userRole === "admin") {
        Toast("Yahoo! Login Successfull!", "success");
        navigator("/admin");
      } else if (userRole === "client") {
        Toast("Yahoo! Login Successfull!", "success");
        localStorage.setItem("name", response.data.name);
        navigator("/customer/Dashboard");
      } else if (userRole === "showroom") {
        Toast("Welcome to Showroom!", "success");
        navigator("/showroom/inventory");
      } else {
        Toast("Role not recognized.", "error");
        navigator("/login");
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
          <img src="/src/assets/logo.svg" className="-ml-4 p" alt="" />
          <h2 className="pt-2 font-bold text-[35px] text-[#02073F] ml-5 ">
            Login
          </h2>
          <form className="mt-8 rounded  mb-4 ml-5 " onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                className="block text-[#02073F] text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmial(e.target.value)}
                id="email"
                placeholder="you@example.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-[#02073F] text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <p className="text-xs py-2 font-bold hover:cursor-pointer hover:text-[#ffffff] text-[#02073F]">
              Forgot password?
            </p>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-[#C17D3C] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-[#02073F] text-xs">
            Dont have an account?&nbsp;
            <Link
              to="/signup"
              className="text-[#02073F] hover:text-[#ffffff] font-bold"
            >
              Register for free
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
export default Login;
