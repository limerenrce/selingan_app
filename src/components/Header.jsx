// import { useState } from "react";
import { motion } from "framer-motion";
import { Row, Col, Dropdown } from "antd";
import { useNavigate, NavLink } from "react-router-dom";

import Logo from "../assets/images/main-logo.png";
import ProfileIcon from "../assets/images/default-ava.png";

// Navigation Links
const NavLinks = [
  {
    id: 1,
    title: "Ragam",
    path: "/ragam",
  },
  {
    id: 2,
    title: "Host",
    path: "/host",
  },
  {
    id: 3,
    title: "Explore",
    path: "/explore",
  },
];

// Profile Dropdown Items
const profileIconItems = [
  {
    key: "viewProfile",
    label: "View Profile",
    onClick: (navigate) => navigate("/profile"),
  },
  { type: "divider" },
  {
    key: "settings",
    label: "Settings",
    onClick: (navigate) => navigate("/settings"),
  },
  {
    key: "signOut",
    label: "Sign Out",
    onClick: (navigate) => navigate("/signin"),
  },
];

const InHeader = () => {
  // const [selectedLink, setSelectedLink] = useState(""); // Fixing state for active link
  const navigate = useNavigate();

  // Handle active link styling
  // const handleActiveLink = (path) => {
  //   setSelectedLink(path);
  // };

  // Create menu structure for the dropdown
  const menuItems = profileIconItems.map((item) =>
    item.type === "divider"
      ? { type: "divider" }
      : {
          key: item.key,
          label: <a onClick={() => item.onClick(navigate)}>{item.label}</a>,
        }
  );

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0, z: 50 }}
      transition={{ duration: 0.5 }}
      className="w-full fixed top-0 left-0 backdrop-blur-xl z-50 flex items-center justify-between"
    >
      <Row
        gutter={2}
         className="w-full py-3 text-2xl"
        style={{ boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)" }} // Optional: Adds shadow for better visibility
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
            }}
          >
            <div style={{ maxWidth: "800px", width: "100%", padding: "0px" }}>
              <div className="hidden md:flex space-x-12 pt-1">
                {NavLinks.map((link) => {
                  return (
                    <NavLink
                      key={link.id}
                      to={link.path}
                      className={({ isActive }) =>
                        `inline-block text-sm ${
                          isActive
                            ? "text-[#a3a3f5] font-semibold hover:text-[#a3a3f5]"
                            : "text-gray-600 font-semibold hover:text-[#a3a3f5]"
                        }`
                      }
                      // onClick={() => handleActiveLink(link.path)}
                    >
                      {link.title}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </Col>

          {/* ACTIONS */}
          <Col span={6} className="flex items-center gap-4 justify-end mr-5">
            <a
              type="text"
              className="text-[#b2b2b2] font-bold hover:font-bold hover:text-primary"
              onClick={() => navigate("/create-ragam")}
            >
              Create Ragam
            </a>
            {/* Dropdown for Profile Menu */}
            <Dropdown
              menu={{ items: menuItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <a
                onClick={(e) => e.preventDefault()}
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={ProfileIcon}
                  alt="Profile Icon"
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              </a>
            </Dropdown>
          </Col>
        </div>
      </Row>
    </motion.div>
  );
};

export default InHeader;
