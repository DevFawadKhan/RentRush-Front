import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Toast from "../Toast";
import { toast } from "react-toastify";
const Base_Url = import.meta.env.VITE_API_URL;
const CarDetailsScreen = () => {
    // State for Extend Booking modal
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [rentalStartDate, setRentalStartDate] = useState("");
    const [rentalEndDate, setRentalEndDate] = useState("");
    const [rentalEndTime, setRentalEndTime] = useState("");
    const [rentalStartTime, setRentalStartTime] = useState("");
    const [image, setimage] = useState([])
    const [Price, setPrice] = useState(0);  
    const [BookingDetails, setBookingDetails] = useState([])
    // USESTATE FOR EndDate and EndTime POST ON EDIT BOOKING API
    const [EndDate, setEndDate] = useState("")
    const [EndTime, setEndTime] = useState("")
      // State for progress and time left
  const [progress, setProgress] = useState(0);
  const { bookingId } = useParams(); // GET BOOKING ID FROM URL
  console.log("booking id", bookingId);
  
  // Fetch booking date and time
  useEffect(() => {
    const FetchBookingDetail = async () => {
      try {
        const res = await axios.get(`${Base_Url}/api/bookcar/bookcar-detail/${bookingId}`,{
          withCredentials: true,
        });
        console.log("response from booking detail", res.data);
        setRentalStartDate(res.data.rentalStartDate)
        setRentalEndDate(res.data.rentalEndDate)
        setRentalStartTime(res.data.rentalStartTime)
        setRentalEndTime(res.data.rentalEndDate)
        setPrice(res.data.totalPrice)
        setimage(res.data.images)
        const booking = res.data;
        const startDate = new Date(booking.rentalStartDate);
        const endDate = new Date(booking.rentalEndDate);
        const difference_millisecond = endDate - startDate;
        const totalHours = difference_millisecond / (1000 * 60 * 60);
        const totalDays = difference_millisecond / (1000 * 60 * 60 * 24);
        setBookingDetails({
          ...booking,
          totalHours,
          totalDays,
        });
        
      } catch (error) {
      console.log("ERROR IN EXTEND BOOKING", error.message)
      }
    };
    if (bookingId) {
      FetchBookingDetail();
    }
  }, [bookingId]);
// USE Effect for Progress Bar
  useEffect(() => {
    if(rentalStartDate&&rentalEndDate){
    const Start=new Date(rentalStartDate).getTime();
    const end=new Date(rentalEndDate).getTime();
    const NowDate=Date.now();
    if(NowDate=>Start &&NowDate<=end){
    const TotalDuration=end-Start;
    const elapsedTime=NowDate-Start;
    const progressPercentage = (elapsedTime /TotalDuration) * 100;
    setProgress(progressPercentage)
    }else if(NowDate>end){
      setProgress(100) //Booking complete;
    }else{
      setProgress(0);
    }
    }
  },[rentalStartDate,rentalEndDate]);


  // Handle form submission
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      console.log("END DATE",EndDate);
      console.log("END TIME",EndTime);
    if (!EndDate||!EndTime) {return Toast("All Fields are required","error")}
    const res=await axios.patch(`${Base_Url}/api/bookcar/extend-booking/${bookingId}`,{
      rentalEndDate:EndDate,
      rentalEndTime:EndTime,
    },{
      withCredentials:true,
    })
    console.log("Response of Extend booking",res.data.message);
    console.log("Invoice of update booking",res.data.invoiceUrl)
    console.log("Response of Extend booking Status",res.status);
    if(res.status==200){
      const invoiceUrl = res.data.invoiceUrl;
      if (invoiceUrl) {
        Toast(
          <>
            {"Please Ganerate yourUpdated invoice"}{" "}
            <a
              href={invoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Click here to download the Invoice
            </a>
          </>
        );
      }
    }
    if(res.status===400){
      Toast(res?.data?.message || "An error occurred", "error");
    }
    } catch (error) {
      console.log("Error in Extend booking",error.response.data.message);
    }
    setEndDate("");
    setEndTime("");
    setShowBookingModal(false)
  };
  return (
    <>
    <Navbar/>
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      {/* Car Image */}
      <div className="mb-6">
        <img
          src={`/uploads/${image[0]}`}
          alt={image}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full animate-pulse"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">{progress===100?"Booking complete":"Time Left"}</p>
      </div>
      {/* Details Table */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-700">Rental Start Date</span>
          <span className="text-gray-900 font-semibold">{rentalStartDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Rental End Date</span>
          <span className="text-gray-900 font-semibold">{rentalEndDate}</span>
        </div>
               <div className="flex justify-between">
              <span className="text-gray-700">Rental Duration</span>
              <span className="text-gray-900 font-semibold">{Math.ceil(BookingDetails.totalDays)}{" day"}</span>
            </div>
            <div className="flex justify-between">
            <span className="text-gray-700">Rental Hours</span>
            <span className="text-gray-900 font-semibold">{BookingDetails.totalHours}</span>
            </div>
      </div>

      {/* Total Amount */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between">
          <span className="text-lg font-bold text-gray-800">Total Amount</span>
          <span className="text-lg font-bold text-gray-800">{Price}</span>
        </div>
      </div>

      {/* Extend Booking Button */}
      <div className="mt-6">
        <button
          onClick={()=>setShowBookingModal(true)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Extend Booking
        </button>
      </div>
      {/* Extend Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg relative h-auto w-96">
            {/* Close Button */}
            <button
onClick={()=>setShowBookingModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"> &#10005;</button>
            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label htmlFor="endDate" className="text-sm font-semibold">
                  Rental End Date
                </label>
                <input value={EndDate} onChange={(e)=>setEndDate(e.target.value)} type="date"className="border p-2 rounded-md"/>
              </div>
              <div className="flex flex-col">
                <label htmlFor="endTime" className="text-sm font-semibold">Rental End Time</label>
                <input value={EndTime} onChange={(e)=>setEndTime(e.target.value)} type="time"className="border p-2 rounded-md"/>
              </div>
              <button type="submit"className="bg-blue-600 text-white p-2 rounded-md w-full hover:bg-blue-700">
              Confirm Booking</button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default CarDetailsScreen;
