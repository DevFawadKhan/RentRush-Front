import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Customers = ({data}) => {
    return (
  <>  
  <h2 className="  grid-cols-12  break-before-column font-semibold text-[#363843] ">Customer Accounts</h2>
  {
    data.map((value)=>{
      return(
        <>
   <section className="mb-8 ml-2">
        <div key={value.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
        <FontAwesomeIcon icon={faUser} className="text-[#394A9A] mb-2" size="2x" />            <p className="text-xl font-semibold">name{value.ownerName}</p>
      <p className="text-gray-600">Email:{value.email}</p>
        </div>
        </div>
    </section>
        </>
      )
    })
  }
   </>
    )
};
export default Customers;
