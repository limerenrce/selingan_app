import React from "react";
import { motion } from "framer-motion";
import { Row, Col } from "antd";
import { useNavigate, NavLink } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons"; // Import LogoutOutlined icon
import "@fontsource/poppins";
import Logo from "../assets/images/main-logo.png";

const NavLinks = [
  {
    id: 1,
    title: "Report User",
    path: "/report-user",
  },
  {
    id: 2,
    title: "Report Event",
    path: "/report-event",
  },
];

const AdminHeader = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full fixed top-0 left-0 backdrop-blur-xl z-50 flex items-center justify-between"
    >
      <Row
        gutter={2}
        className="w-full py-3 text-2xl"
        style={{
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div className="w-full mx-auto flex">
          {/* LOGO */}
          <Col span={4}>
            <a href="/">
              <img src={Logo} alt="Logo Selingan" className="ml-5 w-12 h-8" />
            </a>
          </Col>

          {/* NAV LINKS */}
          <Col
            span={13}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <div style={{ maxWidth: "800px", width: "100%", padding: "0px" }}>
              <div className="hidden md:flex space-x-12 pt-1">
                {NavLinks.map((link) => (
                  <NavLink
                    key={link.id}
                    to={link.path}
                    className={({ isActive }) =>
                      `inline-block text-sm ${
                        isActive
                          ? "text-primary font-semibold hover:text-primary"
                          : "text-gray-600 font-semibold hover:text-primary"
                      }`
                    }
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {link.title}
                  </NavLink>
                ))}
              </div>
            </div>
          </Col>

          {/* ACTIONS */}
          <Col
            span={6}
            className="flex items-center gap-4 justify-end mr-5"
            style={{
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <a
              className="text-gray-600 font-semibold hover:text-primary space-x-2 mr-5"
              onClick={() => navigate("/signup", { replace: true })}
            >
              <LogoutOutlined />
              <span>Sign Up</span>
            </a>
          </Col>
        </div>
      </Row>
    </motion.div>
  );
};

export default AdminHeader;
