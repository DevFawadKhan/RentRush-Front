import { useState, useEffect } from "react";
import ShowroomCard from "./ShowroomCard";
import Navbar from "./Navbar";
import { Search } from "lucide-react";
import axios from 'axios';
import PropTypes from 'prop-types';

const Base_Url = import.meta.env.VITE_API_URL;

const Showrooms = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Base_Url}/api/admin/adminview`);
      setData(response.data.showroomSection);
      console.log("showroom",response.data.showroomSection)
      console.log("data",data)
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((showroom) =>
    showroom.showroomName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="mt-4 flex justify-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search showrooms"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 sm:w-96"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Search className="text-gray-500" />
          </div>
        </div>
      </div>

      <div className="bg-white flex justify-center">
        {loading ? (
          <div className="text-center py-10">
            <span className="text-lg text-gray-700">Loading...</span>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <span className="text-lg text-red-600">Error: {error}</span>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-10">
            <span className="text-lg text-gray-700">No showrooms found.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl px-4 py-10 w-full justify-items-center">
            {filteredData.map((showroom, index) => (
              <ShowroomCard key={index} value={showroom} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

Showrooms.propTypes = {
  showroomSection: PropTypes.array,
};

export default Showrooms;
