import { Card, Row, Col, Layout, Typography, Tooltip, Image } from "antd";
import { useNavigate } from "react-router-dom";
import {
  AccessTimeRounded,
  EventRounded,
  LocationOnRounded,
} from "@mui/icons-material";
import "./style.css";

const { Title, Text } = Typography;
const { Content } = Layout;

const Explore = () => {
  const navigate = useNavigate();

  const city = [
    {
      icon: "Icon for Denpasar",
      city: "Denpasar",
      events: 25,
    },
    {
      icon: "Icon for Ubud",
      city: "Ubud",
      events: 15,
    },
    {
      icon: "Icon for Seminyak",
      city: "Seminyak",
      events: 20,
    },
    {
      icon: "Icon for Kuta",
      city: "Kuta",
      events: 30,
    },
    {
      icon: "Icon for Nusa Dua",
      city: "Nusa Dua",
      events: 10,
    },
    {
      icon: "Icon for Canggu",
      city: "Canggu",
      events: 18,
    },
    {
      icon: "Icon for Sanur",
      city: "Sanur",
      events: 12,
    },
    {
      icon: "Icon for Lovina",
      city: "Lovina",
      events: 5,
    },
    {
      icon: "Icon for Amed",
      city: "Amed",
      events: 7,
    },
    {
      icon: "Icon for Jimbaran",
      city: "Jimbaran",
      events: 8,
    },
  ];

  const category = [
    {
      category: "Cooking",
      events: 283,
    },
    {
      category: "Photography",
      events: 926,
    },
    {
      category: "Plant",
      events: 100,
    },
    {
      category: "Dessert",
      events: 30,
    },
  ];

  const Events = [
    {
      nama: "Pottery Class Beginner",
      deskripsi:
        "Dive into creativity with our pottery class! Get your hands dirty as you learn to mold clay into beautiful pieces. With us, you will create unique masterpieces while having a blast!",
      waktu: "10:00 AM",
      tanggal: "Tue, 12 Nov 2024",
      lokasi: "Jl. Danau Poso No.20, Sanur Kauh 80228 Sanur",
      harga: "Free",
      status: "going",
    },
    {
      nama: "Ceramic Painting",
      deskripsi: "Paint, relax, and create your own ceramic masterpiece!",
      waktu: "3:00 PM",
      tanggal: "Sun, 17 Nov 2024",
      lokasi: "Jl. Danau Poso No.20, Sanur Kauh 80228 Sanur",
      harga: "25.000",
      status: "going",
    },
  ];

  const handleItemClick = () => {
    navigate("/list-ragam");
  };

  const upcomingEvents = Events.filter((event) => event.status === "going");

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
        <div style={{ maxWidth: "800px", width: "100%", padding: "0px" }}>
          {/* C O L U M N */}

          <Col>
            <div className="ml-3 mt-20">
              <h1 className="font-bold text-grey-800 text-4xl font-sans">
                Explore Ragam
              </h1>
              <p className="mt-3 text-grey-200 text-lg font-sans">
                Explore popular ragam near you, browse by category, or check out
                some of the great community calendars.
              </p>
            </div>

            {/* EVENTS SECTION */}
            <div>
              <p className="ml-3 mt-8 font-bold text-gray-600 text-xl font-sans">
                Popular Ragam This Week
              </p>
            </div>
            <Row
              gutter={8}
              justify="start"
              style={{
                marginLeft: 2,
                overflow: "auto",
                gap: "10px",
              }}
            >
              {upcomingEvents.map((item, index) => (
                <div
                  key={index}
                  className="group relative cursor-pointer overflow-hidden bg-white  transition-all duration-300"
                >
                  <Card
                    hoverable="true"
                    size="small"
                    bordered={false}
                    style={{
                      boxShadow: "none",
                      padding: 0,
                      margin: 10,
                      maxWidth: "320px",
                      width: "100%",
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
                      <Title level={5} style={{ marginBottom: "0px" }}>
                        {item.nama}
                      </Title>
                      <Tooltip title={item.deskripsi}>
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
                          {item.deskripsi}
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
                        <Text style={{ color: "grey" }}>{item.tanggal}</Text>
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
                            // marginLeft: "10px",
                          }}
                        />
                        <Text style={{ color: "grey" }}>{item.waktu}</Text>
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
                        <Tooltip title={item.lokasi}>
                          <Text
                            style={{
                              color: "grey",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "190px",
                            }}
                          >
                            {item.lokasi}
                          </Text>
                        </Tooltip>
                      </Row>
                      <Text
                        style={{
                          color: item.harga != "Free" ? "#A3A3F5" : "green",
                          fontWeight: "700",
                        }}
                      >
                        {item.harga != "Free"
                          ? `Rp${item.harga}/pax`
                          : item.harga}
                      </Text>
                    </Col>
                  </Card>
                </div>
              ))}
            </Row>

            {/* F E A T U R E D  C I T I E S  S E C T I O N */}
            <div>
              <p className="ml-3 mt-8 mb-2 font-bold text-gray-600 text-xl font-sans">
                Featured Cities
              </p>
            </div>

            {/* C I T I E S  C A R D */}
            <Row gutter={0} justify="start">
              {/* Change justify to "start" */}
              {city.map((item, index) => (
                <Col
                  span={6}
                  key={index}
                  style={{ padding: "0" }}
                  onClick={() => handleItemClick(item)}
                >
                  {/* Adjust span here */}
                  <div className="group relative cursor-pointer transition-all duration-300">
                    <Card
                      hoverable="true"
                      size="small"
                      bordered={false}
                      style={{
                        textAlign: "left",
                        border: "none",
                        boxShadow: "none",
                        padding: 0,
                        margin: 2,
                        fontFamily: "Poppins, sans-serif",
                      }}
                      className="transition-all duration-200 bg-#fefdff group-hover:bg-[#c5c5fe]"
                    >
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src="https://randomuser.me/api/portraits/women/87.jpg"
                            alt="Avatar"
                          />
                          <div className="absolute inset-0 rounded-full shadow-inner" />
                        </div>
                        <div className="ml-2">
                          <p className="font-semibold text-gray-800 text-lg">
                            {item.city}
                          </p>
                          <p className="text-gray-600 text-md">
                            {item.events} Events
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Col>
              ))}
            </Row>
            {/* END C I T I E S  C A R D */}

            {/* C A T E G O R Y  S E C T I O N */}
            <div>
              <p className="ml-3 mt-8 font-bold text-gray-600 text-xl font-sans">
                Browse by Category
              </p>
            </div>

            {/* C A T E G O R Y  C A R D */}
            <Row gutter={0} justify="start">
              {category.map((item, index) => (
                <Col span={8} key={index} style={{ padding: "0px" }}>
                  <div className="group relative cursor-pointer overflow-hidden bg-white  transition-all duration-300">
                    <Card
                      hoverable="true"
                      size="small"
                      bordered={"false"}
                      style={{
                        textAlign: "left",
                        boxShadow: "none",
                        padding: 0,
                        margin: 10,
                        fontFamily: "Poppins, sans-serif",
                      }}
                      className="duration-300 group relative border-2 border-gray-100 group-hover:border-[#a3a3f5]"
                    >
                      <div className="relative z-10 mx-auto max-w-md">
                        <img
                          className="h-10 w-10 text-white transition-all rounded-full object-cover"
                          src="https://randomuser.me/api/portraits/women/87.jpg"
                          alt="Avatar"
                        />
                        <div className="font-semibold text-gray-800 text-lg pt-2 transition-all duration-300  ">
                          <p>{item.category}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-md transition-all duration-300 font-sans">
                            {item.events} Events
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Col>
              ))}
            </Row>
            {/* END C A T E G O R Y  C A R D */}
          </Col>
        </div>
      </Content>
    </>
  );
};

export default Explore;
