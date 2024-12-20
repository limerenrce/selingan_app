// import React from 'react'
import { Flex, Layout } from "antd";

import MainHeader from "../../components/MainHeader";
import Hero from "./Hero";
import About from "./About";
import PrimaryFooter from "../../components/PrimaryFooter";

const LandingPage = () => {
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          position: "relative",
          top: "50px", // Moves the content 50px down
          background: "linear-gradient(to bottom, #E7DBFF, #FFFFFF, #FFFFFF, #FFFFFF)"
        }}
        
        className="font-sans"
      >
        <Flex vertical>
          {/* Header */}
          <MainHeader />

          {/* Hero */}
          <Hero />

          {/* About */}
          <About />

          {/* Footer */}
          <PrimaryFooter />
        </Flex>
      </Layout>
    </>
  );
};

export default LandingPage;
