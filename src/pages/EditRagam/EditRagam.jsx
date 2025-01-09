import { useState, useContext, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  FloatButton,
  Upload,
  message,
  Form,
  Input,
  DatePicker,
  Space,
  Button,
  Typography,
  Select,
  Segmented,
  Layout,
  TimePicker,
  Switch,
} from "antd";
import { PictureOutlined, UndoOutlined } from "@ant-design/icons";
import defaultImage from "../../assets/images/hero.png";
import "./style.css";
import moment from "moment-timezone";
import dayjs from "dayjs";
import { AuthContext } from "../../providers/AuthProvider";

import LocationPicker from "../../components/LocationPicker";
import { getData, sendDataPrivate } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
// import moment from "moment";

const { Content } = Layout;
const { Option } = Select;
const { Search } = Input;
const { Text } = Typography;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EditRagam = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  // const defaultImage = "https://via.placeholder.com/350";
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const [previewImage, setPreviewImage] = useState("");
  const [isImageChanged, setIsImageChanged] = useState(false);
  const { RangePicker } = DatePicker;
  const placement = "bottomRight";
  const [selectedTimezone, setSelectedTimezone] = useState("Asia/Jakarta");
  const [searchQuery, setSearchQuery] = useState("");
  const timezones = moment.tz.names();
  const [isPricingDisabled, setIsPricingDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [time, setTime] = useState(null);
  const { userProfile } = useContext(AuthContext);

  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    address: "",
  });
  const [isAllowed, setIsAllowed] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isFree, setIsFree] = useState(1);
  const [isPublic, setIsPublic] = useState(1);
  const [approvalStatus, setApprovalStatus] = useState(0);

  const { id } = useParams();
  const [dataSource, setDataSource] = useState([]);


  const handleButtonClick = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    getDataRagam();
  }, []);

  const getDataRagam = async () => {
    try {
      const response = await getData(`/api/v1/ragam/specific/${id}`);
      if (response && response.datas) {
        const ragam = response.datas;
        // Populate form fields and states with fetched data
        form.setFieldsValue({
          title: ragam.title,
          description: ragam.description,
          location: ragam.location,
          price: ragam.price,
          capacity: ragam.capacity,
        });
        setImageUrl(ragam.image_path);
        setPreviewImage(ragam.image_path);
        setIsPublic(ragam.is_public);
        setApprovalStatus(ragam.requires_approval);
        setLocation({
          lat: ragam.lat,
          lng: ragam.lng,
          address: ragam.location,
        });
        setStartTime(ragam.start_time);
        setEndTime(ragam.end_time);
      }
    } catch (error) {
      console.error("Error fetching ragam data:", error);
      message.error("Failed to fetch ragam data.");
    }
  };

  const publicSegmentChange = (value) => {
    // Update isAllowed based on the selected value
    setIsPublic(value === "Public" ? 1 : 0);
  };

  const handleSwitchChange = (checked) => {
    const newStatus = checked ? 1 : 0; // 1 for "needs approval", 0 for "does not need approval"
    setApprovalStatus(newStatus);
    console.log("Need approval value:", newStatus);
  };

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      // Update the start and end times in YYYY-MM-DD HH:mm:ss format
      setStartTime(dayjs(dates[0]).format("YYYY-MM-DD HH:mm:ss"));
      setEndTime(dayjs(dates[1]).format("YYYY-MM-DD HH:mm:ss"));
    } else {
      setStartTime(null);
      setEndTime(null);
    }
  };


  const handlePreview = async (file) => {
    try {
      const preview = await getBase64(file.originFileObj || file); // Convert file to base64
      setPreviewImage(preview); // Optional: Store the previewed image
      setImageUrl(preview); // Update the background image
    } catch (error) {
      console.error("Error generating preview:", error);
      message.error("Failed to preview the image");
    }
  };

  const onFreeChange = (value) => {
    if (value === "Paid") {
      setIsPricingDisabled(false); // Enable price field for Paid
    } else {
      setIsPricingDisabled(true); // Disable price field for Free
      form.setFieldsValue({ price: "" }); // Clear the price field when Free is selected
    }
  };

  const filteredTimezones = timezones
    .filter((timezone) =>
      timezone.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((timezone) => {
      // Get the GMT offset and format it
      const offset = moment.tz(timezone).format("Z");
      return { timezone, offset };
    });

  const handleSelect = (value) => {
    setSelectedTimezone(value);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };


  const handleUpload2 = async (info) => {
    const file = info.file.originFileObj || info.file;
    if (file && file.type.startsWith("image/")) {
      try {
        const base64Image = await getBase64(file); // Convert file to base64
        setImageUrl(base64Image); // Update the image background
      } catch (error) {
        console.error("Error uploading the image:", error);
        message.error("Failed to upload image");
      }
    } else {
      message.error("You can only upload image files!");
    }
  };

  const handlePreview2 = (file) => {
    // This can be used if you want to preview a file before upload, 
    // but here handleUpload already does the preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result); // Set preview image
      setIsImageChanged(true);
    };
    reader.readAsDataURL(file);
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

  const handleUpload = async (info) => {
    const file = info.file.originFileObj || info.file;

    if (file && file.type.startsWith("image/")) {
      try {
        const base64Image = await getBase64(file); // Convert file to base64
        setImageUrl(base64Image); // Update the image background
      } catch (error) {
        console.error("Error uploading the image:", error);
        message.error("Failed to upload image");
      }
    } else {
      message.error("You can only upload image files!");
    }
  };

  const resetToDefaultImage = () => {
    setImageUrl(defaultImage);
  };

  const handleLocationChange = ([lat, lng, address]) => {
    setLocation({ lat, lng, address }); // Update the location state
  };

  // const onFinish = (values) => {
  //   console.log("Form Submitted: ", values);
  // };

  const onFinish = async (values) => {
    let formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("created_by", userProfile.id);
    formData.append("is_public", isPublic);
    formData.append("requires_approval", approvalStatus);
    formData.append("start_time", startTime);
    formData.append("end_time", endTime);
    formData.append("location", location.address);
    formData.append("lat", location.lat);
    formData.append("lng", location.lng);

    if (values.price) formData.append("price", values.price);
    if (values.capacity) formData.append("capacity", values.capacity);

    if (isImageChanged && previewImage) {
      const file = dataURLtoFile(previewImage, `${values.title}-cover.png`);
      formData.append("image", file);
    }

    try {
      const result = await sendDataPrivate("/api/v1/ragam/update", formData); // Your API call logic
      if (result?.message === "Updated") {
        message.success("Ragam updated successfully!");
        navigate("/host");
      } else {
        message.error(result.message || "Failed to update ragam.");
      }
    } catch (err) {
      console.error("Error updating ragam:", err);
      message.error("An error occurred. Please try again.");
    }
  };





  return (
    <>
      <Content>
        <div className="container min-h-[600px] flex-center ">
          <Row
            gutter={[24, 0]}
            style={{ padding: "0 20px", marginTop: "72px" }}
          >
            <Col
              xs={24}
              sm={24}
              md={8}
              lg={8}
              xl={8}
              className="mb-24"
            // style={{ marginRight: "2px" }}
            >
              {/* RAGAM COVER IMAGE */}
              <Card
                bordered={false}
                className="circlebox h-full w-full flex"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "350px",
                  width: "350px",
                  position: "relative",
                }}
              >
                {/* Upload Button */}
                <Upload
                  showUploadList={false}
                  onChange={handleUpload}
                  beforeUpload={(file) => {
                    const isImage = file.type.startsWith("image/");
                    if (isImage) {
                      return false;
                    }
                    message.error("You can only upload image files!");
                    return false;
                  }}
                >
                  <FloatButton
                    tooltip={<div>Upload Image</div>}
                    type="default"
                    icon={<PictureOutlined />}
                    style={{
                      zIndex: 0,
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                    }}
                  />
                </Upload>


                {/* Reset to Default Button */}
                <FloatButton
                  tooltip={<div>Reset to Default</div>}
                  type="default"
                  icon={<UndoOutlined />}
                  onClick={resetToDefaultImage}
                  style={{
                    zIndex: 0,
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                  }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={16} className="mb-24">
              <Card>
                <Form form={form} onFinish={onFinish}>
                  <Segmented
                    options={["Public", "Private"]}
                    onChange={publicSegmentChange}
                    style={{ marginTop: "10px", color: "#6C6CC6", alignItems: "left" }}
                    value={isPublic === 1 ? "Public" : "Private"} // Bind to state
                  />

                  <Switch
                    style={{ marginLeft: "20px" }}
                    checked={approvalStatus === 1} // Bind to state
                    onChange={handleSwitchChange}
                  /><Text style={{ marginLeft: "10px" }}>Needs Approval</Text>
                </Form>
                <Form form={form} onFinish={onFinish}>
                <Form.Item
                  name="title"
                  rules={[{ required: true, message: "Please input event name!" }]}
                >
                  <Input placeholder="Event Name" />
                </Form.Item>
                </Form>
                <Form
                  layout="vertical"
                  // name="event-desc"
                  form={form}
                  variant="filled"
                  onFinish={onFinish}
                  size="large"
                // onFinish={onFinish}
                >
                  <Form.Item
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Please input description!",
                      },
                    ]}
                  >
                    <Input placeholder="Add Description" />
                  </Form.Item>
                </Form>
                <Row gutter={[16, 16]}>
                  <Col xs={10} sm={10} md={10} lg={14} xl={14}>
                    <Form form={form} onFinish={onFinish}>
                      <Space direction="vertical" size={12}>
                        <RangePicker
                          showTime
                          style={{
                            marginBottom: "24px",
                            fontFamily: "Poppins, sans-serif",
                          }}
                          size="large"
                          onChange={onRangeChange} // Update start and end times on change
                        />
                      </Space>
                    </Form>
                  </Col>
                  {/* <Col xs={4} sm={4} md={8} lg={8} xl={8}>
                    <Space direction="vertical" size={14}>
                      <Select
                        showSearch
                        dropdownStyle={{ color: "black" }}
                        className="custom-select"
                        value={selectedTimezone}
                        onSearch={handleSearch}
                        onChange={handleSelect}
                        style={{ width: 250, color: "black" }}
                        size="large"
                        placeholder="Search and select timezone"
                        filterOption={false}
                        rules={[
                          {
                            required: true,
                            message: "Please select timezone!!",
                          },
                        ]}
                      >
                        {filteredTimezones.map(({ timezone, offset }) => (
                          <Option key={timezone} value={timezone}>
                            {`${timezone} (GMT${offset})`}
                          </Option>
                        ))}
                      </Select>
                    </Space>
                  </Col> */}
                </Row>
                <div className="content">
                  <Typography.Title level={5}>Select Location</Typography.Title>
                  <Form onFinish={onFinish} style={{ fontFamily: "Poppins, sans-serif" }} form={form}>
                    {/* <Form.Item
                      name="location"
                      rules={[
                        {
                          required: true,
                          message: "Please select a location!",
                        },
                      ]}
                    >
                      <LocationPicker
                        onLocationChange={(location) =>
                          form.setFieldsValue({ location })
                        }
                      />

                      <LocationPicker onLocationChange={handleLocationChange} />
                    </Form.Item> */}
                    <Form.Item
                      name="location"
                      rules={[
                        {
                          required: true,
                          message: "Please select a location!",
                        },
                      ]}
                    >
                      {/* <LocationPicker onLocationChange={(location) => form.setFieldsValue({ location })} /> */}
                      <LocationPicker onLocationChange={handleLocationChange} />
                    </Form.Item>
                  </Form>

                </div>
                <Typography.Title level={5}>Event Options</Typography.Title>
                <Form form={form} onFinish={onFinish} layout="vertical" size="large">
                  <Segmented
                    options={["Free", "Paid"]}
                    onChange={onFreeChange}
                    style={{
                      marginBottom: "10px",
                      tabSize: "large",
                      color: "#6C6CC6",
                      alignItems: "left",
                    }}
                  />
                </Form>
                <Form
                  layout="vertical"
                  // name="price"
                  form={form}
                  variant="filled"
                  onFinish={onFinish}
                  size="large"
                >
                  <Form.Item
                    name="price"
                    rules={[
                      {
                        pattern: /^[0-9]*$/, // Only allow numeric values
                        message: "Price must be a number",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Input Price"
                      disabled={isPricingDisabled} // Disable based on the segmented value
                    />
                  </Form.Item>
                </Form>
                <Form
                  layout="vertical"
                  // name="capacity"
                  form={form}
                  variant="filled"
                  onFinish={onFinish}
                  size="large"
                >
                  <Form.Item
                    name="capacity"
                    rules={[
                      { required: true, message: "Please select location!" },
                    ]}
                  >
                    <Input placeholder="Input Capacity" type="number" />
                  </Form.Item>
                </Form>

                {/* <Space direction="vertical" style={{ width: "100%" }}>
                  <Button
                    htmlType="submit"
                    style={{ height: "42px" }}
                    className="text-[20px] w-full mt-5 bg-gradient-to-r from-[#A594F9] to-[#E4B1F0] text-white font-semibold py-2 rounded-md hover:bg-[#CB9DF0] hover:text-purple-600 transition duration-300 font-sans"
                    onClick={onFinish}
                  >
                    Create Event
                  </Button>
                </Space> */}
                <Form
                  onFinish={onFinish}
                >
                  <Button
                    htmlType="submit"
                    style={{ height: "42px" }}
                    className="text-[20px] w-full mt-5 bg-gradient-to-r from-[#A594F9] to-[#E4B1F0] text-white font-semibold py-2 rounded-md hover:bg-[#CB9DF0] hover:text-purple-600 transition duration-300 font-sans"
                  // onClick={onFinish}
                  >
                    Create Event
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </>
  );
};

export default EditRagam;
