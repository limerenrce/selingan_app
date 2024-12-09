import { Layout, Button, Row, Col, Typography, Form, Input } from "antd";
import Logo from "../../assets/images/main-logo.png";
import { LockOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const { Text } = Typography;

const signUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    console.log(username, password, confirmPassword);
    navigate("/dashboard", { replace: true });
  };

  return (
    <Layout className="signin flex justify-center items-center min-h-screen flex-col bg-gradient-to-r from-gray-100 via-[#c5c5fe] to-gray-100">
      <Header className="bg-transparent flex items-center justify-between w-full p-4 z-20">
        <Row
          gutter={2}
          className="w-full top-0 fixed backdrop-blur-xl py-3 text-2xl z-50 flex items-center justify-between"
        >
          <div className="w-full mx-auto flex ">
            {/* LOGO */}
            <Col span={12}>
              <a href="/">
                <div className="flex space-x-2 items-start px-5">
                  <img src={Logo} alt="Logo Selingan" className="w-12 h-8" />
                  <Text className="text-xl font-bold text-[#a3a3f5]">
                    SELINGAN
                  </Text>
                </div>
              </a>
            </Col>

            {/* ACTIONS */}
            <Col span={12} className="flex items-center gap-4 justify-end">
              <a
                className="text-gray-600 font-semibold hover:text-[#a3a3f5] space-x-3 mr-10"
                type="text"
                onClick={() => navigate("/signin", { replace: true })}
              >
                <LogoutOutlined />
                <span>Sign in</span>
              </a>
            </Col>
          </div>
        </Row>
      </Header>
      <Content className="w-full p-8">
        <Row gutter={[24, 0]} justify="center">
          <Col
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
            className="bg-white p-6 rounded-3xl shadow-lg flex flex-col justify-center items-center h-full"
          >
            <Title
              level={2}
              className="mb-0 leading-tight flex items-center space-x-3"
            >
              <img
                src={Logo}
                alt="Logo"
                className="w-12 h-12 rounded-full shadow-md"
              />
              <span className="text-gray-900 font-semibold tracking-wide">
                SELINGAN
              </span>
            </Title>
            <Text type="secondary" className="mt-0 leading-tight">
              Create an account to start learning today!
            </Text>
            <br />
            <Form
              onFinish={() => handleSignUp()}
              layout="vertical"
              className="row-col w-full"
            >
              <Form.Item
                className="username w-full"
                initialValue={username}
                name="email"
                onChange={(e) => setUsername(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                className="password w-full"
                initialValue={password}
                name="password"
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                className="password w-full"
                initialValue={confirmPassword}
                name="confirm password"
                type={"confirm password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Confirm Password"
                />
              </Form.Item>
              <Form.Item className="mb-0">
                <Button
                  color="default"
                  variant="solid"
                  htmlType="submit"
                  className={`w-full font-bold`}
                  disabled={!username || !password || !confirmPassword}
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "12px",
                  }}
                >
                  Sign Up
                </Button>
              </Form.Item>

              <Form.Item className="text-center">
                <Text type="secondary">
                  Already have an account?{" "}
                  <span
                    className="text-black cursor-pointer font-medium hover:text-gray-500"
                    onClick={() => navigate("/signin")}
                  >
                    Sign In
                  </span>
                </Text>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
      <Footer className="bg-transparent text-center">
        <p className="copyright"> Copyright © 2024 Selingan</p>
      </Footer>
    </Layout>
  );
};

export default signUp;
