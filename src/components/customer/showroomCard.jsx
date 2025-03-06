// import React from "react";
import Propstypes from 'prop-types'
// import Showroom from '../admin/Showroom';
const ShowroomCard = ({ value }) => {

  console.log(value);
  console.log(`/uploads/${value.images}`)
  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-64 relative">
      <div className="relative">
        <img
          src={`/uploads/${value.images}`}
          alt='showroom pic'
          className="w-full h-40 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-center text-lg">Showroom:{value.showroomName}</h3>
        <div className="pb-4 text-center">
          <span className="text-md font-bold">Address:{value.address}</span>
        </div>
      </div>
    </div>
  );
};
ShowroomCard.Propstypes={
  showroom:Propstypes.array.isRequired
}
export default ShowroomCard;
