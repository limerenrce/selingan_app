import {
  Avatar,
  Card,
  Col,
  Divider,
  Image,
  Row,
  Tooltip,
  Typography,
} from "antd";
import { getData } from "../../utils/api";
import { Content } from "antd/es/layout/layout";
import {
  AccessTimeRounded,
  CalendarTodayRounded,
  EventRounded,
  LocationOnRounded,
} from "@mui/icons-material";
import {
  FacebookFilled,
  GlobalOutlined,
  InstagramOutlined,
  XOutlined,
} from "@ant-design/icons";
import "./Style.css";

import { motion } from "framer-motion";
import { slideBottom, slideToRight } from "../../utils/animation";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;
const Profile = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDataRagam()
  }, [])

  const getDataRagam = () => {
    setIsLoading(true);
    getData("/api/v1/ragam/read")
      .then((resp) => {
        console.log(resp); // Debug to confirm the data structure
        if (resp && resp.datas) {
          setDataSource(resp.datas); // Use the "datas" array directly
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };




  // DATA DEFINITION
  const Events = [
    {
      nama: "Pottery Class Beginner",
      deskripsi:
        "Dive into creativity with our pottery class! Get your hands dirty as you learn to mold clay into beautiful pieces. With us, you will create unique masterpieces while having a blast!",
      waktu: "10:00",
      tanggal: "Sel, 12 November 2024",
      lokasi: "Jl. Danau Poso No.20, Sanur Kauh 80228 Sanur",
      harga: "Free",
      status: "going",
    },
    {
      nama: "Pottery Class Advanced ayusdtxca",
      deskripsi:
        "Dive into creativity with our pottery class! Get your hands dirty as you learn to mold clay into beautiful pieces. With us, you will create unique masterpieces while having a blast!",
      waktu: "14:00",
      tanggal: "Sab, 16 November 2024",
      lokasi: "Jl. Danau Poso No.20, Sanur Kauh 80228 Sanur",
      harga: "50.000",
      status: "done",
    },
    {
      nama: "Ceramic Painting",
      deskripsi: "Paint, relax, and create your own ceramic masterpiece!",
      waktu: "15.00",
      tanggal: "Ming, 17 November 2024",
      lokasi: "Jl. Danau Poso No.20, Sanur Kauh 80228 Sanur",
      harga: "25.000",
      status: "going",
    },
    {
      nama: "Ceramic Painting ABC",
      deskripsi: "Paint, relax, and create your own ceramic masterpiece!",
      waktu: "15.00",
      tanggal: "Sab, 3 November 2024",
      lokasi: "Jl. Danau Poso No.20, Sanur Kauh 80228 Sanur",
      harga: "25.000",
      status: "done",
    },
  ];

  //FILTER STATUS
  const upcomingEvents = dataSource.filter((item) => item.is_active == 1);
  const pastEvents = dataSource.filter((item) => item.is_active == 0);

  return (
    <>

      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          padding: "24px",
          marginTop: "60px",
        }}
      >
        <Row
          gutter={[24, 0]}
          style={{
            maxWidth: "700px",
            width: "100%",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          {/* PROFILE SECTION */}
          <motion.div
            variants={slideToRight(0.2)}
            initial="initial"
            animate="animate"
          >
            <Col>
              <Avatar
                size={120}
                style={{ backgroundColor: "white" }}
                src="/kevala-logo.png"
              />
            </Col>
          </motion.div>

          <Col style={{ maxWidth: "500px" }}>
            <motion.div
              variants={slideBottom(0.2)}
              initial="initial"
              animate="animate"
            >
              <Title level={3} style={{ margin: "0", fontWeight: "bold" }}>
                Kevala Pottery Studio
              </Title>
              <Text
                type="primary"
                style={{ fontSize: "20px", color: "slategrey" }}
              >
                @kevalastudiobali
              </Text>
            </motion.div>
            <motion.div
              variants={slideBottom(0.3)}
              initial="initial"
              animate="animate"
            >
              <p
                style={{
                  fontSize: "16px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                Ceramic Studio. <br /> Kevala Ceramics is a Bali-based
                workshop that creates unique ceramics for high-end hotels,
                restaurants, and resorts.{" "}
              </p>
              <Row>
                <CalendarTodayRounded
                  style={{ color: "grey", fontSize: "22" }}
                />
                <Text
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "grey",
                    marginLeft: "10px",
                  }}
                >
                  Joined July 2023
                </Text>
              </Row>
              <Row style={{ marginTop: "5px", gap: "5px" }}>
                {/* membuat */}
                <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                  56
                </Text>
                <Text type="secondary" style={{ fontSize: "16px" }}>
                  Hosted
                </Text>

                {/* mengikuti */}
                <Text
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginLeft: "15px",
                  }}
                >
                  101
                </Text>
                <Text type="secondary" style={{ fontSize: "16px" }}>
                  Attended
                </Text>
              </Row>
              <Row
                style={{
                  marginTop: "10px",
                  fontSize: "20px",
                  color: "grey",
                  gap: "15px",
                }}
              >
                <Tooltip
                  placement="top"
                  title="Instagram: @kevalaceramicsbali"
                >
                  <InstagramOutlined />
                </Tooltip>
                <Tooltip placement="top" title="X: @kevalaceramicsbali">
                  <XOutlined style={{ fontSize: "18px" }} />
                </Tooltip>
                <Tooltip placement="top" title="Facebook: Kevala Ceramics">
                  <FacebookFilled />
                </Tooltip>
                <Tooltip placement="top" title="Website: kevala-ceramics.com">
                  <GlobalOutlined />
                </Tooltip>
              </Row>
            </motion.div>
          </Col>
          <Divider style={{ marginTop: "30px", marginBottom: "20px" }} />

          {/* EVENTS SECTION */}
          {/* AKAN DATANG */}
          <motion.div
            variants={slideBottom(0.35)}
            initial={{ y: -25, opacity: 0 }}
            animate="animate"
          >
            <Title style={{ fontSize: "20px", marginBottom: "15px" }}>
              Upcoming Events
            </Title>
            <Row style={{
              maxWidth: "700px",
              width: "100%",
              gap: "20px"
            }}>
              {upcomingEvents.map((item, index) => (
                <Card
                  hoverable={true}
                  bordered={true}
                  key={index}
                  style={{
                    maxWidth: "320px",
                    width: "100%",
                    marginBottom: "10px",
                    background: "#F5F3F1"
                  }}
                  className="group hover:scale-105 hover:shadow-violet-300 hover:shadow-l"
                >
                  <Col style={{ gap: "10px", maxWidth: "300px" }}>
                    <Image
                      style={{ borderRadius: "5%", objectFit: "cover", width: "300px", height: "150px" }}
                      // width={200}
                      // height={200}
                      src="/pottery-class.jfif"
                    />
                    {/* <Col style={{ maxWidth: "490px" }}> */}
                    <Title level={4} style={{ marginBottom: "0px", whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginBottom: "2px", }}>
                      {item.title}
                    </Title>
                    <Tooltip title={item.description}>
                      <p
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "grey",
                          marginBottom: "2px",
                        }}
                      >
                        {item.description}
                      </p>
                    </Tooltip>
                    <Row
                      style={{
                        alignItems: "center",
                        gap: "5px",
                        marginBottom: "2px",
                      }}
                    >
                      <EventRounded
                        style={{ fontSize: "18", color: "grey" }}
                      />
                      <Text style={{ color: "grey" }}>
                        {new Date(item.start_time).toLocaleDateString("id-ID", {
                          weekday: "short", // e.g., Sun
                          day: "2-digit",   // e.g., 03
                          month: "short",   // e.g., Nov
                          year: "numeric",  // e.g., 2024
                        })}
                      </Text>
                      <AccessTimeRounded
                        style={{
                          fontSize: "18",
                          color: "grey",
                          marginLeft: "10px",
                        }}
                      />
                      <Text style={{ color: "grey" }}>
                        {new Date(item.start_time).toLocaleTimeString("en-US", {
                          hour: "2-digit", // e.g., 06
                          minute: "2-digit", // e.g., 00
                          hour12: false, // 24-hour format
                          timeZone: "UTC"
                        })}
                      </Text>

                    </Row>
                    <Row style={{
                      marginTop: "5px", alignItems: "center",
                      gap: "5px",
                      marginBottom: "2px",
                    }}>
                      <LocationOnRounded
                        style={{
                          fontSize: "18",
                          color: "grey",
                          // marginLeft: "10px",
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
                        color: item.is_free == 0 ? "#6C6CC6" : "green",
                        fontWeight: "700",
                      }}
                    >
                      {item.price == null
                        ? `Free`
                        : `Rp${item.price}0/pax`}
                    </Text>
                    {/* </Col> */}
                  </Col>
                </Card>
              ))}
            </Row>
          </motion.div>

          {/* EVENT SEBELUMNYA */}
          <Divider style={{ marginTop: "30px", marginBottom: "20px" }} />
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "center",
              marginBottom: "15px",
              maxWidth: "800px",
              width: "100%",
            }}
          >
            <Title style={{ fontSize: "20px" }}>Past Events</Title>
            <Text className="text-gray-400 hover:text-purple-500" style={{ cursor: "pointer" }}>
              See All
            </Text>
          </Row>
          <motion.div
            variants={slideBottom(0.35)}
            initial={{ y: -25, opacity: 0 }}
            animate="animate"
          >
            <Row style={{
              maxWidth: "700px",
              width: "100%",
              gap: "20px"
            }}>
              {pastEvents.map((item, index) => (
                <Card
                hoverable={true}
                bordered={true}
                key={index}
                style={{
                  maxWidth: "320px",
                  width: "100%",
                  marginBottom: "10px",
                  background: "#F5F3F1"
                }}
                className="group hover:scale-105 hover:shadow-violet-300 hover:shadow-l"
              >
                <Col style={{ gap: "10px", maxWidth: "300px" }}>
                  <Image
                    style={{ borderRadius: "5%", objectFit: "cover", width: "300px", height: "150px" }}
                    // width={200}
                    // height={200}
                    src="/pottery-class.jfif"
                  />
                  {/* <Col style={{ maxWidth: "490px" }}> */}
                  <Title level={4} style={{ marginBottom: "0px", whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginBottom: "2px", }}>
                    {item.title}
                  </Title>
                  <Tooltip title={item.description}>
                    <p
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "grey",
                        marginBottom: "2px",
                      }}
                    >
                      {item.description}
                    </p>
                  </Tooltip>
                  <Row
                    style={{
                      alignItems: "center",
                      gap: "5px",
                      marginBottom: "2px",
                    }}
                  >
                    <EventRounded
                      style={{ fontSize: "18", color: "grey" }}
                    />
                    <Text style={{ color: "grey" }}>
                      {new Date(item.start_time).toLocaleDateString("id-ID", {
                        weekday: "short", // e.g., Sun
                        day: "2-digit",   // e.g., 03
                        month: "short",   // e.g., Nov
                        year: "numeric",  // e.g., 2024
                      })}
                    </Text>
                    <AccessTimeRounded
                      style={{
                        fontSize: "18",
                        color: "grey",
                        marginLeft: "10px",
                      }}
                    />
                    <Text style={{ color: "grey" }}>
                      {new Date(item.start_time).toLocaleTimeString("en-US", {
                        hour: "2-digit", // e.g., 06
                        minute: "2-digit", // e.g., 00
                        hour12: false, // 24-hour format
                        timeZone: "UTC"
                      })}
                    </Text>

                  </Row>
                  <Row style={{
                    marginTop: "5px", alignItems: "center",
                    gap: "5px",
                    marginBottom: "2px",
                  }}>
                    <LocationOnRounded
                      style={{
                        fontSize: "18",
                        color: "grey",
                        // marginLeft: "10px",
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
                      color: item.is_free == 0 ? "#6C6CC6" : "green",
                      fontWeight: "700",
                    }}
                  >
                    {item.price == null
                      ? `Free`
                      : `Rp${item.price}0/pax`}
                  </Text>
                  {/* </Col> */}
                </Col>
              </Card>
              ))}
            </Row>
          </motion.div>
        </Row>
      </Content>

    </>
  );
};

export default Profile;
