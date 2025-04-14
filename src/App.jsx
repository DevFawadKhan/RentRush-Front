import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Public Components
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import LandingPage from "./components/landingPage.jsx";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ResetConfirmation from "./components/ResetConfirmation";

// Customer Components
import CustomerDashboard from "./components/customer/Dashboard";
import UserProfile from "./components/customer/Profile";
import Cars from "./components/customer/Cars";
import Showrooms from "./components/customer/Showrooms";
import Bookings from "./components/customer/Bookings";
import EditBooking from "./components/customer/EditBooking";
import CarDetailsScreen from '../src/components/customer/CarDetailsScreen.jsx'
import Invoice from "./components/customer/Invoice";
import Services from "./components/customer/Services";
import Reviews from "./components/customer/Reviews";
import Showroomcars from "./components/customer/Showroomcars.jsx";

// Showroom Components
import ShowroomSignUp from "./components/showroom/SignUp";
import ShowroomDashboard from "./components/showroom/Dashboard";
import ShowroomInventory from "./components/showroom/Inventory";
import ShowroomMaintenance from "./components/showroom/Maintenance";

// Admin Components
import Adminpage from "./components/admin/Adminpage.jsx";


function App() {
  return (
   
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route>
              <Route index element={<LandingPage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
              <Route path="reset-confirmation" element={<ResetConfirmation />} />
              <Route path="showroom/signup" element={<ShowroomSignUp />} />
            </Route>

            {/* Customer Routes */}
            <Route >
              <Route index element={<CustomerDashboard />} />
              <Route path="dashboard" element={<CustomerDashboard />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="cars" element={<Cars />} />
              <Route path="showrooms" element={<Showrooms />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="edit-booking" element={<EditBooking />} />
              <Route path="/customer/CarDetailsScreen/:bookingId" element={<CarDetailsScreen></CarDetailsScreen>}></Route>
              <Route path="invoice" element={<Invoice />} />
              <Route path="services" element={<Services />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="/customer/detailcars/:id" element={<Showroomcars/>}></Route> 
            </Route>

            {/* Showroom Routes */}
            <Route   >
              <Route index element={<ShowroomDashboard />} />
              <Route path="dashboard" element={<ShowroomDashboard />} />
              <Route path="inventory" element={<ShowroomInventory />} />
              <Route path="maintenance" element={<ShowroomMaintenance />} />
            </Route>

            {/* Admin Routes */}
            <Route   >
            <Route path="/admin/Adminpage" element={<Adminpage />}></Route>
            </Route>

            {/* 404 Page */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;