// import React from "react";

import { Layout } from "antd";
import PropTypes from "prop-types";

import InHeader from "../../components/Header";
import SecondaryFooter from "../../components/SecondaryFooter";

const { Footer } = Layout;

function SelinganUserLayout({ children }) {
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          width: "100%",
          background: "none",
        }}
      >
        <InHeader />

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

SelinganUserLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SelinganUserLayout;
