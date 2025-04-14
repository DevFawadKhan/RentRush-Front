import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login.jsx";
import SignUp from "./components/signup.jsx";
import ShowroomSignUp from "./components/showroom/signup.jsx"
import ShowroomDashboard from "./components/showroom/dashboard.jsx";
import ShowroomInventory from "./components/showroom/inventory.jsx"
import LandingPage from "./components/landingPage.jsx";
import CarsDashboard from "./components/customer/Dashboard.jsx";
import UserProfile from "./components/customer/profile.jsx";
import Cars from  "./components/customer/cars.jsx";
import Showrooms from "./components/customer/showrooms.jsx";
import Bookings from "./components/customer/bookings.jsx";
import Adminpage from "./components/admin/Adminpage.jsx";
import ProtectedLayout from "./auth/protectedRoute.jsx";
import EditBookingModal from '../src/components/customer/EditBooking.jsx'
import CarDetailsScreen from '../src/components/customer/CarDetailsScreen.jsx'
import Invoice from "../src/components/customer/invoice.jsx"
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import ResetConfirmation from "./components/ResetConfirmation.jsx";
import Maintenance from "./components/showroom/maintenance.jsx";
import Services from "./components/customer/Services.jsx";
import Reviews from "./components/customer/Reviews.jsx";
import Showroomcars from "./components/customer/Showroomcars.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/showroom/signup" element={<ShowroomSignUp />}></Route>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password/:token" element={<ResetPassword />}></Route>
        <Route path="/reset-confirmation" element={<ResetConfirmation />}></Route>
        <Route path="/showroom/maintenance" element={<Maintenance />}></Route>

          {/* Protected Routes */}
          <Route element={<ProtectedLayout />}>
            <Route
             path="/showroom/Dashboard"
              element={<ShowroomDashboard />}
            ></Route>
            <Route
              path="/showroom/inventory"
              element={<ShowroomInventory />}
            ></Route>
            <Route
              path="/customer/Dashboard"
              element={<CarsDashboard />}
            ></Route>
            <Route path="/customer/profile" element={<UserProfile />}></Route>
            <Route path="/customer/cars" element={<Cars />}></Route>
            <Route path="/customer/Showrooms" element={<Showrooms />}></Route>
            <Route path="/customer/bookings" element={<Bookings />}></Route>
            <Route path="/admin/Adminpage" element={<Adminpage />}></Route>
            <Route path="/customer/editbooking" element={<EditBookingModal></EditBookingModal>}></Route>
            <Route path="/customer/CarDetailsScreen/:bookingId" element={<CarDetailsScreen></CarDetailsScreen>}></Route>
            <Route path="/customer/invoice" element={<Invoice></Invoice>}></Route>
            <Route path="/customer/services" element={<Services/>}></Route>
            <Route path="/customer/reviews" element={<Reviews/>}></Route> 
            <Route path="/customer/detailcars/:id" element={<Showroomcars/>}></Route> 
            
            
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;