import { faBan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import ConfirmationDialog from './ConfirmationDialog';
const Base_Url = import.meta.env.VITE_API_URL;
import axios from 'axios';

const Showroom = ({ value }) => {
    const [status, setStatus] = useState('active');
    const [showBan, setShowBan] = useState([]);
    const [isRatingsOpen, setIsRatingsOpen] = useState(false);

    const banShowroom = async (id) => {
        try {
            const url = `${Base_Url}/api/admin/banshowroom/${id}`;
            const response = await axios.post(url); // this API bans the showroom
            console.log(response.data.msg);
            alert(response.data.msg);
        } catch (error) {
            console.log(error.response.data.msg);
            alert(error.response.data.msg);
        }
    };

    useEffect(() => {
        const fetchBannedUsers = async () => {
            const response2 = await axios.get(`${Base_Url}/api/admin/viewBanUser`); // this API fetches status banned or active
            setShowBan(response2.data);
            console.log(response2.data);
        };
        fetchBannedUsers();
    }, []);

    useEffect(() => {
        console.log(showBan);
    }, [showBan]);

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [nextStatus, setNextStatus] = useState('');

    const openConfirmDialog = (newStatus) => {
        setNextStatus(newStatus);
        setIsConfirmDialogOpen(true);
    };
    const handleStatusChange = () => {
        setStatus(nextStatus);
        setIsConfirmDialogOpen(false);
    };

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
            <h2 className="text-2xl font-semibold text-[#394A9A] mb-4">Showroom Accounts</h2>
            {value.map((data) => (
                <div key={data._id} className="grid grid-cols-1 gap-4 w-full">
                    <div className="bg-white p-6 my-2 rounded-lg shadow-xl hover:shadow-xl hover:cursor-pointer transition sm:flex justify-between items-center w-full">
                        <div>
                            <p className="text-xl font-bold">Showroom name: {data.showroomName}</p>
                            <p className="text-gray-600">Owner Name: {data.ownerName}</p>
                            <p className="text-gray-600">Owner CNIC: {data.cnic}</p>
                            <p className="text-gray-600">Showroom Address: {data.address}</p>
                            <button
                                className="text-blue-500 underline hover:text-blue-700"
                                onClick={() => setIsRatingsOpen(true)}
                            >
                                Ratings
                            </button>
                            <p className="text-lg font-semibold">
                                Status: {status === 'active' ? 'Active' : 'Banned'}
                            </p>
                        </div>
                        <button
                            className={`ml-2 text-white px-4 sm:py-2 rounded-lg transition duration-200 ${
                                status === 'active'
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-green-500 hover:bg-green-600'
                            }`}
                            onClick={() => banShowroom(data._id)}
                        >
                            <FontAwesomeIcon icon={status === 'active' ? faBan : faCheck} />{' '}
                            {status === 'active' ? 'Ban' : 'Activate'}
                        </button>
                    </div>
                </div>
            ))}

            {/* Ratings Section */}
            {isRatingsOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-full">
                        <h3 className="text-xl font-bold mb-4">Showroom Ratings & Feedback</h3>
                        <div className="max-h-60 overflow-y-auto">
                            <ul>
                                {ratings.map((rating, index) => (
                                    <li key={index} className="mb-4 border-b pb-2">
                                        <p className="font-semibold">{rating.user}</p>
                                        <p>Rating: {rating.rating} / 5</p>
                                        <p className="italic">{rating.feedback}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            className="mt-4 bg-primary text-white px-4 py-2 rounded-lg transition duration-200"
                            onClick={() => setIsRatingsOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

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
}
export default Showroom;
