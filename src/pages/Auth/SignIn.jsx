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
import { useState } from "react";
import { sendData, getDataPrivate } from "../../utils/api";
import { jwtStorage } from "../../utils/jwt_storage";


import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Footer, Content, Header } = Layout; 
const { Text } = Typography;

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  // Handle the form submission
  const handleSignIn = () => {
    setLoading(true);
    setError(null); // Clear previous error

    // Get the form values
    const username = form.getFieldValue("username");
    const password = form.getFieldValue("password");

    // Prepare the data for submission
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    // Make the API request (assuming sign-in endpoint is `/api/v1/auth/signin`)
    sendData("/api/v1/auth/signin", formData)
      .then((resp) => {
        // Check if the response contains a token
        if (resp?.access_token) {
          // Success: Store the token securely
          jwtStorage.storeToken(resp.access_token);

          // Now handle role-based redirection
          handleRoleBasedRedirect(resp.access_token);
        } else {
          // If the response doesn't contain the expected token or message
          setError("Login failed. Please try again.");
        }
      })
      .catch((err) => {
        // Handle any errors that occurred during the request
        notification.error({
          message: "Login Failed",
          description: err.toString(),
        });
      })
      .finally(() => {
        setLoading(false); // Set loading to false when done
      });
  };

  // Handle role-based redirection
  const handleRoleBasedRedirect = () => {
    // Fetch the user role after successful sign-in

    getDataPrivate("/api/v1/protected/data")
      .then((data) => {
        const userRole = data.role;
        if (userRole === "user") {
          navigate("/list-ragam", { replace: true });
        } else if (userRole === "admin") {
          navigate("/admin-report", { replace: true });
        } else {
          notification.error({
            message: "Role Error",
            description: "Invalid role, unable to redirect.",
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: "Error fetching user data",
          description: err.toString(),
        });
      });
  };

  return (
    <>
      <Layout 
      style={{ 
        minHeight: "100vh", 
       }}
      className="signin flex justify-center items-center min-h-screen flex-col bg-gradient-to-r from-gray-100 via-[#c5c5fe] to-gray-100">
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
                onClick={() => navigate("/signup", { replace: true })}
              >
                <LogoutOutlined />
                <span>Sign up</span>
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
                <span className="text-gray-900 font-semibold tracking-wide">
                  SELINGAN
                </span>
              </Title>
              <Text type="secondary" className="mt-0 leading-tight">
                Sign in below to start your learning experience!
              </Text>
              <br />
              <Form
                form={form}
                onFinish={handleSignIn}
                layout="vertical"
                className="w-full"
              >
                <Form.Item
                  className="username w-full"
                  name="username"
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
                <Flex justify="space-between" align="center" style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "12px",
                    }}>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a
                    href=""
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "12px",
                    }}
                  >
                    Forgot password
                  </a>
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
        <Footer className="bg-transparent text-center">
        <p className="copyright"> Copyright © 2024 Selingan</p>
      </Footer>
 
      </Layout>
    </>
  );
};

export default SignIn;
