// import { Layout, Typography, Row, Col, Space } from "antd";
// import {
//   FacebookOutlined,
//   TwitterOutlined,
//   InstagramOutlined,
// } from "@ant-design/icons";
// import Logo from "../assets/images/logo.png";

// const { Footer } = Layout;
// const { Title, Text } = Typography;

const SecondaryFooter = () => {
  return (
    <footer className="text-gray-800 px-2 mt-2 font-sans text-[12px]">
      {/* Apply text-[10px] here */}
      <div className="container mx-auto flex flex-wrap items-center justify-between border-t-[1px] border-gray-200">
        <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8 mt-2">
          <p className="text-gray-400 md:text-[12px]">
            Selingan 2024 © All Rights Reserved
          </p>
        </div>
        <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8 mt-2">
          <ul className="list-reset flex justify-center flex-wrap text-[12px] md:text-[12px] gap-3">
            {/* Text size applied */}
            <li className="mx-4">
              <a href="/about-us" className="text-gray-400 hover:text-black">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-400 hover:text-black">
                Contact
              </a>
            </li>
            <li className="mx-4">
              <a href="/privacy" className="text-gray-400 hover:text-black">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="text-gray-400 hover:text-black">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default SecondaryFooter;
