import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Base_Url = import.meta.env.VITE_API_URL;
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
    <div>
      <h2>Invoice</h2>

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