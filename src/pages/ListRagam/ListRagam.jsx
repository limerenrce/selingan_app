import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
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
} from "antd";
import {
  PlusOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Image, Flex } from "antd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import dayjs from "dayjs";
import "./ListRagam.css";

const { Title, Text, Paragraph } = Typography;

const { Content } = Layout;

const sampleData = [
  {
    key: "1",
    title: "Poetry Reading Night : An Inspiring Night of Poetry and Connection",
    description: "An evening of poetry readings by local poets.",
    location: "Café Poetry",
    day: "Sunday, 10 November 2024",
    time: "18.00 AM",
    start_time: "18:00:00 ",
    end_time: "20:00:00",
    created_by: "Kavala",
    created_at: "2024-10-15 22:06:32",
    updated_at: "2024-10-15 22:06:32",
    capacity: 50,
    is_active: 1,
    image: "images/poetry_reading.jpg",
    is_free: 1,
    requires_approval: 0,
    price: null,
    email: "1@example.com",
    status: "Going",
    checkedIn: "No",
  },
  {
    key: "2",
    title: "Baking Basics Workshop : Learn Essential Baking Skills Together",
    description: "Learn the fundamentals of baking delicious pastries.",
    location: "Culinary Studio",
    time: "18.00 AM",
    day: "Sunday, 10 November 2024",
    start_time: "18:00:00",
    end_time: "20:00:00",
    created_by: 2,
    created_at: "2024-10-15 22:06:32",
    updated_at: "2024-10-15 22:06:32",
    capacity: 20,
    is_active: 1,
    image: "images/baking_basics.jpg",
    is_free: 0,
    requires_approval: 1,
    price: 29.99,
    email: "2@example.com",
    status: "Going",
    checkedIn: "No",
  },
  {
    key: "3",
    title:
      "Flower Arrangement Class : Create stunning floral arrangements with ease",
    description: "Join us for a hands-on class in floral design.",
    location: "Floral Shop",
    time: "09.00 AM",
    day: "Monday, 11 November 2024",
    start_time: " 09:00:00",
    end_time: "11:00:00",
    created_by: 3,
    created_at: "2024-10-15 22:06:32",
    updated_at: "2024-10-15 22:06:32",
    capacity: 15,
    is_active: 1,
    image: "images/flower_arrangement.jpg",
    is_free: 1,
    requires_approval: 0,
    price: null,
    email: "3@example.com",
    status: "Going",
    checkedIn: "No",
  },
  {
    key: "4",
    title: "Open Mic Poetry Slam : Express yourself through spoken word.",
    description:
      "Share your poetry in front of an audience and compete for prizes.",
    location: "Community Center",
    day: "Monday, 11 November 2024",
    time: "19.00 AM",
    start_time: "19:00:00",
    end_time: " 21:00:00 ",
    created_by: 1,
    created_at: "2024-10-13 ",
    updated_at: "2024-10-15 ",
    capacity: 30,
    is_active: 1,
    image: "images/open_mic.jpg",
    is_free: 1,
    requires_approval: 1,
    price: 15.0,
    email: "1@example.com",
    status: "Going",
    checkedIn: "No",
  },
  {
    key: "5",
    title: "Baking with Kids : Fun and easy baking for families",
    description: "A fun baking class for children and their parents.",
    location: "Local Bakery",
    day: "Monday, 11 November 2024",
    time: "15.00 AM",
    start_time: " 10:00:00",
    end_time: " 12:00:00",
    created_by: 2,
    created_at: "2024-10-13 ",
    updated_at: "2024-10-15 ",
    capacity: 25,
    is_active: 1,
    image: "images/baking_kids.jpg",
    is_free: 0,
    requires_approval: 0,
    price: null,
    email: "2@example.com",
    status: "Going",
    checkedIn: "No",
  },
  {
    key: "6",
    title: "Cooking 101",
    description: "Learn the basics of cooking delicious meals.",
    location: "Culinary Academy",
    day: " Wednesday, 13 November 2024",
    time: "10.00 AM",
    start_time: " 14:00:00",
    end_time: " 15:30:00",
    created_by: 2,
    created_at: "2024-10-13",
    updated_at: "2024-10-15 ",
    capacity: 20,
    is_active: 1,
    image: "images/cooking_101.jpg",
    is_free: 0,
    requires_approval: 0,
    price: 49.99,
    email: "2@example.com",
    status: "Going",
    checkedIn: "No",
  },
  {
    key: "7",
    title: "Dessert Decoration Class",
    description: "Master the art of dessert decoration.",
    location: "Pastry Shop",
    day: " Wednesday, 13 November 2024",
    time: "14.00 AM",
    start_time: " 14:00:00",
    end_time: "16:00:00",
    created_by: 3,
    created_at: "2024-10-13",
    updated_at: "2024-10-15 ",
    capacity: 15,
    is_active: 1,
    image: "images/dessert_decoration.jpg",
    is_free: 0,
    requires_approval: 1,
    price: 39.99,
    email: "3@example.com",
    status: "Going",
    checkedIn: "No",
  },
  {
    key: "8",
    title: "Clay Pottery Workshop",
    description: "Create your own pottery in this hands-on workshop.",
    location: "Art Studio",
    day: " Wednesday, 13 November 2024",
    time: "09.00 AM",
    start_time: " 09:00:00",
    end_time: " 12:00:00",
    created_by: 4,
    created_at: "2024-10-15 ",
    updated_at: "2024-10-18",
    capacity: 12,
    is_active: 1,
    image: "images/clay_pottery.jpg",
    is_free: 1,
    requires_approval: 0,
    price: null,
    email: "4@example.com",
    status: "Going",
    checkedIn: "No",
  },
  {
    key: "9",
    title: "Sushi Making Class",
    description: "Learn to make sushi from a professional chef.",
    location: "Sushi Bar",
    time: "18.00 AM",
    day: " Friday, 15 November 2024",
    start_time: "18:00:00",
    end_time: "19:30:00 ",
    created_by: 1,
    created_at: "2024-10-12",
    updated_at: "2024-10-15 ",
    capacity: 25,
    is_active: 1,
    image: "images/sushi_making.jpg",
    is_free: 0,
    requires_approval: 1,
    price: 45.0,
    email: "1@example.com",
    status: "Going",
    checkedIn: "No",
  },
  {
    key: "10",
    title: "Wine and Paint Night",
    description: "Enjoy a night of painting while sipping wine.",
    location: "Art Gallery",
    day: " Friday, 15 November 2024",
    time: "17.00 AM",
    start_time: "17:00:00",
    end_time: "19:00:00",
    created_by: 5,
    created_at: "2024-10-15 22:06:32",
    updated_at: "2024-10-15 22:06:32",
    capacity: 30,
    is_active: 1,
    image: "images/wine_paint.jpg",
    is_free: 1,
    requires_approval: 1,
    price: 30.0,
    email: "5@example.com",
    status: "Going",
    checkedIn: "No",
  },
];

