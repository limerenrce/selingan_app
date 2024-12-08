import { Menu, Typography } from "antd";
import { motion } from "framer-motion";
import { slideUp, slideToRight } from "../../utility/animation";

import { NavLink, useLocation } from "react-router-dom";
// import Logo from "../../assets/images/logo2.png";
import { useEffect, useState } from "react";
import "../../App.css";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import QueueMusicRoundedIcon from "@mui/icons-material/QueueMusicRounded";
import MovieRoundedIcon from "@mui/icons-material/MovieRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import "@fontsource/poppins"; // Import the Poppins font
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body, .ant-typography, .icon, .music-link, {
    font-family: 'Poppins', sans-serif !important;
  }
`;

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
      key: "/music",
      label: (
        <motion.div variants={slideUp(0.2)} initial="initial" animate="animate">
          <NavLink to="/music" className="music-link">
            <span
              className="icon"
              style={{
                // backgroundColor: selectedKey === "music" ? "#FB7473" : "",
                color: selectedKey === "/music" ? "#FB7473" : "#F5B9B8",
                alignItems: "center",
                fontWeight: "bolder",
              }}
            >
              <MusicNoteRoundedIcon
                style={{ height: "20px", marginRight: "10px" }}
              />
              {/* <Text> Music </Text> */}
              Music
            </span>
          </NavLink>
        </motion.div>
      ),
    },
    {
      key: "/song",
      label: (
        <motion.div variants={slideUp(0.3)} initial="initial" animate="animate">
          <NavLink to="/song">
            <span
              className="icon"
              style={{
                backgroundColor: selectedKey === "song" ? "#000000" : "",
                color: selectedKey === "/song" ? "#FB7473" : "#F5B9B8",
                alignItems: "center",
                fontWeight: "bolder",
              }}
            >
              <QueueMusicRoundedIcon
                style={{ height: "20px", marginRight: "10px" }}
              />
              {/* <Text> Song </Text> */}
              Song
            </span>
          </NavLink>
        </motion.div>
      ),
    },
    {
      key: "/movie",
      label: (
        <motion.div variants={slideUp(0.4)} initial="initial" animate="animate">
          <NavLink to="/movie">
            <span
              className="icon"
              style={{
                backgroundColor: selectedKey === "movie" ? "#000000" : "",
                color: selectedKey === "/movie" ? "#FB7473" : "#F5B9B8",
                alignItems: "center",
                fontWeight: "bolder",
              }}
            >
              <MovieRoundedIcon
                style={{ height: "20px", marginRight: "10px" }}
              />
              {/* <Text> Movie </Text> */}
              Movie
            </span>
          </NavLink>
        </motion.div>
      ),
    },
    {
      key: "/education",
      label: (
        <motion.div variants={slideUp(0.5)} initial="initial" animate="animate">
          <NavLink to="/education">
            <span
              className="icon"
              style={{
                backgroundColor: selectedKey === "education" ? "#000000" : "",
                color: selectedKey === "/education" ? "#FB7473" : "#F5B9B8",
                alignItems: "center",
                fontWeight: "bolder",
              }}
            >
              <SchoolRoundedIcon
                style={{ height: "20px", marginRight: "10px" }}
              />
              {/* <Text> Music </Text> */}
              Education
            </span>
          </NavLink>
        </motion.div>
      ),
    },
    {
      key: "/others",
      label: (
        <motion.div variants={slideUp(0.6)} initial="initial" animate="animate">
          <NavLink to="/others">
            <span
              className="icon"
              style={{
                backgroundColor: selectedKey === "other" ? "#000000" : "",
                color: selectedKey === "/others" ? "#FB7473" : "#F5B9B8",
                alignItems: "center",
                fontWeight: "bolder",
              }}
            >
              <MoreHorizRoundedIcon
                style={{ height: "20px", marginRight: "10px" }}
              />
              {/* <Text> Other </Text> */}
              Others
            </span>
          </NavLink>
        </motion.div>
      ),
    },
    {
      key: "/lab",
      label: (
        <motion.div variants={slideUp(0.7)} initial="initial" animate="animate">
          <NavLink to="/lab">
            <span
              className="icon"
              style={{
                backgroundColor: selectedKey === "lab" ? "#000000" : "",
                color: selectedKey === "/lab" ? "#FB7473" : "#F5B9B8",
                alignItems: "center",
                fontWeight: "bolder",
              }}
            >
              <ScienceRoundedIcon
                style={{ height: "20px", marginRight: "10px" }}
              />
              {/* <Text> Lab </Text> */}
              Lab
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
        <motion.div
        variants={slideToRight(0.2)}
        initial="initial"
        animate="animate"
      >
        <NavLink to="/" className="home-link">
          <span
            className="icon"
            style={{
              // backgroundColor: selectedKey === "music" ? "#FB7473" : "",
              color: selectedKey === "/" ? "#FB7473" : "#F5B9B8",
              alignItems: "center",
              fontWeight: "bolder",
            }}
          >
            <MeetingRoomIcon style={{ height: "20px", marginRight: "10px" }} />
            {/* <Text> Music </Text> */}
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
    <>
      <GlobalStyle />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh", // Full height of the viewport
          padding: 0,
        }}
      >
        <div>
          <motion.div
            variants={slideToRight(0.2)}
            initial="initial"
            animate="animate"
          >
            <div className="flex space-x-2 items-start px-5 py-4 ml-3 mt-5">
              {/* <img src={Logo} alt="Logo Selingan" className="w-12 h-8" /> */}
              <Text className="text-3xl font-bold gradient-text">
                Hello, what would you like to see today?
              </Text>
            </div>
          </motion.div>

          <Menu
            theme="black"
            color="#F5B9B8"
            mode="inline"
            items={menuItems}
            selectedKeys={[selectedKey]}
            onSelect={handleMenuKey}
            style={{
              backgroundColor: "#000000", // Ensure this is a valid color
              color: selectedKey === "key" ? "#FB7473" : "#F5B9B8",
            }}
          />
        </div>
        <div
          style={{
            marginTop: "auto", // Push the back button to the bottom
          }}
        >
          <Menu
            theme="black"
            color="#F5B9B8"
            mode="inline"
            items={back}
            onSelect={handleMenuKey}
            style={{
              backgroundColor: "#000000",
              color: selectedKey === "key" ? "#FB7473" : "#F5B9B8",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Sidenav;
