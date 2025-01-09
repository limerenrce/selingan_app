import {
  Avatar,
  Card,
  Col,
  Divider,
  Image,
  Row,
  Tooltip,
  Typography,
  Skeleton,

} from "antd";
import { getData, getDataPrivate } from "../../utils/api";
import { Content } from "antd/es/layout/layout";

import {
  AccessTimeRounded,
  CalendarTodayRounded,
  EventRounded,
  LocationOnRounded,
  EmailRounded
} from "@mui/icons-material";
import {
  FacebookFilled,
  GlobalOutlined,
  InstagramOutlined,
  XOutlined,
  TikTokOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import "./Style.css";


import { motion } from "framer-motion";
import { slideBottom, slideToRight } from "../../utils/animation";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const { Title, Text } = Typography;
const Profile = () => {
  const [dataUser, setDataUser] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {userProfile} = useContext(AuthContext);

  useEffect(() => {
    getDataRagam();
    getDataUser();
  }, [])

  const getDataUser = () => {
    setIsLoading(true)
    getDataPrivate(`/api/v1/profile/read/${userProfile.user_logged}`)
      .then((resp) => {
        console.log(resp); // Debug to confirm the data structure
        if (resp && resp.datas) {
          setDataUser(resp.datas); // Use the "datas" array directly
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }

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

 

  //FILTER STATUS
  const upcomingEvents = dataSource.filter((item) => item.is_active == 1 && item.created_by == userProfile.user_logged);
  const pastEvents = dataSource.filter((item) => item.is_active == 0 && item.created_by == userProfile.user_logged);

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
            fontFamily: "Poppins, sans-serif",
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
                // src="/kevala-logo.png"
                src={`${REACT_APP_API_URL}/${dataUser.image_path}`}
              />
            </Col>
          </motion.div>

          <Col style={{ maxWidth: "500px" }}>
            {isLoading ? (
              // Show Skeleton while loading
              <div style={{gap:"5px"}}>
                <Skeleton active paragraph={{ rows: 2 }} />
                <Skeleton.Button active style={{ width: "90px", marginTop: "10px" }} />
                <Skeleton.Button active style={{ width: "90px", marginLeft: "30px", marginTop:"10px" }} />
                {/* <Skeleton.Input active style={{ width: "200px", marginTop: "10px" }} /> */}
              </div>
            ) : (
              // Actual Content
              <>
                <motion.div
                  variants={slideBottom(0.2)}
                  initial="initial"
                  animate="animate"
                >
                  <Title level={3} style={{ margin: "0", fontWeight: "bold" }}>
                    {dataUser.name}
                  </Title>
                  <Text
                    type="primary"
                    style={{ fontSize: "16px", color: "slategrey" }}
                  >
                    @{dataUser.username}
                  </Text>
                </motion.div>

                <motion.div
                  variants={slideBottom(0.3)}
                  initial="initial"
                  animate="animate"
                >
                  <p
                    style={{
                      fontSize: "14px",
                      marginTop: "10px",
                      marginBottom: "10px",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {dataUser.bio}
                  </p>
                  <Row>
                    <CalendarTodayRounded
                      style={{ color: "grey", fontSize: "22" }}
                    />
                    <Text
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "grey",
                        marginLeft: "10px",
                      }}
                    >
                      Joined{" "}
                      {new Date(dataUser.created_at).toLocaleDateString("en-ID", {
                        month: "long",
                        year: "numeric",
                      })}
                    </Text>
                  </Row>
                  <Row style={{ marginTop: "5px", gap: "5px" }}>
                    {/* Placeholder numbers */}
                    <Text style={{ fontSize: "16px", fontWeight: "bold" }}>56</Text>
                    <Text type="secondary" style={{ fontSize: "16px" }}>
                      Hosted
                    </Text>
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
                    {dataUser.instagram && (
                      <Tooltip placement="top" title={`Instagram: @${dataUser.instagram}`}>
                        <InstagramOutlined />
                      </Tooltip>
                    )}
                    {dataUser.tiktok && (
                      <Tooltip placement="top" title={`Tiktok: @${dataUser.tiktok}`}>
                        <TikTokOutlined />
                      </Tooltip>
                    )}
                    {dataUser.youtube && (
                      <Tooltip placement="top" title={`Youtube: @${dataUser.youtube}`}>
                        <YoutubeFilled style={{ fontSize: "20px" }} />
                      </Tooltip>
                    )}
                    {dataUser.facebook && (
                      <Tooltip placement="top" title={`Facebook: ${dataUser.facebook}`}>
                        <FacebookFilled />
                      </Tooltip>
                    )}
                    {dataUser.email && (
                      <Tooltip placement="top" title={`Email: ${dataUser.email}`}>
                        <EmailRounded />
                      </Tooltip>
                    )}
                    {dataUser.website && (
                      <Tooltip placement="top" title={`Website: ${dataUser.website}`}>
                        <GlobalOutlined />
                      </Tooltip>
                    )}
                  </Row>
                </motion.div>
              </>
            )}
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
            <Row
              style={{
                maxWidth: "700px",
                width: "100%",
                gap: "20px",
              }}
            >
              {upcomingEvents.map((item, index) => (
                <Card
                  hoverable={true}
                  bordered={true}
                  key={index}
                  style={{
                    maxWidth: "320px",
                    width: "100%",
                    marginBottom: "10px",
                    background: "#F7F3FF"
                  }}
                  className="group hover:scale-105 hover:shadow-violet-300 hover:shadow-l"
                >
                  <Col style={{ gap: "10px", maxWidth: "300px" }}>
                    <Image
                      style={{
                        borderRadius: "5%",
                        objectFit: "cover",
                        width: "300px",
                        height: "150px",
                      }}
                      // width={200}
                      // height={200}
                      // src="/pottery-class.jfif"
                      src={`${REACT_APP_API_URL}/${item.image_path}`}
                    />
                    {/* <Col style={{ maxWidth: "490px" }}> */}
                    <Title level={4} style={{
                      marginBottom: "0px", whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      marginBottom: "2px",
                    }}>
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
                          fontFamily: "Poppins, sans-serif",
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
                        {new Date(item.start_time).toLocaleDateString("en-ID", {
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
                        {new Date(item.start_time).toLocaleTimeString("en-ID", {
                          hour: "2-digit", // e.g., 06
                          minute: "2-digit", // e.g., 00
                          hour12: false, // 24-hour format
                          timeZone: "UTC"
                        })}
                        {/* {item.start_time} */}
                      </Text>

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
                      {item.price == null || item.price == 0
                        ? `Free`
                        : `Rp${new Intl.NumberFormat('id-ID').format(item.price)}/pax`}
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
            <Row
              style={{
                maxWidth: "700px",
                width: "100%",
                gap: "20px",
              }}
            >
              {pastEvents.map((item, index) => (
                <Card
                  hoverable={true}
                  bordered={true}
                  key={index}
                  style={{
                    maxWidth: "320px",
                    width: "100%",
                    marginBottom: "10px",
                    background: "#F7F3FF"
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
                    <Title level={4} style={{
                      marginBottom: "0px", whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      marginBottom: "2px",
                    }}>
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
                        {new Date(item.start_time).toLocaleDateString("en-ID", {
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
                        {new Date(item.start_time).toLocaleTimeString("en-ID", {
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
                      {item.price == null || item.price == 0
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
