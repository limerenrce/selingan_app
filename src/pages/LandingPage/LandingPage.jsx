// import React from 'react'
import { Flex, Layout } from "antd";

import MainHeader from "../../components/MainHeader";
import Hero from "./Hero";
import PrimaryFooter from "../../components/PrimaryFooter";

const LandingPage = () => {
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          background: "none",
        }}
        className="font-sans"
      >
        <Flex vertical>
          {/* Header */}
          <MainHeader />

          {/* Hero */}
          <Hero />

          {/* Footer */}
          <PrimaryFooter />
        </Flex>
      </Layout>
    </>
  );
};

export default LandingPage;
