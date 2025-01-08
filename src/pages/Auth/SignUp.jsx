import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  notification,
} from "antd";
import Logo from "../../assets/images/main-logo.png";
import { LockOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useState } from "react";
import { sendData } from "../../utils/api";

import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const { Text } = Typography;

const signUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const handleSignUp = () => {
    setLoading(true);

    // Get form values
    const email = form.getFieldValue("email");
    const password = form.getFieldValue("password");
    const confirmPassword = form.getFieldValue("confirm_password");

    // Validate that passwords match
    if (password !== confirmPassword) {
      notification.error({
        message: "Password Mismatch",
        description: "Your passwords do not match. Please try again.",
      });
      setLoading(false);
      return;
    }

    // Prepare data for submission
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    // Make the API request to the signup endpoint
    sendData("/api/v1/auth/signup", formData)
      .then((resp) => {
        // Check if the backend indicates a successful signup
        if (resp?.message === "OK") {
          notification.success({
            message: "Signup Successful",
            description: "You have successfully signed up!",
          });

          // Redirect to the sign-in page after successful signup
          navigate("/signin", { replace: true });
        } else {
          // Handle failure response
          notification.error({
            message: "Signup Failed",
            description:
              resp?.message || "Something went wrong. Please try again.",
          });
        }
      })
      .catch((err) => {
        // Handle error during the request
        notification.error({
          message: "Signup Failed",
          description: err.toString(),
        });
      })
      .finally(() => {
        setLoading(false); // Stop loading once the request is finished
      });
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
      className="signin flex justify-center items-center min-h-screen flex-col bg-gradient-to-r from-gray-100 via-[#c5c5fe] to-gray-100"
    >
      <Header className="bg-transparent flex items-center justify-between w-full p-4 z-20 font-sans">
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
                onClick={() => navigate("/signin", { replace: true })}
              >
                <LogoutOutlined />
                <span>Sign In</span>
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
              form={form}
              onFinish={handleSignUp}
              layout="vertical"
              className="w-full"
            >
              <Form.Item
                className="email w-full"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "The input is not a valid email address!", // Custom error message for invalid email format
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>

              {/* <Form.Item
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
                </Form.Item> */}

              <Form.Item
                className="password w-full"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                type="password"
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                className="confirm-password w-full"
                name="confirm_password"
                rules={[
                  { required: true, message: "Please confirm your password!" },
                ]}
                type="password"
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Confirm Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  color="default"
                  variant="solid"
                  htmlType="submit"
                  className={`w-full font-bold`}
                  loading={loading}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {loading ? "Register..." : "Sign Up"}
                </Button>
              </Form.Item>

              <Form.Item className="mt-6 text-center">
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
      <Footer className="bg-transparent text-center font-sans">
        <p className="copyright"> Copyright © 2024 Selingan</p>
      </Footer>
    </Layout>
  );
};

export default signUp;
