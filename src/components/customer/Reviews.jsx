import React from 'react'
import { Star, StarHalf, User, ThumbsUp } from 'lucide-react'
import Navbar from "./Navbar";
import Footer from "../Footer";

function Reviews() {
  const data = [
    {
      label: "Professionalism of our service personnel",
      percentage: 92,
      average: "Great",
      barGradient: "bg-gradient-to-r from-blue-400 to-blue-600",
      textColor: "text-blue-600",
    },
    {
      label: "Efficiency of service call handling",
      percentage: 74,
      average: "Good",
      barGradient: "bg-gradient-to-r from-green-400 to-green-600",
      textColor: "text-green-600",
    },
    {
      label: "Response time to service calls",
      percentage: 55,
      average: "So-so",
      barGradient: "bg-gradient-to-r from-purple-400 to-purple-600",
      textColor: "text-purple-600",
    },
    {
      label: "Timeliness of contract administration",
      percentage: 34,
      average: "Bad",
      barGradient: "bg-gradient-to-r from-orange-300 to-orange-500",
      textColor: "text-orange-600",
    },
    {
      label: "Accuracy of contract administration",
      percentage: 18,
      average: "Worst",
      barGradient: "bg-gradient-to-r from-red-400 to-red-600",
      textColor: "text-red-600",
    },
  ];

  return (
    <>
     <Navbar />
      <div className='p-3'>
        <div className='border-t border-neutral-400 border-b'>
          <h1 className='p-4 font-bold text-3xl lg:text-5xl'>Review & Comments </h1>
        </div>
        <div className='flex flex-col lg:flex-row flex-wrap justify-between w-full'>
          <div className='mt-20 flex flex-col justify-center items-center w-full lg:w-1/2'>
            <h1 className='font-bold text-2xl lg:text-5xl'>3.75</h1>

            <div className='flex mt-10 mb-3 gap-2'>
              <Star className='text-yellow-300' size={50} />
              <Star className='text-yellow-300' size={50} />
              <Star className='text-yellow-300' size={50} />
              <StarHalf className='text-yellow-300' size={50} />
            </div>
            <p className='text-neutral-700'>(1.27 Reviews)</p>

            <h1 className='font-bold text-2xl mb-3'>Most liked and Comments</h1>

            <div className=" lg:w-1/2 border border-neutral-600 p-4 rounded-xl min-h-[250px] flex flex-col gap-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User size={40} />
                  <p className="text-xl font-semibold">User Name</p>
                </div>
                <div className="flex gap-1">
                  <Star className="text-yellow-300" size={20} />
                  <Star className="text-yellow-300" size={20} />
                  <Star className="text-yellow-300" size={20} />
                </div>
              </div>
              <div className="text-center text-sm text-gray-400">Date: 12/12/2025</div>
              <p className="text-base text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet corporis magni, accusamus sint veniam reiciendis.
              </p>
              <div className="flex justify-end items-center gap-2 mt-auto">
                <p>25</p>
                <button>
                  <ThumbsUp size={20} className="hover:text-blue-400" />
                </button>
              </div>
            </div>

            <div className=" lg:w-1/2  border border-neutral-600 p-4 rounded-xl min-h-[250px] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User size={40} />
                  <p className="text-xl font-semibold">User Name</p>
                </div>
                <div className="flex gap-1">
                  <Star className="text-yellow-300" size={20} />
                  <Star className="text-yellow-300" size={20} />
                  <Star className="text-yellow-300" size={20} />
                </div>
              </div>
              <div className="text-center text-sm text-gray-400">Date: 12/12/2025</div>
              <p className="text-base text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet corporis magni, accusamus sint veniam reiciendis.
              </p>
              <div className="flex justify-end items-center gap-2 mt-auto">
                <p>25</p>
                <button>
                  <ThumbsUp size={20} className="hover:text-blue-400" />
                </button>
              </div>
            </div>
          </div>

          <div className='flex border mt-10 border-neutral-500 items-center w-full lg:w-1/2'>
            <div className="w-full p-6 bg-white shadow-lg rounded-lg">
              <h1 className="text-lg font-bold mb-6">Element of Evaluation</h1>

              {data.map((item, index) => (
                <div key={index} className="mb-6">
                  <h2 className="font-semibold text-gray-700 mb-1">{item.label}</h2>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-bold ${item.textColor}`}>{item.percentage}%</span>
                    <span className="text-sm text-gray-400">
                      Average: <span className="font-semibold">{item.average}</span>
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.barGradient}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Reviews
