import { useState } from "react";
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
} from "antd";
import { PictureOutlined } from "@ant-design/icons";
import defaultImage from "../../assets/images/hero.png";
import "./style.css";
import moment from "moment-timezone";
// import moment from "moment";

const { Content } = Layout;
const { Option } = Select;
const { Search } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const CreateRagam = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const [previewImage, setPreviewImage] = useState("");
  const { RangePicker } = DatePicker;
  const placement = "bottomRight";
  const [selectedTimezone, setSelectedTimezone] = useState("Asia/Jakarta");
  const [searchQuery, setSearchQuery] = useState("");
  const timezones = moment.tz.names();
  const [isPricingDisabled, setIsPricingDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [time, setTime] = useState(null);

  const handleButtonClick = () => {
    setIsChecked(!isChecked);
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

  const handleSegmentChange = (value) => {
    if (value === "Free") {
      setIsPricingDisabled(true);
    } else if (value === "Paid") {
      setIsPricingDisabled(false);
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

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result);
      reader.readAsDataURL(info.file.originFileObj);
    } else if (info.file.status === "error") {
      message.error("Failed to upload image");
    }
  };

  const onFinish = (values) => {
    console.log("Form Submitted: ", values);
  };

  return (
    <>
    <Content>
        <div className="container min-h-[600px] flex-center">
          <Row
            gutter={[24, 0]}
            style={{ padding: "0 20px", marginTop: "72px" }}
          >
            <Col xs={24} sm={24} md={8} lg={8} xl={8} className="mb-24">
              <Card
                bordered={false}
                className="circlebox h-full w-full flex"
                style={{
                  backgroundImage: `url(${previewImage})`,
                  backgroundSize: "cover",
                  height: "350px",
                  width: "350px",
                  position: "relative",
                }}
              >
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
                      zIndex: 0,
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                    }}
                  />
                </Upload>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={16} className="mb-24">
              <Card>
                <Segmented
                  options={["Public", "Private"]}
                  onChange={(value) => setSelectedSegment(value)}
                  style={{
                    marginTop: "10px",
                    tabSize: "large",
                    color: "#C4B7E5",
                  }}
                />
                <Form
                  layout="vertical"
                  name="event_name"
                  form={form}
                  variant="borderless"
                  style={{ height: "72px" }}
                >
                  <Form.Item
                    name="event"
                    style={{ marginTop: 24 }}
                    rules={[
                      { required: true, message: "Please input event name!" },
                    ]}
                  >
                    <Input
                      placeholder="Event Name"
                      style={{
                        height: "100%",
                        fontSize: "40px",
                        padding: "0",
                      }}
                    />
                  </Form.Item>
                </Form>
                <Form
                  layout="vertical"
                  name="event-desc"
                  form={form}
                  variant="filled"
                  size="large"
                >
                  <Form.Item
                    name="event_desc"
                    rules={[
                      { required: true, message: "Please input description!" },
                    ]}
                  >
                    <Input placeholder="Add Description" />
                  </Form.Item>
                </Form>
                <Row gutter={[16, 16]}>
                  <Col xs={10} sm={10} md={10} lg={14} xl={14}>
                    <Space direction="vertical" size={12}>
                      <RangePicker
                        showTime
                        style={{ marginBottom: "24px" }}
                        size="large"
                      />
                    </Space>
                  </Col>
                  <Col xs={4} sm={4} md={8} lg={8} xl={8}>
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
                  </Col>
                </Row>
                {/* <Form
                  layout="vertical"
                  name="time"
                  form={form}
                  variant="filled"
                  size="large"
                >
                  <Form.Item
                    name="time"
                    rules={[{ required: true, message: "Please set time!" }]}
                  >
                    <TimePicker
                      defaultValue={moment()}
                      format="HH:mm"
                      onChange={setTime}
                    />
                  </Form.Item>
                </Form> */}
                <Form
                  layout="vertical"
                  name="location"
                  form={form}
                  variant="filled"
                  size="large"
                >
                  <Form.Item
                    name="location"
                    rules={[
                      { required: true, message: "Please select location!" },
                    ]}
                  >
                    <Input placeholder="Select Location" />
                  </Form.Item>
                </Form>
                <Typography.Title level={5}>Event Options</Typography.Title>
                <Segmented
                  options={["Free", "Paid"]}
                  onChange={handleSegmentChange} // Call function on change
                  style={{ marginBottom: "10px" }}
                />
                <Form
                  layout="vertical"
                  name="price"
                  form={form}
                  variant="filled"
                  size="large"
                >
                  <Form.Item>
                    <Input
                      placeholder="Input Price"
                      type="text"
                      disabled={isPricingDisabled} // Disable based on selection
                    />
                  </Form.Item>
                </Form>
                <Form
                  layout="vertical"
                  name="capacity"
                  form={form}
                  variant="filled"
                  size="large"
                >
                  <Form.Item
                    rules={[
                      { required: true, message: "Please select location!" },
                    ]}
                  >
                    <Input placeholder="Input Capacity" type="number" />
                  </Form.Item>
                </Form>

                <Space direction="vertical" style={{ width: "100%" }}>
                  <Button
                    style={{ height: "42px" }}
                    className="text-[20px] w-full mt-5 bg-gradient-to-r from-[#A594F9] to-[#E4B1F0] text-white font-semibold py-2 rounded-md hover:bg-[#CB9DF0] hover:text-purple-600 transition duration-300"
                  >
                    Create Event
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </>
  )
}

export default CreateRagam