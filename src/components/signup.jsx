import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Toast from "./Toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Eye, EyeOff, User, CreditCard, Phone, MapPin, Mail, Lock } from "lucide-react";

const Base_Url = import.meta.env.VITE_API_URL;

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    cnic: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    contact: '',
    cnic: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (!/^[a-zA-Z\s]+$/.test(value))
          error = 'Name should contain only letters';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
          error = 'Please enter a valid email address';
        break;
      case 'cnic':
        if (!value.trim()) error = 'CNIC is required';
        else if (!/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(value))
          error = 'CNIC must be in format XXXXX-XXXXXXX-X';
        break;
      case 'contact':
        if (!value.trim()) error = 'Contact number is required';
        else if (!/^[0-9]{4}-[0-9]{7}$/.test(value))
          error = 'Contact must be in format XXXX-XXXXXXX';
        break;
      case 'password':
        if (!value.trim()) error = 'Password is required';
        else if (value.length < 8)
          error = 'Password must be at least 8 characters';
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(value))
          error = 'Password must contain uppercase, lowercase, numbers, and special characters';
        break;
      case 'confirmPassword':
        if (!value.trim()) error = 'Please confirm your password';
        else if (value !== formData.password) error = 'Passwords do not match';
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    let isValid = true;
    Object.keys(formData).forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    if (!isValid) {
      Toast('Please fix the errors in the form', 'error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(`${Base_Url}/api/signup`, {
        ownerName: formData.name,
        cnic: formData.cnic,
        contactNumber: formData.contact,
        address: formData.address,
        email: formData.email,
        password: formData.password,
        role: "client",
      });

      if (response.status === 201) {
        Toast(response.data, 'success', () => navigate('/login'));
      }
    } catch (error) {
      Toast(error.response?.data || 'An error occurred', 'error');
      console.error('Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        {/* Luxury Car Background */}
        <div className="absolute inset-0 bg-black/50 z-0">
          <img 
            // src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
           src="/src/assets/background.png"
            alt="Car Showroom Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Premium Form Card */}
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="flex flex-col md:flex-row">
            {/* Luxury Image Side */}
            <div className="hidden md:block md:w-1/3 bg-[url('/src/assets/car-interior.jpg')] bg-cover bg-center relative">
              <div className="absolute inset-0 bg-[#C17D3C]/80 mix-blend-multiply"></div>
              <div className="relative h-full flex flex-col justify-between p-8">
                <div>
                  <img 
                    src="/src/assets/logo.png" 
                    className="h-24 w-auto mb-6" 
                    alt="Luxury Motors" 
                  />
                  <h3 className="text-2xl font-bold text-white mb-2">Join RentRush</h3>
                  <p className="text-white/90 text-sm">Access Premium Cars and VIP Services</p>
                </div>
                <div className="text-white text-xs">
                  <p>Already a Member?</p>
                  <Link
                    to="/login"
                    className="font-medium text-white hover:underline inline-flex items-center mt-1"
                  >
                    Sign in here <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Form Side */}
            <div className="w-full md:w-2/3 p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600">Register to access our Cars collection</p>
              </div>
              
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name Field */}
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="John Doe"
                        className={`pl-10 w-full px-4 py-3 border ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent transition-all`}
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  {/* Email Field */}
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="you@example.com"
                        className={`pl-10 w-full px-4 py-3 border ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent transition-all`}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  {/* CNIC Field */}
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="cnic" className="block text-sm font-medium text-gray-700 mb-1">
                      CNIC
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="cnic"
                        name="cnic"
                        type="text"
                        value={formData.cnic}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="12345-6789012-3"
                        className={`pl-10 w-full px-4 py-3 border ${
                          errors.cnic ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent transition-all`}
                      />
                    </div>
                    {errors.cnic && <p className="mt-1 text-sm text-red-600">{errors.cnic}</p>}
                  </div>

                  {/* Contact Field */}
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="contact"
                        name="contact"
                        type="tel"
                        value={formData.contact}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="0300-1234567"
                        className={`pl-10 w-full px-4 py-3 border ${
                          errors.contact ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent transition-all`}
                      />
                    </div>
                    {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact}</p>}
                  </div>

                  {/* Address Field */}
                  <div className="col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="1234 Main St, City, Country"
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="••••••••"
                        className={`pl-10 w-full px-4 py-3 border ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent transition-all`}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C17D3C] transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    <p className="mt-1 text-xs text-gray-500">
                      Must contain uppercase, lowercase, number, and special character
                    </p>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="••••••••"
                        className={`pl-10 w-full px-4 py-3 border ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent transition-all`}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C17D3C] transition-colors"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-[#C17D3C] text-white font-medium rounded-lg shadow-md hover:bg-[#B06F35] focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:ring-offset-2 transition-all duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600 md:hidden">
                <p>Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-[#C17D3C] hover:text-[#B06F35]"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
