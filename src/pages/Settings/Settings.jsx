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
  notification,
  message
} from "antd";
import {
  GlobalOutlined,
  PictureOutlined,
  TikTokOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import "./Style.css";
import { useContext, useEffect, useState } from "react";
import {
  FacebookFilled,
  InstagramOutlined, 
} from "@ant-design/icons";
import { EmailRounded } from "@mui/icons-material";
import { AuthContext } from "../../providers/AuthProvider";
import { editDataPrivatePut, getDataPrivate } from "../../utils/api";

const { Title, Text } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

const Settings = () => {
  const [form] = Form.useForm();
  // const [api, contextHolder] = notification.useNotification();
  const [alert, setAlert] = useState(null);

  const [previewImage, setPreviewImage] = useState("");
  const [hover, setHover] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const { userProfile } = useContext(AuthContext);
  const [isImageChanged, setIsImageChanged] = useState(false);
  // const [profileImage, setProfileImage] = useState(null);

  const showAlert = (status, title, description) => {
    setAlert({ status, title, description }); // Set the alert to be triggered
  };

  useEffect(() => {
    getDataUser();
  }, [])

  useEffect(() => {
    if (alert) {
      // Trigger notification inside useEffect
      notification[alert.status]({
        message: alert.title,
        description: alert.description,
      });
      setAlert(null); // Clear the alert after showing
    }
  }, [alert]);

  const getDataUser = () => {
    getDataPrivate(`/api/v1/profile/read/${userProfile.user_logged}`)
      .then((resp) => {
        // console.log("Full Response:", resp); 
        if (resp && resp.datas) {
          // console.log("Data User:", resp.datas); 
          setDataUser(resp.datas); // Ensure this matches your response structure
          setPreviewImage(resp.datas.image_path);

          // form.setFieldsValue({
          //   name: dataUser.name || "",
          //   username: dataUser.username || "",
          //   bio: dataUser.bio || "",
          //   email: dataUser.email || "",
          //   instagram: dataUser.instagram || "",
          //   youtube: dataUser.youtube || "",
          //   tiktok: dataUser.tiktok || "",
          //   facebook: dataUser.facebook || "",
          //   website: dataUser.website || "",
          // });

          form.setFieldValue("name", resp.datas.name);
          form.setFieldValue("username", resp.datas.username);
          form.setFieldValue("bio", resp.datas.bio);
          form.setFieldValue("instagram", resp.datas.instagram);
          form.setFieldValue("email", resp.datas.email);
          form.setFieldValue("youtube", resp.datas.youtube);
          form.setFieldValue("tiktok", resp.datas.tiktok);
          form.setFieldValue("facebook", resp.datas.facebook);
          form.setFieldValue("website", resp.datas.website);

          console.log(resp.datas);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };



  const handleUpload = ({ file }) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return;
    }

    // Preview the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result); // Set preview image
      setIsImageChanged(true);
    };
    reader.readAsDataURL(file);
  };


  const handlePreview = (file) => {
    // This can be used if you want to preview a file before upload, 
    // but here handleUpload already does the preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result); // Set preview image
      setIsImageChanged(true);
    };
    reader.readAsDataURL(file);
  };

  // Handle form changes
  // const handleFormChange = (field, value) => {
  //   setDataUser((prev) => ({ ...prev, [field]: value }));
  // };

  const handleEditProfile = async () => {
    const formValues = form.getFieldsValue(true); // Get all form values
    const formData = new FormData();

    // Append form values
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value || ""); // Append non-empty values
    });

    // Append image if it is changed
    if (isImageChanged && previewImage) {
      const file = dataURLtoFile(previewImage, "profile-image.png");
      formData.append("image", file);
    }

    try {
      const response = await editDataPrivatePut(`/api/v1/profile/update/${userProfile.user_logged}`, formData);

      if (response?.message === "Profile updated successfully") {
        showAlert("success", "Success", "Your data has been updated.");
        getDataUser(); // Refresh user data
        setPreviewImage(dataUser.image_path);
      } else {
        const errorMessage = response?.message || "Failed to update your data.";
        showAlert("error", "Failed", errorMessage);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showAlert("error", "Error", "An unexpected error occurred.");
    }
  };


  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
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
          style={{ width: "100%", fontFamily: "Poppins, sans-serif" }}
          className="custom-tabs"
        >
          <TabPane tab="Profile" key="1">
            <Title level={3} style={{ marginBottom: "0px" }}>
              Your Profile
            </Title>
            <Text style={{ fontSize: "16px", color: "gray" }}>
              Adjust how your profile wants to be seen
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
                  marginRight: "40px",
                }}
              >
                <Form
                  form={form}
                  layout="vertical"
                  style={{ maxWidth: "300px", width: "100%" }}
                // name="name"
                // form={form}
                >
                  <Form.Item
                    name="name"
                    label={
                      <span
                        style={{
                          color: "#535353",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        Nama
                      </span>
                    }
                  >
                    <Input
                      placeholder="Masukkan Namamu"
                    // defaultValue={`${dataUser?.name}` || ""}
                    // value={dataUser?.name}
                    // onChange={(e) => handleFormChange("name", e.target.value)}
                    // onChange={}
                    />
                  </Form.Item>
                  <Form.Item
                    name="username"
                    label={
                      <span
                        style={{
                          color: "#535353",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        Username
                      </span>
                    }
                  >
                    <Input
                      prefix="@"
                      placeholder="Enter your username"
                    // defaultValue={`${dataUser?.username}` || ""}
                    // value={dataUser?.username}
                    // onChange={(e) => handleFormChange("username", e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="bio"
                    label={
                      <span
                        style={{
                          color: "#535353",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        Bio
                      </span>
                    }
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder="Share a little about your background and interests."
                    // defaultValue={`${dataUser?.bio}` || ""}
                    // value={dataUser.bio}
                    // onChange={(e) => handleFormChange("bio", e.target.value)}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  position: "relative",
                  // marginLeft: "10px",
                  maxHeight: "300px",
                  height: "100%",
                  zIndex: 0,
                }}
              >
                {/* Wrapper for Avatar and Button */}
                <Text style={{ marginBottom: "8px" }}>Profile Picture</Text>
                <Avatar
                  size={128}
                  src={isImageChanged ? previewImage : `${REACT_APP_API_URL}/${previewImage}`}
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
                      right: "0px",
                    }}
                  />
                </Upload>
              </div>
            </Row>
            {/* SOCIAL SETTINGS */}
            <Text style={{ fontSize: "16px", color: "gray" }}>
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
                  marginRight: "40px",
                }}
              >
                <Form form={form}>
                  {/* INSTAGRAM */}
                  <Form.Item
                    name="instagram"
                    label={
                      <InstagramOutlined
                        style={{ fontSize: "24px", color: "grey" }}
                      />
                    }
                    colon={false}
                  >
                    <Input
                      style={{
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        // border: "1px solid #d9d9d9",
                        borderRadius: "8px",
                        fontFamily: "Poppins, sans-serif",
                      }}
                      addonBefore="instagram.com/"
                      placeholder="username"
                    />
                  </Form.Item>

                  {/* EMAIL */}
                  <Form.Item
                    name="email"
                    label={
                      <EmailRounded
                        style={{ fontSize: "24px", color: "grey" }}
                      />
                    }
                    colon={false}
                  >
                    <Input
                      style={{
                        // backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        // border: "1px solid #d9d9d9",
                        borderRadius: "8px",
                        fontFamily: "Poppins, sans-serif",
                      }}
                      // addonBefore="instagram.com/"
                      placeholder="Your Email"
                    />
                  </Form.Item>

                  {/* FACEBOOK */}
                  <Form.Item
                    name="facebook"
                    label={
                      <FacebookFilled
                        style={{ fontSize: "24px", color: "grey" }}
                      />
                    }
                    colon={false}
                  >
                    <Input
                      style={{
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        // border: "1px solid #d9d9d9",
                        borderRadius: "8px",
                        fontFamily: "Poppins, sans-serif",
                      }}
                      addonBefore="facebook.com/"
                      placeholder="username"
                    />
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
                  marginRight: "30px",
                }}
              >
                <Form form={form}>
                  {/* TIKTOK */}
                  <Form.Item
                    name="tiktok"
                    label={
                      <TikTokOutlined
                        style={{ fontSize: "24px", color: "grey" }}
                      />
                    }
                    colon={false}
                  >
                    <Input
                      style={{
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        // border: "1px solid #d9d9d9",
                        borderRadius: "8px",
                        fontFamily: "Poppins, sans-serif",
                      }}
                      addonBefore="tiktok.com/@"
                      placeholder="username"
                    />
                  </Form.Item>

                  {/* YOUTUBE */}
                  <Form.Item
                    name="youtube"
                    label={
                      <YoutubeFilled
                        style={{ fontSize: "24px", color: "grey" }}
                      />
                    }
                    colon={false}
                  >
                    <Input
                      style={{
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        // border: "1px solid #d9d9d9",
                        borderRadius: "8px",
                        fontFamily: "Poppins, sans-serif",
                      }}
                      addonBefore="youtube.com/@"
                      placeholder="username"
                    />
                  </Form.Item>

                  {/* WEBSITE */}
                  <Form.Item
                    name="website"
                    label={
                      <GlobalOutlined
                        style={{ fontSize: "24px", color: "grey" }}
                      />
                    }
                    colon={false}
                  >
                    <Input
                      style={{
                        // backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        // border: "1px solid #d9d9d9",
                        borderRadius: "8px",
                        fontFamily: "Poppins, sans-serif",
                      }}
                      // addonBefore="facebook.com/"
                      placeholder="Your Website"
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>

            {/* SAVE BUTTON */}
            <Button
              style={{ height: "32px", fontFamily: "Poppins, sans-serif" }}
              className="text-[16px] mt-5 bg-gradient-to-r from-[#A594F9] to-[#E4B1F0] text-white font-semibold py-2 rounded-md hover:bg-[#CB9DF0] hover:text-purple-600 transition duration-300"
              variant="solid"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={handleEditProfile}
            >
              Save Changes
            </Button>
          </TabPane>
        </Tabs>
      </Row>
    </Content>
  );
};

export default Settings;
