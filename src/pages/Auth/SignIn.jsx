import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Checkbox,
  Flex,
} from "antd";
import Logo from "../../assets/images/main-logo.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import MainHeader from "../../components/MainHeader";

const { Title } = Typography;
const { Footer, Content } = Layout;
const { Text } = Typography;

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    console.log(username, password);
    navigate("/ragam", { replace: true });
  };

  return (
    <>
    <div
      style={{
        minHeight: "100vh", 
      }} className="signin flex justify-center items-center min-h-screen flex-col bg-gradient-to-r from-gray-100 via-[#c5c5fe] to-gray-100">
 
      <MainHeader/>
      <Content className="w-full p-8 mt-10">
        <Row gutter={[24, 0]} justify="center">
          <Col
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
            className="bg-white p-6 rounded-3xl shadow-lg flex flex-col justify-center items-center "
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
              Sign in below to start your learning experience!
            </Text>
            <br />
            <Form
              onFinish={() => handleSignIn()}
              div="vertical"
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
                <Input
                  prefix={<UserOutlined />}
                  className="!placeholder-black"
                  placeholder="Email"
                />
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
              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a href="">Forgot password</a>
                </Flex>
              </Form.Item>
              <Form.Item className="mb-0">
                <Button
                  color="default"
                  variant="solid"
                  htmlType="submit"
                  className={`w-full font-bold  primary-btn hover:bg-primary duration-300`}
                  disabled={!username || !password}
                >
                  Sign In
                </Button>
              </Form.Item>

              <Form.Item className="text-center">
                <Text type="secondary">
                  Dont have an account?{" "}
                  <span
                    className="text-black cursor-pointer font-medium hover:text-gray-500 "
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
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
    </div>
    </>
  );
};

export default SignIn;
