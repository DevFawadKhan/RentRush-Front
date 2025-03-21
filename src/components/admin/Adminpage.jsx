import { faCar, faSignOutAlt, faUsers, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Customers from './Customers';
import Showroom from './Showroom';
import axios from 'axios';
const Base_Url = import.meta.env.VITE_API_URL;

const Adminpage = () => {
    const [Customer, setCustomer] = useState(false);
    const [showroom, setShowroom] = useState(false);
    const [Customerdata, setCustomerdata] = useState([]);
    const [Showroomdata, setShowroomdata] = useState([]);

    const handleCustomer = () => {
        setShowroom(false);
        setCustomer(true);
    };

    const handleShowroom = () => {
        setCustomer(false);
        setShowroom(true);
    };

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`${Base_Url}/api/admin/adminview`);
                setCustomerdata(response.data.clientSection);
                setShowroomdata(response.data.showroomSection);
            } catch (error) {
                console.log(error);
            }
        };
        fetchdata();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-[#02073F] p-6 text-white">
                <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
                <nav className="space-y-4">
                    <Link to="/" className="flex items-center space-x-3 text-lg hover:bg-[#394A9A] p-3 rounded-lg transition-colors duration-200">
                        <FontAwesomeIcon icon={faHome} />
                        <span>Home</span>
                    </Link>
                    <button onClick={handleCustomer} className="flex items-center space-x-3 text-lg hover:bg-[#394A9A] p-3 rounded-lg w-full transition-colors duration-200">
                        <FontAwesomeIcon icon={faUsers} />
                        <span>Customers</span>
                    </button>
                    <button onClick={handleShowroom} className="flex items-center space-x-3 text-lg hover:bg-[#394A9A] p-3 rounded-lg w-full transition-colors duration-200">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Showrooms</span>
                    </button>
                    <button className="flex items-center space-x-3 text-lg hover:bg-[#394A9A] p-3 rounded-lg w-full transition-colors duration-200">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span>Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {Customer && <Customers data={Customerdata} />}
                {showroom && <Showroom value={Showroomdata} />}
            </main>
        </div>
    );
};

export default Adminpage;
