import React, { useState } from "react";
const Invoice = () => {
  const [fileUrl, setFileUrl] = useState('');
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`${Base_Url}/api/getinvoice`, {
          responseType: 'blob', 
          withCredentials: true,
        });
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        setFileUrl(url);
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    };

    fetchInvoice();
  }, []);
  const openPDF = (url) => {
    window.open(url, '_blank');
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Invoices</h1>

      {fileUrl && (
        <button onClick={() => openPDF(fileUrl)}>View Invoice</button>
      )}
      {fileUrl && (
        <a href={fileUrl} download={`invoice.pdf`}>
          <button>Download Invoice</button>
        </a>
      )}
    </div>
  );
};

export default Invoice;