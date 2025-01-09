import { useContext, useEffect, useState } from "react";
import { message } from "antd"; // Ensure this import is present
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import { getData, sendDataPrivate } from "../../utils/api";
const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL;
import {
  Card,
  List,
  Skeleton,
  Col,
  Row,
  Button,
  Avatar,
  Layout,
  Modal,
  Divider,
  DatePicker,
  Popconfirm, 
  Radio,
  Form,
  Input,
  Flex 
} from "antd";
import {
  PlusOutlined,
  EnvironmentOutlined,
  UserOutlined,
  WarningOutlined, 
} from "@ant-design/icons"; 
import LocationOnIcon from "@mui/icons-material/LocationOn";
import dayjs from "dayjs"; 
import ExploreMap from "../../components/ExploreMap"; 
import ExploreHero from "../../components/ExploreHero";
import {AuthContext} from "../../providers/AuthProvider";

const { Title, Text, Paragraph } = Typography;

const { Content } = Layout;

const Ragams = () => {
  const [Ragams, setRagams] = useState([]); // Renamed from dataSource
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const { userProfile } = useContext(AuthContext);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [eventsMap, setEventsMap] = useState([]);

  //Random color for avatar
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  //const handle untuk modal
  const handleModal = (item) => {
    setSelectedEvent(item);
    setEventId(item.id); // Menyimpan event_id
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //untuk handle filtering data
  const onChange = (day, dayString) => {
    setSelectedDate(dayString);
  };

  const filteredRagams = Ragams.filter((item) =>
    selectedDate ? dayjs(item.day).isSame(dayjs(selectedDate), "day") : true
  );

  //const untuk modal report
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalVisible = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalVisible(true);
    console.log("isModalVisible:", isModalVisible);
  };

  const confirm = (e) => {
    console.log("Confirm clicked", e);
    handleConfirm();
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const [value, setValue] = useState();
  const Report = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const [form] = Form.useForm();

  const handleReportSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        let reported_ragam = selectedEvent?.id;
        let category = form.getFieldValue("category");
        let description = form.getFieldValue("description");
        let submitted_by = userProfile.id;

        let formData = new FormData();
        formData.append("reported_ragam", reported_ragam);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("submitted_by", submitted_by);

        let request = sendDataPrivate("/api/v1/report_ragam/create", formData);

        // Handle server response
        request
          .then((resp) => {
            // Log the response for debugging
            console.log("Server Response:", resp);

            // If report submission is successful
            if (resp?.message === "Report created successfully") {
              message.success("Report submitted successfully!");
              form.resetFields();
            } else {
              // If there was an error in the response
              message.error(
                resp?.message ||
                  "Unknown error occurred while submitting the report."
              );
            }
          })
          .catch((err) => {
            // Log error for debugging
            console.error("Error during report submission:", err);
            message.error(
              err?.message ||
                "Unknown error occurred while submitting the report."
            ); // Show error message
          });

        console.log("Form Data:", {
          reported_ragam,
          category,
          description,
        });
      })
      .catch((error) => {
        showAlert(
          "error",
          "Form validation failed",
          "Please fill in all required fields."
        );
      });
  };

  //modal to registration
  const [isModalRegisOpen, setIsModalRegisOpen] = useState(false);
  const [eventId, setEventId] = useState();
  const { userProfile } = useContext(AuthContext);

  const modalRegis = () => {
    if (!userProfile?.id) {
      message.error("You are not logged in. Please log in to register.");
      return;
    }

    if (!selectedEvent) {
      message.error("Please select an event to register.");
      return;
    }

    if (!eventId) {
      message.error("Event ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", userProfile.id); // Menggunakan user_id

    const headers = {
      Authorization: `Bearer ${userProfile.token}`,
    };

    sendDataPrivate(`/api/v1/attendance/create/${eventId}`, formData, {
      headers,
    })
      .then((resp) => {
        if (resp?.message === "Joined event successfully") {
          message.success("You have successfully registered for the event!");
          // setIsModalOpen(false); // Menutup modal event setelah registrasi
          setIsModalRegisOpen(true); // Menampilkan modal registrasi sukses
          console.log("Modal Registrasi Dibuka");
        } else {
          message.error(
            resp?.message || "Unknown error occurred during registration."
          );
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        message.error("An error occurred while registering. Please try again.");
      });

    setIsModalRegisOpen(true);
  };

  const handleOk = () => {
    console.log("OK clicked");
    setIsModalRegisOpen(false);
  };

  const handleClose = () => {
    console.log("Close clicked");
    setIsModalRegisOpen(false);
  };

  //modal section
  const modalSection = () => {
    return (
      <>
        <Modal
          width={"60%"}
          onCancel={handleCancel}
          footer={null}
          open={isModalOpen}
        >
          {/* <div className="container min-h-[600px] flex-center"> */}
          <Row className="flex justify-center items-center h-full">
            <Flex vertical style={{ padding: "40px", width: "100%" }}>
              <div style={{ justifyItems: "center", marginBottom: "30px" }}>
                <img
                src={`${REACT_APP_API_URL}/${selectedEvent?.image_path}`}
                  alt=""
                  style={{ width: "350px" }}
                />
              </div>
              <Title level={3}>{selectedEvent?.title}</Title>
              <Flex
                // gap={75}
                style={{
                  // marginLeft: 5,
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
                            {new Date(
                              selectedEvent?.start_time
                            ).toLocaleDateString("en-ID", {
                              // e.g., 03
                              month: "short", // e.g., 2024
                            })}
                          </p>
                          <p className="text-purple-900 font-bold">
                            {new Date(
                              selectedEvent?.start_time
                            ).toLocaleDateString("en-ID", {
                              // e.g., 03
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <Flex
                      vertical
                      style={{
                        marginTop: 3,
                      }}
                    >
                      <Text>
                        {new Date(selectedEvent?.start_time).toLocaleDateString(
                          "en-ID",
                          {
                            // e.g., 03
                            weekday: "long", // e.g., Sun
                            day: "2-digit", // e.g., 03
                            month: "short", // e.g., Nov
                            year: "numeric",
                          }
                        )}
                      </Text>
                      <Text>
                        {new Date(selectedEvent?.start_time).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit", // e.g., 06
                            minute: "2-digit", // e.g., 00
                            hour12: false, // 24-hour format
                            timeZone: "UTC",
                          }
                        )}{" "}
                        -
                        {new Date(selectedEvent?.end_time).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit", // e.g., 06
                            minute: "2-digit", // e.g., 00
                            hour12: false, // 24-hour format
                            timeZone: "UTC",
                          }
                        )}
                      </Text>
                    </Flex>
                  </Col>
                </Row>
              </Flex>
              <Card
                size="small"
                title="Registration"
                className="shadow-lg w-[700px]"
              >
                <div className="ml-2">
                  <p className="text-lg">
                    To join the event, please register below.
                  </p>
                  <p>50 seats left!</p>
                </div>
                <div className="flex items-center space-x-2 ml-1 my-3 mt-5">
                  <Avatar size={24} icon={<UserOutlined />} />{" "}
                  <p className="m-0 text-base">
                    <span className="font-medium">{userProfile.id}</span>{" "}
                  </p>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-[#A594F9] to-[#E4B1F0] text-white font-semibold py-2 rounded-md"
                  //  hover:bg-[#CB9DF0] hover:text-purple-600 transition duration-300
                  onClick={modalRegis}
                >
                  Register
                </Button>
                <Modal
                  // title="Basic Modal"
                  open={isModalRegisOpen}
                  onCancel={handleClose}
                  footer={null}
                >
                  <div>
                    <Title
                      level={4}
                      // className="justify-center items-center flex"
                    >
                      Congratulations! You’ve Successfully Registered!
                    </Title>
                    <br />
                    <Text>
                      Get ready for an unforgettable experience that will expand
                      your knowledge and connections. You’ll have the chance to
                      learn from top experts, exchange ideas, and meet amazing
                      fellow participants.
                    </Text>
                    <br />
                  </div>
                  <br />
                  <div style={{ textAlign: "right" }}>
                    <Button onClick={handleClose} type="primary">
                      Close
                    </Button>
                  </div>
                </Modal>
              </Card>
              <div
                className="mt-10 my-5"
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                <Title level={4}>Description</Title>
                <div className="flex items-center space-x-2 my-3">
                  <Avatar size={24} icon={<UserOutlined />} />{" "}
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
                <Paragraph className="text-justify">
                  {selectedEvent?.description}
                </Paragraph>
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
            </Flex>
            <Divider></Divider>
            <div>
              <Popconfirm
                title="Report this ragam?"
                description="Are you sure to report this ragam?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>
                  <WarningOutlined />
                  <span>Report</span>
                </Button>
              </Popconfirm>

              <Modal
                title="Why are you reporting this ragam?"
                open={isModalVisible} // Pastikan ini
                onCancel={handleModalCancel}
                onConfirm={confirm}
                footer={null}
              >
                <Form form={form} layout="vertical">
                  <Form.Item name="category" label="Choose Category">
                    <Radio.Group
                      onChange={Report}
                      value={value}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Radio value={"fraud or scam"}>Fraud or Scam</Radio>
                      <Radio value={"spam"}>Spam</Radio>
                      <Radio value={"harmful content"}>Harmful Content</Radio>
                      <Radio value={"hateful content"}>Hateful Content</Radio>
                      <Radio value={"canceled ragam"}>Canceled Ragam</Radio>
                      <Radio value={"copyright infingement"}>
                        Copyright Infringement
                      </Radio>
                      <Radio value={"violence"}>Violence</Radio>
                      <Radio value={"sexual activity"}>Sexual Activity</Radio>
                      <Radio value={"regulated activity"}>
                        Regulated Activity
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name="description" label="Description">
                    <Input.TextArea Placeholder="Add Description" />
                  </Form.Item>
                </Form>
                <br />
                <div style={{ textAlign: "right" }}>
                  <Button onClick={handleReportSubmit} type="primary">
                    Submit
                  </Button>
                </div>
              </Modal>
            </div>
          </Row>
        </Modal>
      </>
    );
  };

  //get data from api
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getDataRagam();
  }, []);

  const getDataRagam = () => {
    setLoading(true);
    getData("/api/v1/ragam/read")
      .then((resp) => {
        console.log(resp); // Debug to confirm the data structure
        if (resp && resp.datas) {
          setDataSource(resp.datas); // Use the "datas" array directly
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <>
      <Content>
        <ExploreHero/>
        <div className="p-2 w-full flex flex-col items-center justify-center">
         <ExploreMap/>
        </div>

        <Divider />
        <div>
          <Row justify="center" id="events" className="mt-16">
            <Col span={20}>
              <div style={{ width: "100%" }}>
                <div className="flex flex-col items-center justify-center mb-8">
                  <Text className="text-3xl font-bold">
                    Choose the Event That{" "}
                    <span className="text-[#7658B2]">Sparks Your Passion</span>
                  </Text>
                  <br />
                  <Text className="text-sm font-normal">
                    Find the experience that inspires you and takes you to the
                    next level. Don not miss out{" "}
                    <span className="text-[#7658B2]">
                      —let your passion lead the way!
                    </span>
                  </Text>
                </div>
                <div
                  className="flex items-center justify-between pr-5 pl-5 mt-10"
                  style={{ marginBottom: "20px" }}
                >
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => navigate("/create-ragam")}
                    className="bg-gradient-to-r from-[#A594F9] to-[#E4B1F0] text-white font-semibold py-2 rounded-md hover:bg-[#CB9DF0] hover:text-purple-600 transition duration-300"
                  >
                    Submit Ragam
                  </Button>
                  <DatePicker onChange={onChange} />
                </div>
                {loading ? (
                  <Skeleton active />
                ) : dataSource.length > 0 ? (
                  <List
                    grid={{
                      xs: 1, // 1 card per row on smaller screens
                      sm: 1,
                      md: 2, // 2 cards per row on medium screens
                      lg: 2,
                      xl: 2,
                    }}
                    style={{ width: "100%" }}
                    dataSource={dataSource}
                    renderItem={(item) => (
                      <List.Item
                        style={{ display: "flex", justifyContent: "center" }}
                        className="hover:bg-white transition duration-300"
                      >
                        <Card
                          hoverable
                          onClick={() => handleModal(item)}
                          style={{
                            marginBottom: "20px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                            maxHeight: "200px",
                            height: "100%",
                            width: "95%", // Make the card fill available width
                            maxWidth: "600px", // Optionally, set a max-width for the card
                          }}
                        >
                          <Row>
                            <Col span={5} className="pr-4">
                              <img src={`${REACT_APP_API_URL}/${item.image_path}`}alt="" />
                            </Col>

                            <Col span={19}>
                              {/* STARTING TIME */}
                              <p className="text-[#7658B2] text-base">
                                {new Date(item.start_time).toLocaleDateString(
                                  "en-ID",
                                  {
                                    weekday: "short", // e.g., Sun
                                    day: "2-digit", // e.g., 03
                                    month: "short", // e.g., Nov
                                    year: "numeric", // e.g., 2024
                                  }
                                )}
                              </p>
                              {/* TITLA */}
                              <p className="text-xl font-semibold">
                                {item.title}
                              </p>

                              <p className="text-gray-400 text-base flex items-center">
                                <Avatar
                                  size={18}
                                  style={{
                                    backgroundColor: getRandomColor(),
                                    fontSize: "15px",
                                    textAlign: "center",
                                  }}
                                >
                                  {item.created_by?.[0] || "U"}
                                </Avatar>
                                <span className="ml-2">
                                  By {item.created_by}
                                </span>
                              </p>
                              <p className="text-gray-400 text-base">
                                <EnvironmentOutlined /> {item.location}
                              </p>
                            </Col>
                          </Row>
                        </Card>
                      </List.Item>
                    )}
                  />
                ) : (
                  <p>No Ragams available.</p>
                )}
              </div>
            </Col>
            {modalSection()}
          </Row>
        </div>
      </Content>
    </>
  );
};

export default Ragams;
