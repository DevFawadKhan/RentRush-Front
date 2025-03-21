import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Customers = ({ data }) => {
    return (
        <section className="mb-8 ml-10 mr-10 w-full">
            <h2 className="text-3xl font-bold text-[#394A9A] mb-6">Customer Accounts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((value) => (
                    <div key={value.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center space-x-4">
                            <FontAwesomeIcon icon={faUser} className="text-[#394A9A] text-3xl" />
                            <div>
                                <p className="text-xl font-bold text-gray-800">{value.ownerName}</p>
                                <p className="text-gray-600">Email: {value.email}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Customers;
