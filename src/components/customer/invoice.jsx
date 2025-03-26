// import React, { useState,useEffect } from "react";
// import axios from "axios";
// const Base_Url = import.meta.env.VITE_API_URL;
// import {Link} from 'react-router-dom'
// const Invoice = () => {
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   useEffect(() => {
//     const fetchInvoices = async () => {
//       setLoading(true);
//       console.log("Base_Url being used:", Base_Url); // Debug
//       try {
//         const response = await axios.get(${Base_Url}/api/getinvoice, {
//           withCredentials: true,
//         });
//         console.log("Fetched Invoices:", response.data.data);
//         setInvoices(response.data.data);
//       } catch (error) {
//         console.error("Error fetching invoices:", error);
//         setError(error.response?.data?.message || "Failed to fetch invoices");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchInvoices();
//   }, []);
//   const openPDF = (url) => {
//     window.open(url, '_blank');
//   };
//  return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">My Invoices</h1>
//       <Link  to="/customer/Dashboard"><button className="bg-blue-600 text-white font-serif px-2 py-2 m-3">Home page</button></Link>
//       {loading && <p>Loading invoices...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {invoices.length === 0 && !loading && !error && <p>No invoices found.</p>}
//       <div className="space-y-4">
//         {invoices.map((invoice) => (
//           <div
//             key={invoice.bookingId}
//             className="border p-4 rounded-lg bg-white shadow-md flex justify-between items-center"
//           >
//             <div>
//               <p>
//                 <strong>Booking ID:</strong> {invoice.bookingId}
//               </p>
//               <p>
//                 <strong>Invoice:</strong> {invoice.invoiceUrl.split("/").pop()}
//               </p>
//             </div>
//             <div className="space-x-2">
//               <button
//                 onClick={() => openPDF(invoice.invoiceUrl)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 View
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Invoice;


import React, { useState } from 'react';
import { FiDownload, FiEye, FiFilter, FiPrinter, FiSearch } from 'react-icons/fi';
import Footer from "./Footer";
import Navbar from "../customer/Navbar";

const InvoiceDashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample invoice data
  const invoices = [
    { id: 'INV-001', date: '2023-09-01', client: 'Stream Services Agency', subject: 'Media planning C2', amount: 4500, status: 'pending', type: 'single' },
    { id: 'INV-002', date: '2023-06-12', client: 'Stream Services Agency', subject: 'PR services', amount: 12800, status: 'paid', type: 'single' },
    { id: 'INV-003', date: '2023-08-05', client: 'Printing Company Co.', subject: 'Book handling', amount: 3690, status: 'overdue', type: 'recurring' },
    { id: 'INV-004', date: '2023-09-04', client: 'Brand & Roll Ltd.', subject: 'Clearing Services Halloween', amount: 6650, status: 'pending', type: 'single' },
    { id: 'INV-005', date: '2023-06-20', client: 'Housing Co.', subject: 'Store met', amount: 13545, status: 'paid', type: 'single' },
    { id: 'INV-006', date: '2023-01-05', client: 'Glass Ltd.', subject: 'Office items', amount: 2200, status: 'paid', type: 'recurring' },
    { id: 'INV-007', date: '2023-01-12', client: 'Bread & Roll Ltd.', subject: 'Clearing Services X-mas party', amount: 9110, status: 'overdue', type: 'single' },
  ];

  // Filter invoices based on active tab and search term
  const filteredInvoices = invoices.filter(invoice => {
    const matchesTab = activeTab === 'all' || invoice.type === activeTab;
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'Pkr',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get status badge style
  const getStatusStyle = (status) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get days difference
  const getDaysDifference = (dateString) => {
    const today = new Date();
    const invoiceDate = new Date(dateString);
    const diffTime = today - invoiceDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays > 1) return `${diffDays} days ago`;
    return 'Future date';
  };

  return (
    <>
    <Navbar/>
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Invoicer</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('all')}
          >
            All Invoices
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'single' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('single')}
          >
            Single Invoices
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'recurring' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('recurring')}
          >
            Recurring Invoices
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <FiFilter className="mr-2" />
            Filter
          </button>
        </div>

        {/* Invoice Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(invoice.status)}`}>
                      {invoice.status} • {getDaysDifference(invoice.date)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.client}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{invoice.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(invoice.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEye className="h-5 w-5" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FiDownload className="h-5 w-5" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FiPrinter className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No invoices found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default InvoiceDashboard;
