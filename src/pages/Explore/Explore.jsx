import {
  Card,
  Row,
  Col,
  Layout,
  Typography,
  Tooltip,
  Image,
  Segmented,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  AccessTimeRounded,
  EventRounded,
  LocationOnRounded,
} from "@mui/icons-material";
import "./style.css";

const { Content } = Layout;
const { Text, Title } = Typography;

const Explore = () => {
  const [selectedSegment, setSelectedSegment] = useState("Upcoming");
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate("/event-detail");
  };

  const sampleData = [
    {
      key: "1",
      title:
        "Poetry Reading Night : An Inspiring Night of Poetry and Connection",
      description: "An evening of poetry readings by local poets.",
      location: "Café Poetry",
      day: "Sun, 10 Nov 2024",
      time: "6:00 AM",
      start_time: "18:00:00 ",
      end_time: "20:00:00",
      created_by: "Kavala",
      created_at: "2024-10-15 22:06:32",
      updated_at: "2024-10-15 22:06:32",
      capacity: 50,
      is_active: 1,
      image: Image,
      is_free: 1,
      requires_approval: 0,
      price: "Free",
      email: "1@example.com",
      status: "Going",
      checkedIn: "No",
    },
    {
      key: "2",
      title: "Baking Basics Workshop : Learn Essential Baking Skills Together",
      description: "Learn the fundamentals of baking delicious pastries.",
      location: "Culinary Studio",
      time: "6:00 AM",
      day: "Sun, 10 Nov 2024",
      start_time: "18:00:00",
      end_time: "20:00:00",
      created_by: 2,
      created_at: "2024-10-15 22:06:32",
      updated_at: "2024-10-15 22:06:32",
      capacity: 20,
      is_active: 1,
      image: Image,
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
      time: "9:00 AM",
      day: "Mon, 11 Nov 2024",
      start_time: " 09:00:00",
      end_time: "11:00:00",
      created_by: 3,
      created_at: "2024-10-15 22:06:32",
      updated_at: "2024-10-15 22:06:32",
      capacity: 15,
      is_active: 1,
      image: Image,
      is_free: 1,
      requires_approval: 0,
      price: "Free",
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
      day: "Mon, 11 Nov 2024",
      time: "7:00 AM",
      start_time: "19:00:00",
      end_time: " 21:00:00 ",
      created_by: 1,
      created_at: "2024-10-13 ",
      updated_at: "2024-10-15 ",
      capacity: 30,
      is_active: 1,
      image: Image,
      is_free: 1,
      requires_approval: 1,
      price: 15.0,
      email: "1@example.com",
      status: "Done",
      checkedIn: "No",
    },
    {
      key: "5",
      title: "Baking with Kids : Fun and easy baking for families",
      description: "A fun baking class for children and their parents.",
      location: "Local Bakery",
      day: "Mon, 11 Nov 2024",
      time: "3:00 AM",
      start_time: " 10:00:00",
      end_time: " 12:00:00",
      created_by: 2,
      created_at: "2024-10-13 ",
      updated_at: "2024-10-15 ",
      capacity: 25,
      is_active: 1,
      image: Image,
      is_free: 0,
      requires_approval: 0,
      price: "Free",
      email: "2@example.com",
      status: "Done",
      checkedIn: "No",
    },
    {
      key: "6",
      title: "Cooking 101",
      description: "Learn the basics of cooking delicious meals.",
      location: "Culinary Academy",
      day: " Wed, 13 Nov 2024",
      time: "10:00 AM",
      start_time: " 14:00:00",
      end_time: " 15:30:00",
      created_by: 2,
      created_at: "2024-10-13",
      updated_at: "2024-10-15 ",
      capacity: 20,
      is_active: 1,
      image: Image,
      is_free: 0,
      requires_approval: 0,
      price: 49.99,
      email: "2@example.com",
      status: "Done",
      checkedIn: "No",
    },
    {
      key: "7",
      title: "Dessert Decoration Class",
      description: "Master the art of dessert decoration.",
      location: "Pastry Shop",
      day: " Wed, 13 Nov 2024",
      time: "2:00 PM",
      start_time: " 14:00:00",
      end_time: "16:00:00",
      created_by: 3,
      created_at: "2024-10-13",
      updated_at: "2024-10-15 ",
      capacity: 15,
      is_active: 1,
      image: Image,
      is_free: 0,
      requires_approval: 1,
      price: 39.99,
      email: "3@example.com",
      status: "Done",
      checkedIn: "No",
    },
    {
      key: "8",
      title: "Clay Pottery Workshop",
      description: "Create your own pottery in this hands-on workshop.",
      location: "Art Studio",
      day: " Wed, 13 Nov 2024",
      time: "9:00 AM",
      start_time: " 09:00:00",
      end_time: " 12:00:00",
      created_by: 4,
      created_at: "2024-10-15 ",
      updated_at: "2024-10-18",
      capacity: 12,
      is_active: 1,
      image: Image,
      is_free: 1,
      requires_approval: 0,
      price: "Free",
      email: "4@example.com",
      status: "Done",
      checkedIn: "No",
    },
    {
      key: "9",
      title: "Sushi Making Class",
      description: "Learn to make sushi from a professional chef.",
      location: "Sushi Bar",
      time: "6:00 PM",
      day: " Fri, 15 Nov 2024",
      start_time: "18:00:00",
      end_time: "19:30:00 ",
      created_by: 1,
      created_at: "2024-10-12",
      updated_at: "2024-10-15 ",
      capacity: 25,
      is_active: 1,
      image: Image,
      is_free: 0,
      requires_approval: 1,
      price: 45.0,
      email: "1@example.com",
      status: "Done",
      checkedIn: "No",
    },
    {
      key: "10",
      title: "Wine and Paint Night",
      description: "Enjoy a night of painting while sipping wine.",
      location: "Art Gallery",
      day: " Fri, 15 Nov 2024",
      time: "5:00 AM",
      start_time: "17:00:00",
      end_time: "19:00:00",
      created_by: 5,
      created_at: "2024-10-15 22:06:32",
      updated_at: "2024-10-15 22:06:32",
      capacity: 30,
      is_active: 1,
      image: Image,
      is_free: 1,
      requires_approval: 1,
      price: 30.0,
      email: "5@example.com",
      status: "Going",
      checkedIn: "No",
    },
  ];

  const filteredData = sampleData.filter((item) =>
    selectedSegment === "Upcoming"
      ? item.status === "Going"
      : item.status === "Done"
  );

  return (
    <>
      <Content
        style={{
          // backgroundColor:"grey",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
        className="font-sans"
      >
        <div
          style={{
            maxWidth: "800px",
            width: "100%",
            padding: "0px",
          }}
        >
          <Col>
            <div className="ml-3 mt-20 font-sans">
              <h1 className="font-bold text-grey-800 text-4xl">Schedule</h1>
              <p className="mt-3 text-grey-200 text-lg">
                Review past events and plan for the upcoming ones with ease.
                Stay in control of your time and always know what's on the
                horizon!
              </p>
            </div>
            <Segmented
              options={["Upcoming", "Past"]}
              onChange={(value) => setSelectedSegment(value)}
              style={{
                marginLeft: 10,
                marginTop: "10px",
                tabSize: "large",
                color: "#C4B7E5",
              }}
            />

            {/* UPCOMING / PAST EVENTS */}
            <Row gutter={16} justify="start" style={{ marginTop: "20px" }}>
              {filteredData.map((item) => (
                <Col span={8} key={item.key} style={{}}>
                  <div className="group relative cursor-pointer overflow-hidden bg-white  transition-all duration-300">
                    <Card
                      hoverable="true"
                      size="small"
                      bordered={false}
                      style={{
                        boxShadow: "none",
                        padding: 0,
                        margin: 10,
                        maxWidth: "247px",
                        width: "100%",
                        fontFamily: "Poppins, sans-serif",
                      }}
                      className="duration-300 group relative border-2 border-gray-100 group-hover:border-[#a3a3f5]"
                    >
                      <Col style={{ gap: "10px", maxWidth: "300px" }}>
                        <Image
                          style={{
                            borderRadius: "5%",
                            objectFit: "cover",
                            width: "300px",
                            height: "150px",
                          }}
                          src="/pottery-class.jfif"
                        />
                        <Tooltip title={item.title}>
                          <Title
                            onClick={() => handleItemClick()}
                            level={5}
                            style={{
                              marginBottom: "0px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.title}
                          </Title>
                        </Tooltip>
                        <Tooltip title={item.description}>
                          <p
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              color: "grey",
                              marginBottom: "2px",
                              fontFamily: "Poppins, sans-serif",
                            }}
                          >
                            {item.description}
                          </p>
                        </Tooltip>
                        <Row
                          style={{
                            alignItems: "center",
                            gap: "3px",
                            marginBottom: "2px",
                          }}
                        >
                          <EventRounded
                            style={{ fontSize: "18", color: "grey" }}
                          />
                          <Text style={{ color: "grey" }}>{item.day}</Text>
                        </Row>
                        <Row
                          style={{
                            marginTop: "5px",
                            alignItems: "center",
                            gap: "5px",
                            marginBottom: "2px",
                          }}
                        >
                          <AccessTimeRounded
                            style={{
                              fontSize: "18",
                              color: "grey",
                            }}
                          />
                          <Text style={{ color: "grey" }}>{item.time}</Text>
                        </Row>
                        <Row
                          style={{
                            marginTop: "5px",
                            alignItems: "center",
                            gap: "5px",
                            marginBottom: "2px",
                          }}
                        >
                          <LocationOnRounded
                            style={{
                              fontSize: "18",
                              color: "grey",
                            }}
                          />
                          <Tooltip title={item.location}>
                            <Text
                              style={{
                                color: "grey",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "190px",
                              }}
                            >
                              {item.location}
                            </Text>
                          </Tooltip>
                        </Row>
                        <Text
                          style={{
                            color: item.price != "Free" ? "#A3A3F5" : "green",
                            fontWeight: "700",
                          }}
                        >
                          {item.price != "Free"
                            ? `Rp${item.price}/pax`
                            : item.price}
                        </Text>
                      </Col>
                    </Card>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </div>
      </Content>
    </>
  );
};

export default Explore;
