import { useState } from 'react';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Simulate an API request for resetting the password
    setTimeout(() => {
      if (email === 'test@example.com') {
        setSuccessMessage('Check your email for the reset link!');
      } else {
        setErrorMessage('Email not found. Please try again.');
      }
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center background h-[calc(100vh-0px)]">
       <div className="w-[40%] py-5 px-8 bg-white/30 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg">
        <div className="text-center mb-5">
          <div className="flex justify-center">
            <img src="/src/assets/logo.svg" className="-ml-4 p w-[200px]" alt="" />
          </div>
          <h2 className="pt-2 font-bold text-[35px] text-[#02073F] ml-5">Forgot Password</h2>
        </div>
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <p className="text-center mb-4">
              Enter the email address associated with your account, and we'll send
              you a link to reset your password.
            </p>
            <div className="flex items-center w-full mb-5">
              <input
                type="email"
                className="w-[70%] p-3 text-lg border border-gray-300 rounded-lg mr-2 outline-none focus:border-orange-600"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-[#C17D3C] text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline w-[30%]"


                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
              </button>
            </div>
          </form>

          {successMessage && (
            <div className="text-center mt-5 text-green-500">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="text-center mt-5 text-red-500">{errorMessage}</div>
          )}

          <div className="flex justify-between text-m mt-6 w-full">
            <div className="text-center">
              <a href="/login" className="text-[#0B132A] hover:text-white">
                Remembered your password? Login
              </a>
            </div>
            <div className="text-center">
              <a href="#" className="text-[#0B132A] hover:text-white">
                Need more help? Contact support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}