const Ragams = () => {
  const [Ragams, setRagams] = useState([]); // Renamed from dataSource
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    getDataRagams();
  }, []);

  const getDataRagams = () => {
    setRagams(sampleData); // Use sample data
    setLoading(false);
  };

  //Random color for avatar
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleItemClick = () => {
    navigate("/event-detail");
  };

  const handleModal = (item) => {
    setSelectedEvent(item);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (day, dayString) => {
    setSelectedDate(dayString);
  };

  const filteredRagams = Ragams.filter((item) =>
    selectedDate ? dayjs(item.day).isSame(dayjs(selectedDate), "day") : true
  );

  const modalSection = () => {
    return (
      <>
        <Modal
          width={800}
          onCancel={handleCancel}
          footer={null}
          open={isModalOpen}
        >
          <div className="container min-h-[600px] flex-center">
            <Row className="flex justify-center items-center h-full">
              <Col className=" flex justify-center items-center size-80">
                <img src="/pottery-class.jfif" alt="" />
              </Col>
              <Col className="flex justify-center items-center mb-24">
                <Card
                  bordered={false}
                  className="circlebox h-full w-full"
                  style={{
                    boxShadow: "inherit",
                    backgroundSize: "cover",
                    // height: "550px",
                    width: "700px",
                    position: "relative",
                  }}
                >
                  <Title
                    level={3}
                    style={{
                      marginLeft: 8,
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    {selectedEvent?.title}
                  </Title>

                  <Flex vertical>
                    <Flex
                      gap={75}
                      style={{
                        marginLeft: 5,
                        marginBottom: 10,
                        marginTop: 10,
                      }}
                    >
                      <Row gutter={10}>
                        <Col>
                          <div className="flex group bg-purple-300 shadow-lg light-shadow rounded-lg mx-1 cursor-pointer justify-center relative w-14 min-h-12 content-center">
                            <LocationOnIcon
                              style={{ height: 30, marginTop: 10 }}
                            />
                          </div>
                        </Col>
                        <Col>
                          <Flex
                            vertical
                            style={{
                              marginTop: 3,
                            }}
                          >
                            <Text>Markas for Founders</Text>
                            <Text>Denpasar, Bali</Text>
                          </Flex>
                        </Col>
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
                                <p className="text-purple-900 text-sm"> Oct </p>
                                <p className="text-purple-900 font-bold"> 4 </p>
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
                            <Text>Saturday, 4 October 2003</Text>
                            <Text>10:00 AM - 1:00 PM GMT+9</Text>
                          </Flex>
                        </Col>
                      </Row>
                    </Flex>

                    <Col className="flex justify-center items-center mt-8">
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
                    </Col>

                    {/* <Text>is free?? Price: IDR 20K /Ticket</Text>
                  <Text>Requires approval??</Text> */}

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
                            Satya Uttami
                          </a>
                        </p>
                      </div>
                      <Paragraph className="text-justify">
                        In this Chocholate making class, you will explore the
                        art of poetry from different perspectives, discovering
                        techniques to enhance your expression, rhythm, and
                        storytelling. We will delve into both classic and modern
                        poetry styles, learning how to convey emotions and
                        connect with audiences. You will have the chance to work
                        on your own verses, receive feedback, and understand the
                        impact of imagery, metaphors, and poetic devices. This
                        course is an inspiring journey to help you refine your
                        voice, connect with other poetry lovers, and create
                        powerful, memorable pieces.
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
                </Card>
              </Col>
            </Row>
          </div>
        </Modal>
      </>
    );
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
        <div>
          <Row justify="center" id="events" className="mt-3">
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
                    className="bg-gradient-to-r from-[#A594F9] to-[#E4B1F0] text-white font-semibold py-2 rounded-md hover:bg-[#CB9DF0] hover:text-purple-600 transition duration-300"
                  >
                    Submit Ragam
                  </Button>
                  <DatePicker onChange={onChange} />
                </div>
                {loading ? (
                  <Skeleton active />
                ) : Ragams.length > 0 ? (
                  <List
                    grid={{
                      xs: 1, // 1 card per row on smaller screens
                      sm: 1,
                      md: 2, // 2 cards per row on medium screens
                      lg: 2,
                      xl: 2,
                    }}
                    style={{ width: "100%" }}
                    dataSource={filteredRagams}
                    renderItem={(item) => (
                      <List.Item
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Card
                          hoverable
                          onClick={() => handleModal(item)}
                          style={{
                            marginBottom: "20px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                            height: "180px",
                            width: "100%", // Make the card fill available width
                            maxWidth: "600px", // Optionally, set a max-width for the card
                          }}
                        >
                          <Row>
                            <Col span={5} className="pr-4">
                              <img src="/pottery-class.jfif" alt="" />
                            </Col>

                            <Col span={19}>
                              <p className="text-[#7658B2] text-base">
                                {item.day}
                              </p>
                              <p className="text-xl font-semibold">
                                {item.title}
                              </p>

                              <p className="text-gray-400 text-base flex items-center">
                                <Avatar
                                  size={18}
                                  style={{ backgroundColor: getRandomColor() }}
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
