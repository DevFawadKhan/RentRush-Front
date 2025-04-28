import { useState, useEffect } from "react";
import ShowroomCard from "./ShowroomCard";
import Navbar from "./Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import PropTypes from "prop-types";

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
      console.log("Showrooms fetched:", response.data.showroomSection);
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

      {/* Background Section */}
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-10">
        
        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-[90%] max-w-md">
            <input
              type="text"
              placeholder="Search showrooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-5 pr-12 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <Search className="text-gray-400" size={20} />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex justify-center">
          {loading ? (
            <div className="text-center py-10">
              <span className="text-lg text-gray-600">Loading...</span>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <span className="text-lg text-red-600">Error: {error}</span>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-10">
              <span className="text-lg text-gray-600">No showrooms found.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl px-6">
              {filteredData.map((showroom, index) => (
                <ShowroomCard key={index} value={showroom} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Showrooms.propTypes = {
  showroomSection: PropTypes.array,
};

export default Showrooms;
