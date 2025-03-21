import { faBan, faCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import ConfirmationDialog from './ConfirmationDialog';
const Base_Url = import.meta.env.VITE_API_URL;
import axios from 'axios';

const Showroom = ({ value }) => {
    const [showBan, setShowBan] = useState([]);
    const [isRatingsOpen, setIsRatingsOpen] = useState(false);
    const [statuses, setStatuses] = useState({}); // Track status for each showroom individually
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [selectedShowroomId, setSelectedShowroomId] = useState(null); // Track which showroom is being modified
    const [nextStatus, setNextStatus] = useState('');

    // Fetch banned users on component mount
    useEffect(() => {
        const fetchBannedUsers = async () => {
            const response2 = await axios.get(`${Base_Url}/api/admin/viewBanUser`);
            setShowBan(response2.data);
            console.log(response2.data);
        };
        fetchBannedUsers();
    }, []);

    // Initialize statuses for each showroom
    useEffect(() => {
        const initialStatuses = {};
        value.forEach((showroom) => {
            initialStatuses[showroom._id] = showroom.status || 'active'; // Use showroom.status from API or default to 'active'
        });
        setStatuses(initialStatuses);
    }, [value]);

    // Function to ban or activate a showroom
    const banShowroom = async (id) => {
        try {
            const url = `${Base_Url}/api/admin/banshowroom/${id}`;
            const response = await axios.post(url);
            console.log(response.data.msg);
            alert(response.data.msg);

            // Update the status for the specific showroom
            setStatuses((prevStatuses) => ({
                ...prevStatuses,
                [id]: nextStatus,
            }));
        } catch (error) {
            console.log(error.response.data.msg);
            alert(error.response.data.msg);
        }
    };

    // Open confirmation dialog and set the next status
    const openConfirmDialog = (id, newStatus) => {
        setSelectedShowroomId(id);
        setNextStatus(newStatus);
        setIsConfirmDialogOpen(true);
    };

    // Handle status change after confirmation
    const handleStatusChange = () => {
        if (selectedShowroomId) {
            banShowroom(selectedShowroomId);
        }
        setIsConfirmDialogOpen(false);
    };

    // Sample ratings data
    const ratings = [
        { user: 'John Doe', rating: 4, feedback: 'Great service and friendly staff!' },
        { user: 'Jane Smith', rating: 5, feedback: 'Amazing experience, highly recommend!' },
        { user: 'Bob Johnson', rating: 3, feedback: 'Good, but the waiting time was long.' },
        { user: 'Alice Brown', rating: 5, feedback: 'Excellent cars and showroom experience!' },
        { user: 'Mike Lee', rating: 4, feedback: 'Friendly and quick service.' },
        { user: 'Anna Wilson', rating: 5, feedback: 'Highly satisfied, will visit again!' },
        { user: 'Tom Green', rating: 4, feedback: 'Affordable prices and good customer service.' },
    ];

    return (
        <section className="mb-8 ml-10 mr-10 w-full">
            <h2 className="text-3xl font-bold text-[#394A9A] mb-6">Showroom Accounts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {value.map((data) => (
                    <div key={data._id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="space-y-4">
                            <p className="text-xl font-bold text-gray-800">Showroom: {data.showroomName}</p>
                            <p className="text-gray-600">Owner: {data.ownerName}</p>
                            <p className="text-gray-600">CNIC: {data.cnic}</p>
                            <p className="text-gray-600">Address: {data.address}</p>
                            <button
                                className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
                                onClick={() => setIsRatingsOpen(true)}
                            >
                                <FontAwesomeIcon icon={faStar} className="mr-2" />
                                View Ratings
                            </button>
                            <p className="text-lg font-semibold">
                                Status:{' '}
                                <span className={statuses[data._id] === 'active' ? 'text-green-600' : 'text-red-600'}>
                                    {statuses[data._id] === 'active' ? 'Active' : 'Banned'}
                                </span>
                            </p>
                            <button
                                className={`w-full py-2 rounded-lg text-white font-semibold transition-colors duration-200 ${
                                    statuses[data._id] === 'active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                                }`}
                                onClick={() => openConfirmDialog(data._id, statuses[data._id] === 'active' ? 'banned' : 'active')}
                            >
                                <FontAwesomeIcon icon={statuses[data._id] === 'active' ? faBan : faCheck} className="mr-2" />
                                {statuses[data._id] === 'active' ? 'Ban Showroom' : 'Activate Showroom'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Ratings Modal */}
            {isRatingsOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">Showroom Ratings & Feedback</h3>
                        <div className="max-h-96 overflow-y-auto pr-4">
                            <ul className="space-y-4">
                                {ratings.map((rating, index) => (
                                    <li key={index} className="border-b pb-4">
                                        <p className="font-semibold text-gray-800">{rating.user}</p>
                                        <p className="text-yellow-500">
                                            Rating: {'★'.repeat(rating.rating)}{'☆'.repeat(5 - rating.rating)}
                                        </p>
                                        <p className="text-gray-600 italic">"{rating.feedback}"</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            className="mt-6 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200"
                            onClick={() => setIsRatingsOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Confirmation Dialog */}
            {isConfirmDialogOpen && (
                <ConfirmationDialog
                    message={
                        nextStatus === 'banned'
                            ? 'Are you sure you want to ban this showroom?'
                            : 'Are you sure you want to activate this showroom?'
                    }
                    onConfirm={handleStatusChange}
                    onCancel={() => setIsConfirmDialogOpen(false)}
                />
            )}
        </section>
    );
};

export default Showroom;
