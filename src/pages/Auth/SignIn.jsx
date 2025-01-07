import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Checkbox,
  notification,
  Flex,
} from "antd";
import Logo from "../../assets/images/main-logo.png";
import { LockOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useState, useContext } from "react";
import { sendData } from "../../utils/api";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const { Title } = Typography;
const { Footer, Content, Header } = Layout;
const { Text } = Typography;

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //provider login hookerd
  const { signin } = useContext(AuthContext);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    sendData("/api/v1/auth/signin", formData)
      .then((resp) => {
        if (resp?.access_token) {
          signin(resp?.access_token, resp?.role);
        } else {
          setIsUnauthorized(true);
          failedLogin();
        }
      })
      .catch((err) => {
        console.log(err);
        failedLogin();
        setIsUnauthorized(true);
      });
  };

  const failedLogin = () => {
    api.error({
      message: "Failed to Login",
      description: "Incorrect username or password",
    });
  };

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
        className="signin flex justify-center items-center min-h-screen flex-col bg-gradient-to-r from-gray-100 via-[#c5c5fe] to-gray-100"
      >
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
                    <Text className="text-xl font-bold text-[#6C6CC6]">
                      SELINGAN
                    </Text>
                  </div>
                </a>
              </Col>

              {/* ACTIONS */}
              <Col span={12} className="flex items-center gap-4 justify-end">
                <a
                  className="text-gray-600 font-semibold hover:text-[#a3a3f5] space-x-3 mr-10 font-sans"
                  type="text"
                  onClick={() => navigate("/signup", { replace: true })}
                >
                  <LogoutOutlined />
                  <span>Sign Up</span>
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
                <span className="text-gray-900 font-semibold tracking-wide font-sans">
                  SELINGAN
                </span>
              </Title>
              <Text type="secondary" className="mt-0 leading-tight">
                Sign in below to start your learning experience!
              </Text>
              <br />
              <Form
                onFinish={() => handleSignIn()}
                layout="vertical"
                className="w-full"
              >
                <Form.Item
                  className="username w-full"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    className="!placeholder-black"
                    placeholder="Username"
                  />
                </Form.Item>

                <Form.Item
                  className="password w-full"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Flex
                    justify="space-between"
                    align="center"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox style={{ fontFamily: "Poppins, sans-serif" }}>
                        Remember me
                      </Checkbox>
                    </Form.Item>
                    <a href="">Forgot password</a>
                  </Flex>
                </Form.Item>

                <Form.Item>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <Button
                    color="default"
                    variant="solid"
                    htmlType="submit"
                    className={`w-full font-bold`}
                    disabled={loading}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {loading ? "Logging in..." : "Sign In"}
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
        <Footer className="bg-transparent text-center font-sans">
          <p className="copyright"> Copyright © 2024 Selingan</p>
        </Footer>
      </Layout>
    </>
  );
};

export default SignIn;
