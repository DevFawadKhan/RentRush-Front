import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faIdCard,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

const Customers = ({ data }) => {
  return (
    <section className="mb-12 ml-6 mr-6 w-full">
      <h2 className="text-4xl font-bold text-[#394A9A] mb-10 text-center">
        Customer Accounts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((value) => (
          <div
            key={value._id}
            className="bg-white p-6 rounded-2xl border border-transparent shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-[#394A9A]"
          >
            {/* Image or Icon */}
            <div className="flex justify-center mb-4">
              {value.images && value.images.length > 0 ? (
                <img
                  src={`/uploads/${value.images[0]}`}
                  alt="Customer"
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#394A9A]"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[#394A9A] text-white text-3xl">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold text-gray-800">
                {value.ownerName}
              </p>
              <p className="text-sm text-gray-500 italic capitalize">
                Role: {value.role}
              </p>

              {value.showroomName && (
                <p className="text-gray-700 text-sm">
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="mr-2 text-[#394A9A]"
                  />
                  {value.showroomName}
                </p>
              )}

              <p className="text-gray-700 text-sm">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mr-2 text-[#394A9A]"
                />
                {value.email}
              </p>
              <p className="text-gray-700 text-sm">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="mr-2 text-[#394A9A]"
                />
                {value.contactNumber}
              </p>
              <p className="text-gray-700 text-sm">
                <FontAwesomeIcon
                  icon={faIdCard}
                  className="mr-2 text-[#394A9A]"
                />
                {value.cnic}
              </p>
              <p className="text-gray-700 text-sm">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="mr-2 text-[#394A9A]"
                />
                {value.address}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Customers;
