// import { useState } from "react";
import { motion } from "framer-motion";
import { Row, Col, Dropdown, notification } from "antd";
import { useNavigate, NavLink } from "react-router-dom";
import "@fontsource/poppins";
import Logo from "../assets/images/main-logo.png";
import ProfileIcon from "../assets/images/default-ava.png";
import { sendDataPrivate } from "../utils/api";

// import { style } from "framer-motion/m";

const InHeader = () => {
  // const [selectedLink, setSelectedLink] = useState(""); // Fixing state for active link
  const navigate = useNavigate();

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
      onClick: () => handleSignOut(),
    },
  ]; 

  const handleSignOut = () => {
 
    sendDataPrivate("/api/v1/auth/signout")
    .then((resp) => {
      const username = resp.username["username"];
       if (username){
        notification.success({
          message: `Bye bye ${username}`,
          description: `Successfully signed out from Selingan`,
        });
        navigate("/signin", { replace: true });
      }
    })
    .catch((err) => {
      notification.error({
        message: "Can't sign out right now",
        description: err.response ? err.response.data : err.toString(),
      });
    });
  };

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
          label: (
            <a
              onClick={() => item.onClick(navigate)}
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {item.label}
            </a>
          ),
        }
  );

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0, z: 100 }}
      transition={{ duration: 0.5 }}
      className="w-full fixed top-0 left-0 backdrop-blur-xl z-50 flex items-center justify-between"
    >
      <Row
        gutter={2}
        className="w-full py-3 text-2xl"
        style={{
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          fontFamily: "'Poppins', sans-serif",
        }} // Optional: Adds shadow for better visibility
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
              alignItems: "end",
              fontFamily: "'Poppins', sans-serif", // Apply Poppins directly to the parent container
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
                            ? "text-primary font-semibold hover:text-primary"
                            : "text-gray-600 font-semibold hover:text-primary"
                        }`
                      }
                      style={{
                        fontFamily: "'Poppins', sans-serif", // Ensure font is applied here
                      }}
                    >
                      {link.title}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </Col>

          {/* ACTIONS */}
          <Col
            span={6}
            className="flex items-center gap-4 justify-end mr-5"
            style={{
              fontFamily: "'Poppins', sans-serif", // Ensure font is applied here
            }}
          >
            <a
              type="text"
              className="text-gray-600 font-bold hover:font-bold hover:text-primary"
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
              {/* <a
                onClick={(e) => e.preventDefault()}
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={profileImage || "default-profile-icon.png"} // Default profile icon or uploaded image
                  alt="Profile Icon"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%", // Make it circular
                  }}
                />
              </a> */}
            </Dropdown>
          </Col>
        </div>
      </Row>
    </motion.div>
  );
};

export default InHeader;
