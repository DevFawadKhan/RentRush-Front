import React, { useState,useEffect } from "react";
import axios from "axios";
const Base_Url = import.meta.env.VITE_API_URL;
import {Link} from 'react-router-dom'
const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      console.log("Base_Url being used:", Base_Url); // Debug
      try {
        const response = await axios.get(`${Base_Url}/api/getinvoice`, {
          withCredentials: true,
        });
        console.log("Fetched Invoices:", response.data.data);
        setInvoices(response.data.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        setError(error.response?.data?.message || "Failed to fetch invoices");
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);
  const openPDF = (url) => {
    window.open(url, '_blank');
  };
 return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Invoices</h1>
      <Link  to="/customer/Dashboard"><button className="bg-blue-600 text-white font-serif px-2 py-2 m-3">Home page</button></Link>
      {loading && <p>Loading invoices...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {invoices.length === 0 && !loading && !error && <p>No invoices found.</p>}
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.bookingId}
            className="border p-4 rounded-lg bg-white shadow-md flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Booking ID:</strong> {invoice.bookingId}
              </p>
              <p>
                <strong>Invoice:</strong> {invoice.invoiceUrl.split("/").pop()}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => openPDF(invoice.invoiceUrl)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invoice;