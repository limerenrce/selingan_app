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
  }, [])
  useEffect(() => {
    form.setFieldsValue({
      is_public: isPublic === 1 ? "Public" : "Private",
      requires_approval: approvalStatus,
    });
  }, [isPublic, approvalStatus]);

  useEffect(() => {
    console.log("Fetched data:", dataSource);
  }, [dataSource]);

  const getDataRagam = () => {
    getData(`/api/v1/ragam/specific/${id}`)
      .then((resp) => {
        if (resp && resp.datas && resp.datas.length > 0) {
          const data = resp.datas[0]; // Access the first object in the array

          // Destructure the fields
          const { title, description, capacity, price, image_path, is_free, is_public, requires_approval } = data;

          // Update state
          setDataSource(data);
          setPreviewImage(image_path || defaultImage);
          setIsFree(is_free);
          setIsPublic(is_public);
          setApprovalStatus(requires_approval);
          setLocation(location.address, location.lat, location.lng)

          // Populate the form
          form.setFieldsValue({
            title,
            description,
            capacity,
            price,
          });

          const { start_time, end_time } = data;

          // Convert ISO strings to Moment objects (if using Moment.js)
          const formattedStartTime = start_time ? moment(start_time) : null;
          const formattedEndTime = end_time ? moment(end_time) : null;

          // Set form values for the RangePicker
          form.setFieldsValue({
            range: [formattedStartTime, formattedEndTime], // 'range' matches the Form.Item name
          });

          // Update component state if needed
          setStartTime(formattedStartTime);
          setEndTime(formattedEndTime);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
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

  const onRangeChange = (values) => {
    if (values) {
      const [start, end] = values;
      setStartTime(start);
      setEndTime(end);
  
      // Update the form values
      form.setFieldsValue({
        range: values,
      });
    } else {
      // Reset state and form if no values are selected
      setStartTime(null);
      setEndTime(null);
      form.resetFields(["range"]);
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


  const handleUpload2 = ({ file }) => {
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

  useEffect(() => {
    getDataRagam();
  }, []);

  // const onFinish = (values) => {
  //   console.log("Form Submitted: ", values);
  // };

  const onFinish = async (values) => {
    let title = form.getFieldValue("title");
    let price = form.getFieldValue("price");
    let capacity = form.getFieldValue("capacity");
    let description = form.getFieldValue("description");

    const formData = new FormData();

    // Required fields
    formData.append("title", title); // Event name
    formData.append("description", description);
    formData.append("created_by", userProfile.id); // Replace with the actual user ID
    formData.append("is_allowed", isAllowed);
    formData.append("start_time", startTime); // Append start_time
    formData.append("end_time", endTime);
    formData.append("is_free", isFree);
    formData.append("is_public", isPublic);
    formData.append("price", price);
    formData.append("capacity", capacity);
    formData.append("location", location.address);
    formData.append("long", location.lng);
    formData.append("lat", location.lat);
    formData.append("requires_approval", approvalStatus);

    // Handle optional fields
    if (values.location_name) formData.append("location", values.location_name);
    if (values.capacity) formData.append("capacity", values.capacity);
    formData.append("is_active", 1); // Example default value
    formData.append("is_free", isPricingDisabled ? 1 : 0);
    if (!isPricingDisabled && values.price) formData.append("price", values.price);

    // Image handling
    if (isImageChanged && previewImage) {
      // User uploaded a new image
      // const file = dataURLtoFile(previewImage, "uploaded-image.png");
      const file = dataURLtoFile(previewImage, `${title}-cover.png`);
      formData.append("image", file);
    } else {
      // Use the default image URL to create a file object
      const fetchDefaultImage = async () => {
        try {
          const response = await fetch(defaultImage);
          const blob = await response.blob();
          const defaultFile = new File([blob], "default-image.png", { type: blob.type });
          formData.append("image", defaultFile);
        } catch (error) {
          console.error("Error fetching default image:", error);
        }
      };

      await fetchDefaultImage();
    }


    try {
      const result = await sendDataPrivate("/api/v1/ragam/create", formData); // Your API call logic
      if (result?.message === "Inserted") {
        message.success("Event created successfully!");
        navigate("/host");
      } else {
        message.error(result.message || "Failed to create event.");
      }
    } catch (err) {
      console.error("Error creating event:", err);
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
                  onChange={handleUpload2}
                  onPreview={handlePreview2}
                  beforeUpload={(file) => {
                    const isImage = file.type.startsWith("image/");
                    if (isImage) {
                      handlePreview(file);
                      return false; // Prevent the upload action, as we're handling it in preview
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
                    value={isPublic === 1 ? "Public" : "Private"} // Controlled by state
                    onChange={(value) => {
                      setIsPublic(value === "Public" ? 1 : 0); // Update state
                    }}
                  />

                  <Switch
                    checked={approvalStatus === 1} // Controlled by state
                    onChange={(checked) => setApprovalStatus(checked ? 1 : 0)}
                    style={{ marginLeft: "20px" }}
                  />
                  <Text style={{ marginLeft: "10px" }}>Needs Approval</Text>
                </Form>
                <Form
                  layout="vertical"
                  // name="event_name"
                  form={form}
                  variant="borderless"
                  style={{ height: "72px" }}
                  onFinish={onFinish}
                // onFinish={onFinish}
                >
                  <Form.Item
                    name="title"
                    rules={[{ required: true, message: "Please input event name!" }]}
                  >
                    <Input
                      placeholder="Event Name"
                      style={{ height: "100%", fontSize: "40px", padding: "0" }}
                    // value={form.getFieldValue("title") || ""} // Set initial value from form
                    // onChange={(e) => form.setFieldsValue({ title: e.target.value })} // Update form value on change
                    />
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
                      <Form.Item name="range"> {/* 'range' must match the name in setFieldsValue */}
                        <RangePicker
                          showTime
                          style={{
                            marginBottom: "24px",
                            fontFamily: "Poppins, sans-serif",
                          }}
                          size="large"
                          onChange={onRangeChange} // Update state or handle user input
                        />
                      </Form.Item>
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
