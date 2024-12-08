import {
  Col,
  Row,
  Typography,
  Layout,
  Tabs,
  Form,
  Input,
  Avatar,
  Upload,
  FloatButton,
  Button,
} from "antd";
import { GlobalOutlined, PictureOutlined, TikTokOutlined, YoutubeFilled } from "@ant-design/icons";
import "./Style.css";
import { useState } from "react";
import {
  FacebookFilled,
  InstagramOutlined,
  XOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Settings = () => {
  const [previewImage, setPreviewImage] = useState("");
  const [hover, setHover] = useState(false);

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result);
      reader.readAsDataURL(info.file.originFileObj);
    } else if (info.file.status === "error") {
      message.error("Failed to upload image");
    }
  };

  const handlePreview = async (file) => {
    console.log("want to know the file", file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file);
    }
    console.log(file.url);
    console.log(file.preview);
    setPreviewImage(file.url || file.preview);
  };


  return (
    <Content
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        padding: "24px",
        marginTop: "60px",
      }}
    >
      {/* <Col style={{maxWidth:"1000px", width:"100%"}}> */}
      <Row
        gutter={[24, 0]}
        style={{
          maxWidth: "840px",
          width: "100%",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <Title level={2} style={{ marginBottom: "0px" }}>
          Settings
        </Title>
        {/* <Divider style={{ margin: '16px 0', width: '100vw', position: 'relative', left: 'calc(-50vw + 50%)', right:"calc(-50vw + 50%)" }} /> */}
        <Tabs
          defaultActiveKey="1"
          style={{ width: "100%" }}
          className="custom-tabs"
        >
          <TabPane tab="Profile" key="1">
            <Title level={3} style={{ marginBottom: "0px" }}>
              Profilmu
            </Title>
            <Text style={{ fontSize: "16px", color: "gray" }}>
              Atur bagaimana akunmu dilihat oleh orang lain
            </Text>
            <Row
              gutter={[24, 0]}
              style={{
                maxWidth: "700px",
                width: "100%",
                padding: "12px",
                borderRadius: "5px",
              }}
            >
              <Col
                style={{
                  maxWidth: "300px",
                  width: "100%",
                  margin: "0px",
                  padding: "0px",
                  marginRight: "40px"
                }}
              >
                <Form
                  layout="vertical"
                  style={{ maxWidth: "300px", width: "100%" }}
                >
                  <Form.Item label={
                    <span style={{ color: "#535353" }}> Nama </span>
                  }>
                    <Input
                      placeholder="Masukkan Namamu"
                      defaultValue="Kevala Pottery Studio"
                    />
                  </Form.Item>
                  <Form.Item label={
                    <span style={{ color: "#535353" }}> Username </span>
                  }>
                    <Input
                      prefix="@"
                      placeholder="Enter your username"
                      defaultValue="kevalastudiobali"
                    />
                  </Form.Item>
                  <Form.Item label={
                    <span style={{ color: "#535353" }}> Bio </span>
                  }>
                    <Input.TextArea
                      rows={4}
                      placeholder="Share a little about your background and interests."
                    />
                  </Form.Item>
                </Form>
              </Col>
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                position: "relative",
                // marginLeft: "10px",
                maxHeight: "300px",
                height: "100%",
                zIndex: 0
              }}> {/* Wrapper for Avatar and Button */}
                <Text style={{ marginBottom: "8px" }}>Profile Picture</Text>
                <Avatar
                  size={128}
                  src={previewImage}
                  style={{ marginBottom: "16px" }}
                />
                <Upload
                  showUploadList={false}
                  onChange={handleUpload}
                  onPreview={handlePreview}
                  beforeUpload={(file) => {
                    const isImage = file.type.startsWith("image/");
                    console.log(file);
                    handlePreview(file);
                    if (!isImage) {
                      message.error("You can only upload image files!");
                    }
                    return false;
                  }}
                >
                  <FloatButton
                    tooltip={<div>Upload Image</div>}
                    type="default"
                    icon={<PictureOutlined />}
                    style={{
                      position: "absolute",
                      top: "calc(35% + 55px)",
                      right: "0px"
                    }}
                  />
                </Upload>
              </div>
            </Row>
            {/* SOCIAL SETTINGS */}
            <Text style={{ fontSize: "16px", color: "gray", }}>
              Social Links
            </Text>
            <Row
              gutter={[24, 0]}
              style={{
                maxWidth: "700px",
                width: "100%",
                padding: "12px",
                borderRadius: "5px",
              }}
            >
              {/* LEFT SIDE */}
              <Col
                style={{
                  maxWidth: "300px",
                  width: "100%",
                  margin: "0px",
                  padding: "0px",
                  marginRight: "40px"
                }}
              >
                <Form
                  layout="horizontal"
                  style={{ maxWidth: "400px", width: "100%" }}
                >
                  {/* INSTA */}
                  <Form.Item
                    label={<InstagramOutlined style={{ fontSize: "24px", color: "grey" }} />}
                    colon={false}
                  >
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid #d9d9d9", borderRadius: "8px" }}>
                      <span
                        style={{
                          backgroundColor: "#f0f0f0",
                          padding: "0 8px",
                          lineHeight: "32px",
                          color: "grey",
                          borderRadius: "7px 0 0 7px",
                        }}
                      >
                        instagram.com/
                      </span>
                      <Input
                        placeholder="username"
                        style={{
                          border: "none",
                          boxShadow: "none",
                        }}
                      />
                    </div>
                  </Form.Item>

                  {/* TWITTER */}
                  <Form.Item
                    label={<XOutlined style={{ fontSize: "20px", color: "grey", marginRight: "4px" }} />}
                    colon={false}
                  >
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid #d9d9d9", borderRadius: "8px" }}>
                      <span
                        style={{
                          backgroundColor: "#f0f0f0",
                          padding: "0 8px",
                          lineHeight: "32px",
                          color: "grey",
                          borderRadius: "7px 0 0 7px",
                        }}
                      >
                        x.com/
                      </span>
                      <Input
                        placeholder="username"
                        style={{
                          border: "none",
                          boxShadow: "none",
                        }}
                      />
                    </div>
                  </Form.Item>

                  {/* FACEBOOK */}
                  <Form.Item
                    label={<FacebookFilled style={{ fontSize: "24px", color: "grey", borderRadius: "5px" }} />}
                    colon={false}
                  >
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid #d9d9d9", borderRadius: "8px" }}>
                      <span
                        style={{
                          backgroundColor: "#f0f0f0",
                          padding: "0 8px",
                          lineHeight: "32px",
                          color: "grey",
                          borderRadius: "7px 0 0 7px",
                        }}
                      >
                        facebook.com/
                      </span>
                      <Input
                        placeholder="username"
                        style={{
                          border: "none",
                          boxShadow: "none",
                        }}
                      />
                    </div>
                  </Form.Item>
                </Form>
              </Col>

              {/* RIGHT SIDE */}
              <Col
                style={{
                  maxWidth: "300px",
                  width: "100%",
                  margin: "0px",
                  padding: "0px",
                  marginRight: "30px"
                }}
              >
                <Form
                  layout="horizontal"
                  style={{ maxWidth: "400px", width: "100%" }}
                >
                  {/* TIKTOK */}
                  <Form.Item
                    label={<TikTokOutlined style={{ fontSize: "20px", color: "grey", marginRight: "4px" }} />}
                    colon={false}
                  >
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid #d9d9d9", borderRadius: "8px" }}>
                      <span
                        style={{
                          backgroundColor: "#f0f0f0",
                          padding: "0 8px",
                          lineHeight: "32px",
                          color: "grey",
                          borderRadius: "7px 0 0 7px",
                        }}
                      >
                        tiktok.com/@
                      </span>
                      <Input
                        placeholder="username"
                        style={{
                          border: "none",
                          boxShadow: "none",
                        }}
                      />
                    </div>
                  </Form.Item>

                  {/* YOUTUBE */}
                  <Form.Item
                    label={<YoutubeFilled style={{ fontSize: "20px", color: "grey", marginRight: "4px" }} />}
                    colon={false}
                  >
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid #d9d9d9", borderRadius: "8px" }}>
                      <span
                        style={{
                          backgroundColor: "#f0f0f0",
                          padding: "0 8px",
                          lineHeight: "32px",
                          color: "grey",
                          borderRadius: "7px 0 0 7px",
                        }}
                      >
                        youtube.com/@
                      </span>
                      <Input
                        placeholder="username"
                        style={{
                          border: "none",
                          boxShadow: "none",
                        }}
                      />
                    </div>
                  </Form.Item>

                  {/* WEB */}
                  <Form.Item
                    label={<GlobalOutlined style={{ fontSize: "20px", color: "grey", marginRight: "4px" }} />}
                    colon={false}
                  >
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid #d9d9d9", borderRadius: "8px" }}>
                      {/* <span
                        style={{
                          backgroundColor: "#f0f0f0", // Gray background for the prefix
                          padding: "0 8px",
                          lineHeight: "32px",
                          color: "grey",
                          borderRadius: "7px 0 0 7px", // Rounded left corners
                          // borderRight: "1px solid #d9d9d9", // Border separating prefix from input
                        }}
                      >
                        facebook.com/
                      </span> */}
                      <Input
                        placeholder="Your Website"
                        style={{
                          border: "none",
                          boxShadow: "none",
                        }}
                      />
                    </div>
                  </Form.Item>
                </Form>
              </Col>
            </Row>

            {/* SAVE BUTTON */}
            <Button
              style={{
                background: hover ? "#c5c5fe" : "#a3a3f5",
                fontWeight: "bolder",
                color: "black",
              }}
              variant="solid"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Save Changes
            </Button>
          </TabPane>
          {/* <TabPane tab="test" key="2"></TabPane> */}
        </Tabs>
      </Row>
      {/* </Col> */}
      {/* <Divider
            style={{
              position: "absolute",
              top: "130px", // Adjust based on the distance from "Profile Settings"
              left: 0,
              width: "100%",
            }}
          /> */}
    </Content>
  );
};

export default Settings;
