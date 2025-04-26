import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiDownload, FiEye, FiFilter, FiSearch } from "react-icons/fi";
import Navbar from "../customer/Navbar";
import Footer from "./Footer";
const Base_Url = import.meta.env.VITE_API_URL;
// const Invoice = () => {

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

const InvoiceDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${Base_Url}/api/getinvoice`, {
          withCredentials: true,
        });
        console.log("Fetched Invoice", response?.data);
        setInvoices(response?.data?.data);
        console.log("state", invoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        setError(error.response?.data?.message || "Failed to fetch invoices");
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);
  useEffect(() => {
    console.log("state", invoices);
  }, [invoices]);

  // view function
  const openPDF = (url) => {
    window.open(url, "_blank");
  };
  // download function
  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    window.open(url, "_blank");
    link.setAttribute("download", "invoice.pdf"); // File ka naam set karo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // filterdata
  const Filterdata = invoices.filter((item) =>
    item?.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Invoices</h1>

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
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Invoice
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Client
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Car Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Balance
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Filterdata.map((invoice) => (
                  <tr key={invoice.bookingId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-green-600`}
                      >
                        pending
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {invoice.bookingId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sessionStorage.getItem("name")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">honda</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      5000
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <FiEye
                            onClick={() => openPDF(invoice.invoiceUrl)}
                            className="h-5 w-5"
                          />
                        </button>
                        <button
                          onClick={() => handleDownload(invoice.invoiceUrl)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <FiDownload className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Empty State */}
          {invoices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No invoices found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InvoiceDashboard;
