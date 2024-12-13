// import React from 'react'
import { motion } from "framer-motion";
import { slideUp } from "../../utils/animation";
import HeroImg from "../../assets/images/hero.png";

const Hero = () => {
  return (
    <>
      <div className="container" style={{ marginTop: "40px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
          {/* Text Content */}
          <div className="space-y-5 flex flex-col justify-center items-center text-center md:text-left py-20 px-10 md:pr-24 md:py-0 md:px-0">
            <motion.h1
              variants={slideUp(0.2)}
              initial="initial"
              animate="animate"
              className="text-4xl xl:text-5xl font-bold tracking-tight pt-[60px]"
            >
              Turn Free Time to Fun Time with {" "}
              <span className="text-primary">Selingan</span>
            </motion.h1>
            <motion.p
              variants={slideUp(0.4)}
              initial="initial"
              animate="animate"
              className="xl:text-[20px] py-2 pr-37"
            >
              Tired of the same old routine? Break free from the monotony! Selingan lets you explore exciting activities or host your own events to brighten up your days!
            </motion.p>
            <div className="grid grid-cols-3 justify-normal">
              <div className="col-1">
                <a href="event-detail">
                  <motion.button
                    variants={slideUp(0.4)}
                    initial="initial"
                    animate="animate"
                    whileHover={{
                      scale: 1.05, // Scales the button to 105%
                      transition: { duration: 0.3, ease: "easeInOut" }, // Smooth scaling
                    }}
                    type="submit"
                    className="primary-btn hover:bg-primary duration-300">Explore Now &#8594;
                  </motion.button>
                </a>
              </div>
              {/* <div className="col-2 justify-self-end">
            <motion.img 
            variants={slideUp(0.6)} 
            initial="initial" 
            animate="animate"
            className="w-[118px]" src="avas.png" alt="" /> 
           </div> */}
              <div className="flex -space-x-4 pl-10 pt-0.5">
                <motion.img
                  variants={slideUp(0.6)}
                  initial="initial"
                  animate="animate"
                  className="border-2 border-white rounded-full h-10 w-10"
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt=""
                />
                <motion.img
                  variants={slideUp(0.7)}
                  initial="initial"
                  animate="animate"
                  className="border-2 border-white rounded-full h-10 w-10"
                  src="https://randomuser.me/api/portraits/women/31.jpg"
                  alt=""
                />
                <motion.img
                  variants={slideUp(0.8)}
                  initial="initial"
                  animate="animate"
                  className="border-2 border-white rounded-full h-10 w-10"
                  src="https://randomuser.me/api/portraits/men/33.jpg"
                  alt=""
                />
                {/* <span className="flex items-center justify-center bg-white text-sm text-gray-800 font-semibold border-2 border-gray-200 rounded-full h-10 w-10">+42k</span> */}
              </div>
              <div className="col-3">
                <motion.p
                  variants={slideUp(0.6)}
                  initial="initial"
                  animate="animate"
                  className="text-xl font-bold"
                >
                  42k+ people
                </motion.p>
                <motion.p
                  variants={slideUp(0.6)}
                  initial="initial"
                  animate="animate"
                >
                  Need a break
                </motion.p>
              </div>
            </div>

            {/* Partner Logos */}
            <motion.div
              variants={slideUp(0.8)}
              initial="initial"
              animate="animate"
              className="grid grid-cols-3 justify-between py-20"
            >
              <div className="col-1">
                <img src="time.png" alt="" />
              </div>
              <div className="col-2">
                <img src="forbes.png" alt="" />
              </div>
              <div className="col-3">
                <img src="techCrunch.png" alt="" />
              </div>
            </motion.div>
          </div>
          {/* Hero Image */}
          <div className="flex justify-center items-center">
            <motion.img
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-[80%] md:w[550px] xl:w-[600px]"
              src={HeroImg}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
