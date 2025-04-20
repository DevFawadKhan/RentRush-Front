import { motion } from "framer-motion";
import React from "react";
import Navbar from "./Navbar";
import Footer from "../Footer";
function Services() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Navbar />
      <div className="p-4 ">
        <div className="mt-4 px-4 py-4 space-y-5">
          <h1 className="font-bold text-2xl lg:text-4xl">Services</h1>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            explicabo nostrum neque adipisci ducimus dolore soluta, id expedita
            magni natus quas. Magni accusamus provident a sunt recusandae
            aperiam velit modi. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Placeat, minima dolores dolore delectus quod
            nesciunt qui! Molestiae adipisci earum, saepe nihil ipsam obcaecati
            tempora nemo aspernatur repudiandae, veritatis officia accusamus!
            <div className="mt-20 lg:mt-25 flex flex-wrap justify-between items-center w-full  mx-2">
              <div className=" w-1/2 lg:w-1/3 ">
                <h1 className="font-bold text-3xl lg:text-4xl mb-5">
                  Services 24/7
                </h1>
                <p className="text-lg  space-x-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorum qui iusto deleniti a unde nisi neque expedita ab illum
                  animi sunt odio molestias fuga veniam, impedit ea. Eaque,
                  labore et!
                </p>
              </div>
              <div className=" w-1/2 lg:w-1/3">
                <h1 className="font-bold text-3xl lg:text-4xl mb-5">
                  Booking Online
                </h1>
                <p className="text-lg space-x-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorum qui iusto deleniti a unde nisi neque expedita ab illum
                  animi sunt odio molestias fuga veniam, impedit ea. Eaque,
                  labore et!
                </p>
              </div>
              <div className="w-1/2 lg:w-1/3">
                <h1 className="font-bold text-3xl lg:text-4xl mb-5">
                  Booking Offline{" "}
                </h1>
                <p className="text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorum qui iusto deleniti a unde nisi neque expedita ab illum
                  animi sunt odio molestias fuga veniam, impedit ea. Eaque,
                  labore et! Lorem ipsum dolor, sit amet consectetur adipisicing
                  elit. Maiores ipsam laboriosam neque autem, vero, nostrum quos
                  explicabo assumenda aperiam nihil cupiditate. Maxime, labore!
                  Quod reiciendis dolor vitae minus, magnam quidem?
                </p>
              </div>
            </div>
          </p>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
}

export default Services;
