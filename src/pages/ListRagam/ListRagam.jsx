import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import { getData } from "../../utils/api";
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
  Carousel,
} from "antd";
import {
  PlusOutlined,
  EnvironmentOutlined,
  UserOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Image, Flex } from "antd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import dayjs from "dayjs";
import "./ListRagam.css";
import { MoreOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const { Content } = Layout;

const Ragams = () => {
  const [Ragams, setRagams] = useState([]); // Renamed from dataSource
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [eventsMap, setEventsMap] = useState([]);

  // const [isModalReportVisible, setIsModalReportVisible] = useState(false);

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

  // const handleConfirm = () => {
  //   message.success("Click on Yes");
  //   setIsModalVisible(true);
  //   console.log("isModalVisible:", isModalVisible); // Debugging log
  // };

  //pop confirm report
  // const confirm = (e) => {
  //   console.log(e);
  //   message.success("Click on Yes");
  //   setIsModalVisible(true);
  // };
  const handleModalVisible = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalVisible(true);
    console.log("isModalVisible:", isModalVisible); // Debugging log
  };

  // Fungsi untuk konfirmasi laporan
  const confirm = (e) => {
    console.log("Confirm clicked", e); // Pastikan ini tercetak
    handleConfirm();
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  // Fungsi untuk menutup modal
  const handleModalCancel = () => {
    setIsModalVisible(false);
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
                  src="/pottery-class.jfif"
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
                    <span className="font-medium">Aprillia Kusuma</span>{" "}
                  </p>
                </div>
                <Button
                  style={{}}
                  className="w-full bg-gradient-to-r from-[#A594F9] to-[#E4B1F0] text-white font-semibold py-2 rounded-md"
                  //  hover:bg-[#CB9DF0] hover:text-purple-600 transition duration-300
                >
                  Register
                </Button>
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
                title="Why are you reporting this post?"
                open={isModalVisible} // Pastikan ini
                onCancel={handleModalCancel}
                onConfirm={confirm}
                footer={null}
              >
                <div>
                  <p>I just don't like it</p>
                  <p>Bullying or unwanted contact</p>
                  <p>Suicide, self-injury or eating disorders</p>
                  <p>Violence, hate or exploitation</p>
                  <p>Selling or promoting restricted items</p>
                  <p>Nudity or sexual activity</p>
                  <p>Scam, fraud or spam</p>
                  <p>False information</p>
                </div>
                <Button onClick={handleModalCancel} type="primary">
                  Close
                </Button>
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

  const cities = [
    { id: 1, name: "Denpasar" },
    { id: 2, name: "Ubud" },
    { id: 3, name: "Singaraja" },
    { id: 4, name: "Kuta" },
    { id: 5, name: "Gianyar" },
    { id: 6, name: "Tabanan" },
  ];

  const handleCityClick = (city) => {
    setSelectedCity(city);

    const cityEvent = dataSource.filter((item) => item.loca == 1);
    setEventsMap([]);
  }

  const slides = [
    {
      id: 1,
      backgroundImage:
        "url('https://via.placeholder.com/800x360?text=Slide+1')",
    },
    {
      id: 2,
      backgroundImage:
        "url('https://via.placeholder.com/800x360?text=Slide+2')",
    },
    {
      id: 3,
      backgroundImage:
        "url('https://via.placeholder.com/800x360?text=Slide+3')",
    },
    {
      id: 4,
      backgroundImage:
        "url('https://via.placeholder.com/800x360?text=Slide+4')",
    },
  ];

  const contentStyle = {
    height: "360px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <>
      <Content>
        <div className="w-full h-[90vh]  bg-gradient-to-r from-[#E7DBFF] to-[#EEDDED]">
          <svg
            className="absolute bottom-0 left-0 w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1400 310"
          >
            <path
              fill="#FFFFFF"
              fillOpacity="1"
              d="M0,224L80,208C160,192,320,160,480,160C640,160,800,192,960,202.7C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
          <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 mr-6 ml-6 mt-[50px]">
            {/* Left Section */}
            <div className="md:w-1/2 space-y-4">
              <h1 className="text-4xl font-bold leading-snug">
                Turn Your Leisure <br /> Into Something <br />{" "}
                <span className="text-[#7658B2]">Extraordinary</span>
              </h1>
              <p className="text-gray-600">
                Dengan beragam pilihan acara yang menarik, waktu luangmu <br />
                bisa menjadi peluang untuk bersantai, mengeksplorasi hal baru,{" "}
                <br />
                atau menikmati kegiatan yang membuatmu lebih bahagia.
              </p>
              <Button className="bg-gradient-to-r from-[#A594F9] to-[#E4B1F0] text-white font-semibold py-2 rounded-md hover:bg-[#CB9DF0] hover:text-purple-600 transition duration-300">
                <a href="#events">Choose Ragam</a>
              </Button>
            </div>
            {/* Right Section */}
            <Row gutter={[16, 16]} className="md:w-1/2 mt-8 md:mt-0">
              <Col span={12}>
                <div className="w-full h-40 bg-gray-300 rounded-lg">
                  <img
                    src="/pottery-class.jfif"
                    alt="Event Image 1"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="w-full h-40 bg-gray-300 rounded-lg">
                  <img
                    src="/macaron-class.jfif"
                    alt="Event Image 2"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="w-full h-40 bg-gray-300 rounded-lg">
                  <img
                    src="/flower-class.jpg"
                    alt="Event Image 2"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="w-full h-40 bg-gray-300 rounded-lg">
                  <img
                    src="/painting-class.jpg"
                    alt="Event Image 2"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="p-6 w-full">
          <Row className="mt-6">
            <Col lassName="w-full">
              <div className="flex flex-col items-center justify-center mb-8">
                <Text className="text-3xl font-bold">
                  Discover the Best Events in{" "}
                  <span className="text-[#7658B2]">Your Chosen Location!</span>
                </Text>
                <br />
                <Text className="text-sm font-normal">
                  Looking to attend exciting events in your city?{" "}
                  <span className="text-[#7658B2]">
                    Simply select your location on the map and explore a list of
                    events happening near you!
                  </span>
                </Text>
              </div>

              <div className="flex w-full gap-10">
                <div className="flex-grow flex flex-col gap-4">
                  <Card className="bg-gray-100" hoverable>
                    <h2>Card Title 1</h2>
                    <p>Description for card 1.</p>
                  </Card>
                  <Card className="bg-gray-100" hoverable>
                    <h2>Card Title 2</h2>
                    <p>Description for card 2.</p>
                  </Card>
                  <Card className="bg-gray-100" hoverable>
                    <h2>Card Title 3</h2>
                    <p>Description for card 3.</p>
                  </Card>
                  <Card className="bg-gray-100" hoverable>
                    <h2>Card Title 4</h2>
                    <p>Description for card 4.</p>
                  </Card>
                </div>

                <div className="w-2/3">
                  <div className="h-48 bg-gray-300 rounded"></div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div>
          <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </div>
        <div>
          <Row justify="center" id="events" className="mt-16">
            <Col span={22}>
              <div style={{ width: "100%" }}>
                <div className="flex flex-col items-center justify-center mb-8">
                  <Text className="text-3xl font-bold">
                    Choose the Event That{" "}
                    <span className="text-[#7658B2]">Sparks Your Passion</span>
                  </Text>
                  <br />
                  <Text className="text-sm font-normal">
                    Find the experience that inspires you and takes you to the
                    next level. Don't miss out{" "}
                    <span className="text-[#7658B2]">
                      —let your passion lead the way!
                    </span>
                  </Text>
                </div>
                <div
                  className="flex items-center justify-between pr-5 pl-5 mt-10"
                  style={{ marginBottom: "20px" }}
                >
                  {/* <Title level={3} className="font-bold">
                    Ragams
                  </Title> */}
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
                              <img src="/pottery-class.jfif" alt="" />
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
