import { Button, Col, Row } from 'antd' 

const ExploreHero = () => {
  return (
   <>
   <div className="w-full h-[90vh]  bg-gradient-to-r from-[#E7DBFF] to-[#EEDDED]">
          <svg
            className="absolute bottom-0 left-0 w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1400 310"
          >
            <path
              fill="#FFFFFF"
              fillOpacity="1"
              d="M0,224L80,208C160,192,320,160,480,160C640,160,800,192,960,202.7C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
          <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 mr-6 ml-6 mt-[50px]">
            {/* Left Section */}
            <div className="md:w-1/2 space-y-4">
              <h1 className="text-4xl font-bold leading-snug">
                Turn Your Leisure <br /> Into Something <br />{" "}
                <span className="text-[#7658B2]">Extraordinary</span>
              </h1>
              <p className="text-gray-600">
                Dengan beragam pilihan acara yang menarik, waktu luangmu <br />
                bisa menjadi peluang untuk bersantai, mengeksplorasi hal baru,{" "}
                <br />
                atau menikmati kegiatan yang membuatmu lebih bahagia.
              </p>
              <Button className="bg-gradient-to-r from-[#A594F9] to-[#E4B1F0] text-white font-semibold py-2 rounded-md hover:bg-[#CB9DF0] hover:text-purple-600 transition duration-300">
                <a href="#events">Choose Ragam</a>
              </Button>
            </div>
            {/* Right Section */}
            <Row gutter={[16, 16]} className="md:w-1/2 mt-8 md:mt-0">
              <Col span={12}>
                <div className="w-full h-40 bg-gray-300 rounded-lg">
                  <img
                    src="/pottery-class.jfif"
                    alt="Event Image 1"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="w-full h-40 bg-gray-300 rounded-lg">
                  <img
                    src="/macaron-class.jfif"
                    alt="Event Image 2"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="w-full h-40 bg-gray-300 rounded-lg">
                  <img
                    src="/flower-class.jpg"
                    alt="Event Image 2"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="w-full h-40 bg-gray-300 rounded-lg">
                  <img
                    src="/painting-class.jpg"
                    alt="Event Image 2"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
   </>
  )
}

export default ExploreHero