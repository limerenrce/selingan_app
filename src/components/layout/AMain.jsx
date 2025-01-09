// import { useState, useEffect } from "react";
// import { Layout, Button } from "antd";
// import { MenuOutlined } from "@ant-design/icons";
// import PropTypes from "prop-types";
// import Sidenav from "../Sidenav";

// const { Content, Footer, Sider } = Layout;

// function SelinganAdminLayout({ children }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [isSmallScreen, setIsSmallScreen] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   const toggleSider = () => {
//     setCollapsed(!collapsed);
//   };

//   const handleBreakpoint = (broken) => {
//     setIsSmallScreen(broken);
//     setCollapsed(broken);
//   };

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const marginLeft = windowWidth >= 1000 ? "250px" : "0";

//   return (
//     <Layout
//       style={{
//         // background: "#131313",
//         minHeight: "100vh",
//         fontFamily: "Poppins, sans-serif",
//       }}
//     >
//       {isSmallScreen && (
//         <Button
//           type="primary"
//           icon={<MenuOutlined />}
//           onClick={toggleSider}
//           style={{
//             position: "fixed",
//             top: 16,
//             left: 16,
//             zIndex: 1000,
//             backgroundColor: "transparent",
//             color: "#F5B9B8",
//             fontFamily: "Poppins, sans-serif",
//           }}
//         />
//       )}

//       <Sider
//         breakpoint="lg"
//         collapsedWidth={0}
//         collapsed={collapsed}
//         onBreakpoint={handleBreakpoint}
//         width={250}
//         style={{
//           position: "fixed",
//           height: "100%",
//           backgroundColor: "#000000",
//           left: 0,
//           top: 0,
//           bottom: 0,
//           zIndex: 1,
//           fontFamily: "Poppins, sans-serif",
//           overflow: "auto",
//         }}
//       >
//         <Sidenav />
//       </Sider>

//       <Layout
//         style={{
//           zIndex: 0,
//           // background: "#131313",
//           fontFamily: "Poppins, sans-serif",
//         }}
//       >
//         <Content
//           className="responsive-content"
//           style={{
//             // background: "#131313",
//             marginLeft: marginLeft,
//             fontFamily: "Poppins, sans-serif",
//           }}
//         >
//           {children}
//         </Content>
//         <Footer
//           style={{
//             textAlign: "center",
//             // background: "#131313",
//             marginLeft: marginLeft,
//             fontFamily: "Poppins, sans-serif",
//           }}
//         >
//           <p className="text-[#FFC3C2]">
//             Selingan ©{new Date().getFullYear()} Created by CrewCilz
//           </p>
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// }

// SelinganAdminLayout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default SelinganAdminLayout;

// import React from "react";

import { Layout } from "antd";
import PropTypes from "prop-types";

import AdminHeader from "../../components/HeaderAdmin";
import SecondaryFooter from "../../components/SecondaryFooter";
// import zIndex from "@mui/material/styles/zIndex";

const { Footer } = Layout;

function SelinganAdminLayout({ children }) {
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          width: "100%",
          background: "none",
        }}
      >
        <AdminHeader />

        {children}
        {/* F O O T E R */}

        <Footer
          style={{
            background: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ maxWidth: "800px", width: "100%", padding: "0px" }}>
            <SecondaryFooter />
          </div>
        </Footer>
      </Layout>
    </>
  );
}

SelinganAdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SelinganAdminLayout;
