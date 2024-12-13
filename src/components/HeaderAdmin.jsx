import { motion } from "framer-motion";
import { Row, Col, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/main-logo.png";

const { Text } = Typography;

const AdminHeader = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0, z: 50 }}
        transition={{ duration: 0.5 }}
        className="w-full top-0 left-0 fixed backdrop-blur-xl flex items-center justify-between"
      >
        <Row
          gutter={2}
          className="w-full py-3 text-2xl  "
          style={{
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            fontFamily: "'Poppins', san-serif",
          }} // Optional: Adds shadow for better visibility
        >
          <div className="w-full mx-auto flex ">
            {/* LOGO */}
            <Col span={12}>
              <a href="/">
                <div className="flex space-x-2 items-start px-5">
                  <img src={Logo} alt="Logo Selingan" className="w-12 h-8" />
                  <Text className="text-xl font-bold text-[#6C6CC6]">
                    SELINGAN
                  </Text>
                </div>
              </a>
            </Col>

            {/* ACTIONS */}
            <Col
              span={12}
              className="flex items-center gap-8 justify-end"
              style={{
                fontFamily: "'Poppins', sans-serif", // Ensure font is applied here
              }}
            >
              <a
                type="text"
                className="text-gray-600 font-semibold hover:text-primary"
                onClick={() => navigate("/report")}
              >
                Report User
              </a>
              <a
                type="text"
                className="text-gray-600 font-semibold hover:text-primary"
                onClick={() => navigate("/report")}
              >
                Report Event
              </a>
              <a
                className="text-gray-600 font-semibold hover:text-primary space-x-2 mr-5"
                type="text"
                onClick={() => navigate("/signin", { replace: true })}
              >
                <LogoutOutlined />
                <span>Sign Out</span>
              </a>
            </Col>
          </div>
        </Row>
      </motion.div>
    </>
  );
};

export default AdminHeader;
