import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Typography,
} from "antd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { WarningOutlined } from "@mui/icons-material";
import { UserOutlined } from "@ant-design/icons";

// Destructure Typography components
const { Title, Paragraph, Text } = Typography;

const ModalRagam = ( isModalOpen, setIsModalOpen, selectedEvent ) => {
  const [value, setValue] = useState(); 
  const [form] = Form.useForm();

  const handleModalCancel = () => {
    setIsModalOpen(false); // Close the modal when the cancel button is clicked
  };

  const handleReportChange = (e) => {
    setValue(e.target.value); // Update selected value for report reason
  };  
  
  return (
    <Modal
      width={"60%"}
      onCancel={handleModalCancel} // Close the modal on cancel
      footer={null}
      open={isModalOpen} // Control modal visibility with the open prop
      title="Event Details"
    >
      <Row className="flex justify-center items-center h-full">
        <Flex vertical style={{ padding: "40px", width: "100%" }}>
          <div style={{ justifyItems: "center", marginBottom: "30px" }}>
            <img
              src="/pottery-class.jfif"
              alt="Event"
              style={{ width: "350px" }}
            />
          </div>
          <Title level={3}>{selectedEvent?.title}</Title>
          <Flex
            style={{
              marginBottom: "30px",
              marginTop: "10px",
              gap: "30%",
              alignContent: "space-between",
            }}
          >
            <Row style={{ gap: "10px", alignItems: "center" }}>
              <div className="flex group bg-purple-300 shadow-lg light-shadow rounded-lg mx-1 cursor-pointer justify-center relative w-14 min-h-12 content-center">
                <LocationOnIcon style={{ height: 30, marginTop: 10 }} />
              </div>
              <Text>{selectedEvent?.location}</Text>
            </Row>
            <Row gutter={10}>
              <Col>
                <div className="flex group bg-purple-300 shadow-lg light-shadow rounded-lg mx-1 cursor-pointer justify-center relative w-14 min-h-12 content-center">
                  <span className="flex h-3 w-3 absolute -top-1 -right-1">
                    <span className="animate-ping absolute group-hover:opacity-75 opacity-0 inline-flex h-full w-full rounded-full bg-purple-400 "></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                  </span>
                  <div className="flex items-center px-4">
                    <div className="text-center">
                      <p className="text-purple-900 text-sm">
                        {new Date(selectedEvent?.start_time).toLocaleDateString("en-ID", {
                          month: "short",
                        })}
                      </p>
                      <p className="text-purple-900 font-bold">
                        {new Date(selectedEvent?.start_time).toLocaleDateString("en-ID", {
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <Flex vertical style={{ marginTop: 3 }}>
                  <Text>
                    {new Date(selectedEvent?.start_time).toLocaleDateString(
                      "en-ID", { weekday: "long", day: "2-digit", month: "short", year: "numeric" }
                    )}
                  </Text>
                  <Text>
                    {new Date(selectedEvent?.start_time).toLocaleTimeString(
                      "en-US", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" }
                    )}
                    {" "} - {" "}
                    {new Date(selectedEvent?.end_time).toLocaleTimeString(
                      "en-US", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" }
                    )}
                  </Text>
                </Flex>
              </Col>
            </Row>
          </Flex>

          <Card size="small" title="Registration" className="shadow-lg w-[700px]">
            <div className="ml-2">
              <p className="text-lg">To join the event, please register below.</p>
              <p>50 seats left!</p>
            </div>
            <div className="flex items-center space-x-2 ml-1 my-3 mt-5">
              <Avatar size={24} icon={<UserOutlined />} />
              <p className="m-0 text-base">
                <span className="font-medium">Aprillia Kusuma</span>
              </p>
            </div>
            <Button className="w-full bg-gradient-to-r from-[#A594F9] to-[#E4B1F0] text-white font-semibold py-2 rounded-md">
              Register
            </Button>
          </Card>

          <div className="mt-10 my-5" style={{ marginLeft: 10, marginRight: 10 }}>
            <Title level={4}>Description</Title>
            <div className="flex items-center space-x-2 my-3">
              <Avatar size={24} icon={<UserOutlined />} />
              <p className="m-0 text-base">
                Hosted by{" "}
                <a
                  href="mailto:satyautta@gmail.com"
                  className="hover:text-black hover:underline transition duration-100"
                >
                  {selectedEvent?.created_by}
                </a>
              </p>
            </div>
            <Paragraph className="text-justify">{selectedEvent?.description}</Paragraph>
          </div>

          <div className="my-2 mx-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d505177.941253496!2d114.8471397286711!3d-8.430831999785685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd241005ee2d511%3A0xd46c58fecfa8dba0!2sMARKAS%20Bali%20-%20Home%20for%20Founders!5e0!3m2!1sen!2sid!4v1732202697349!5m2!1sen!2sid"
              width="100%"
              height={200}
              style={{ border: 10 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>

          <Divider />

          <div>
            <Popconfirm
              title="Report this ragam?"
              description="Are you sure to report this ragam?"
              onConfirm={handleReportChange} // Handle reporting
              onCancel={() => message.error("Report cancelled")}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>
                <WarningOutlined />
                <span>Report</span>
              </Button>
            </Popconfirm>
          </div>
        </Flex>
      </Row>
    </Modal>
  );
};

export default ModalRagam;
