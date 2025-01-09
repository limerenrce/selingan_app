import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Layout,
  Typography,
  Segmented,
  Tooltip,
  Image,
} from "antd";
// import { ellipsisGenerator } from "../../utils/ui";
// import Image from "../../assets/images/logo.png";
import {
  AccessTimeRounded,
  EventRounded,
  LocationOnRounded,
} from "@mui/icons-material";
import { AuthContext } from "../../providers/AuthProvider";
import { editDataPrivatePut, getData } from "../../utils/api";
import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";

const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const { Content } = Layout;
const { Text, Title } = Typography;

const Host = () => {
  const [selectedSegment, setSelectedSegment] = useState("Upcoming");
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate("/event-detail");
  };

  useEffect(() => {
    getDataRagam();
    // getDataUser();
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

  const filteredData = dataSource.filter((item) => {
    if (selectedSegment === "Upcoming") {
      return item.is_active == 1 && item.created_by == userProfile.user_logged;
    } else if (selectedSegment === "Past") {
      return item.is_active == 0 && item.created_by == userProfile.user_logged;
    }
    return false; // Default case if the segment doesn't match "Upcoming" or "Past"
  });

  const handleEditClick = (item) => {
    navigate(`/edit-ragam/${item}`);
  };

  const handleDeleteRagam = async (item) => {
    try {
      const response = await editDataPrivatePut(`/api/v1/ragam/delete/${item}`);
      if (response?.message === "Ragam deleted successfully") {
        // showAlert("success", "Success", "Your data has been updated.");
        getDataRagam(); // Refresh user data
        // setPreviewImage(dataUser.image_path);
        console.log("Message: ", response)
      } else {
        // const errorMessage = response?.message || "Failed to update your data.";
        // showAlert("error", "Failed", errorMessage);
        console.log("Message: ", response)
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // showAlert("error", "Error", "An unexpected error occurred.");
    
    }
  }

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
              <h1 className="font-bold text-grey-800 text-4xl">Host</h1>
              <p className="mt-3 text-grey-200 text-lg">
                Explore the events that you have hosted previously, both the
                upcoming and the past events!
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
                  <div className="group relative   transition-all duration-300">
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
                      actions={[
                        <EditOutlined key="edit" onClick={() => handleEditClick(item.id)} />,
                        <DeleteOutlined key="delete"  onClick={() => handleDeleteRagam(item.id)}/>,
                      ]}
                    >
                      <Col style={{ gap: "10px", maxWidth: "300px" }}>
                        <Image
                          style={{
                            borderRadius: "5%",
                            objectFit: "cover",
                            width: "300px",
                            height: "150px",
                          }}
                          src={`${REACT_APP_API_URL}/${item.image_path}`}
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
                          <Text style={{ color: "grey" }}>
                            {new Date(item.start_time).toLocaleDateString("en-ID", {
                              weekday: "short", // e.g., Sun
                              day: "2-digit",   // e.g., 03
                              month: "short",   // e.g., Nov
                              year: "numeric",  // e.g., 2024
                            })}
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
                          <AccessTimeRounded
                            style={{
                              fontSize: "18",
                              color: "grey",
                              // marginLeft: "10px",
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
                                maxWidth: "175px",
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

export default Host;
