import { Menu, Typography } from "antd";
import { motion } from "framer-motion";
import { slideUp, slideToRight } from "../utils/animation";

import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import QueueMusicRoundedIcon from "@mui/icons-material/QueueMusicRounded";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import "@fontsource/poppins"; // Import the Poppins font

const { Text } = Typography;

function Sidenav() {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  useEffect(() => {
    // Update selectedKey based on the current pathname
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    {
      key: "/admin-report",
      label: (
        <motion.div variants={slideUp(0.2)} initial="initial" animate="animate">
          <NavLink to="/admin-report">
            <span
              className="icon"
              style={{
                color: selectedKey === "/admin-report" ? "#FB7473" : "#F5B9B8",
                alignItems: "center",
                fontWeight: "bolder",
              }}
            >
              <MusicNoteRoundedIcon style={{ height: "20px", marginRight: "10px" }} />
              Report
            </span>
          </NavLink>
        </motion.div>
      ),
    },
    {
      key: "/admin-user",
      label: (
        <motion.div variants={slideUp(0.3)} initial="initial" animate="animate">
          <NavLink to="/admin-user">
            <span
              className="icon"
              style={{
                color: selectedKey === "/admin-user" ? "#FB7473" : "#F5B9B8",
                alignItems: "center",
                fontWeight: "bolder",
              }}
            >
              <QueueMusicRoundedIcon style={{ height: "20px", marginRight: "10px" }} />
              User
            </span>
          </NavLink>
        </motion.div>
      ),
    },
  ];

  const back = [
    {
      key: "/",
      label: (
        <motion.div variants={slideToRight(0.2)} initial="initial" animate="animate">
          <NavLink to="/">
            <span
              className="icon"
              style={{
                color: selectedKey === "/" ? "#FB7473" : "#F5B9B8",
                alignItems: "center",
                fontWeight: "bolder",
              }}
            >
              <MeetingRoomIcon style={{ height: "20px", marginRight: "10px" }} />
              Selingan
            </span>
          </NavLink>
        </motion.div>
      ),
    },
  ];

  const handleMenuKey = ({ key }) => {
    setSelectedKey(key);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Full height of the viewport
        padding: 0,
      }}
    >
      <div>
        <motion.div variants={slideToRight(0.2)} initial="initial" animate="animate">
          <div className="flex space-x-2 items-start px-5 py-4 ml-3 mt-5">
            <Text className="text-3xl font-bold">
              Hello, what would you like to see today?
            </Text>
          </div>
        </motion.div>

        <Menu
          theme="light"
          mode="inline"
          items={menuItems}
          selectedKeys={[selectedKey]}
          onSelect={handleMenuKey}
          style={{
            backgroundColor: "#fff", // Light mode background
          }}
        />
      </div>

      <div style={{ marginTop: "auto" }}>
        <Menu
          theme="light"
          mode="inline"
          items={back}
          onSelect={handleMenuKey}
          style={{
            backgroundColor: "#fff", // Light mode background
          }}
        />
      </div>
    </div>
  );
}

export default Sidenav;
