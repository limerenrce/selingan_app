import React from "react";
import { Layout, Col, Table, Tooltip, Space, Modal } from "antd";
import { StopOutlined, CloseOutlined } from "@ant-design/icons"; // Import icons
import "../../../pages/CreateRagam/style.css";
import "./report.css";
const { confirm } = Modal;

const showConfirm = (actionType, event) => {
  confirm({
    title: `Are you sure you want to ${actionType.toLowerCase()} this event?`,
    content: `This action will ${actionType.toLowerCase()} the event: ${event}`,
    onAccept() {
      console.log(`${actionType} confirmed for ${event}`);
    },
    onDecline() {
      console.log(`${actionType} canceled for ${event}`);
    },
  });
};

const { Content } = Layout;

const dataSource = [
  {
    key: "1",
    no: 1,
    reportedEvents: "Flower Arranging Bouqet",
    submittedBy: "cocopan",
    reportedDate: "2024-09-10",
    category: "Fraud or Scam",
    description: "Please don’t join this event. It's a scam.",
  },
  {
    key: "2",
    no: 2,
    reportedEvents: "Candle Making Workshop",
    submittedBy: "ningayuk",
    reportedDate: "2024-10-08",
    category: "Spam",
    description: "I just don’t like this activity.",
  },
  {
    key: "3",
    no: 3,
    reportedEvents: "Pottery and Clay Crafting",
    submittedBy: "fleurdelis",
    reportedDate: "2024-10-12",
    category: "Harmful Content",
    description: "It contains harmful advice.",
  },
  {
    key: "4",
    no: 4,
    reportedEvents: "Herb Gardening Class",
    submittedBy: "haechanhaecha",
    reportedDate: "2024-10-20",
    category: "Hateful Content",
    description: "Offensive language used in comments.",
  },
  {
    key: "5",
    no: 5,
    reportedEvents: "Painting and Sip Night",
    submittedBy: "truzdolls",
    reportedDate: "2024-10-21",
    category: "Canceled Event",
    description: "Event details are no longer valid.",
  },
  {
    key: "6",
    no: 6,
    reportedEvents: "Macramé Plant Hanger Workshop",
    submittedBy: "the__blue",
    reportedDate: "2024-10-27",
    category: "Copyright Infringement",
    description: "Content copied from another source.",
  },
  {
    key: "7",
    no: 7,
    reportedEvents: "Terrarium Building Workshop",
    submittedBy: "defofcaffeine",
    reportedDate: "2024-11-10",
    category: "Violence",
    description: "Threatening messages shared publicly.",
  },
  {
    key: "8",
    no: 8,
    reportedEvents: "Charcuterie Board Styling Class",
    submittedBy: "itzartsy",
    reportedDate: "2024-11-12",
    category: "Sexual Activity",
    description: "Inappropriate and explicit content.",
  },
  {
    key: "9",
    no: 9,
    reportedEvents: "Chocolate Brownies Class",
    submittedBy: "aesarts",
    reportedDate: "2024-11-24",
    category: "Regulated Content",
    description: "Promoting prohibited substances.",
  },
  {
    key: "10",
    no: 10,
    reportedEvents: "Crocheting Workshop",
    submittedBy: "levelup",
    reportedDate: "2024-11-28",
    category: "Harmful Content",
    description: "Encouraging unsafe behavior.",
  },
];

// Updated columns with tooltip-based Actions column
const columns = [
  {
    title: "No",
    dataIndex: "no",
    key: "no",
  },
  {
    title: "Reported Events",
    dataIndex: "reportedEvents",
    key: "reportedEvents",
  },
  {
    title: "Submitted by",
    dataIndex: "submittedBy",
    key: "submittedBy",
  },
  {
    title: "Reported Date",
    dataIndex: "reportedDate",
    key: "reportedDate",
    sorter: (a, b) => new Date(a.reportedDate) - new Date(b.reportedDate),
    sortDirections: ["ascend", "descend"],
    defaultSortOrder: "ascend",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    filters: [
      {
        text: "Fraud or Scam",
        value: "Fraud or Scam",
      },
      {
        text: "Spam",
        value: "Spam",
      },
      {
        text: "Harmful Content",
        value: "Harmful Content",
      },
      {
        text: "Hateful Content",
        value: "Hateful Content",
      },
      {
        text: "Canceled Event",
        value: "Canceled Event",
      },
      {
        text: "Copyright Infringment",
        value: "Copyright Infringment",
      },
      {
        text: "Violence",
        value: "Violence",
      },
      {
        text: "Sexual Activity",
        value: "Sexual Activity",
      },
      {
        text: "Regulated Content",
        value: "Regulated Content",
      },
    ],
    onFilter: (value, record) => record.category.indexOf(value) === 0,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space>
        <Tooltip title="Block">
          <StopOutlined
            style={{ color: "red", fontSize: "16px", cursor: "pointer" }}
            onClick={() => showConfirm("Block", record.reportedEvents)}
          />
        </Tooltip>
        <Tooltip title="Ignore">
          <CloseOutlined
            style={{ color: "black", fontSize: "16px", cursor: "pointer" }}
            onClick={() => showConfirm("Ignore", record.reportedEvents)}
          />
        </Tooltip>
      </Space>
    ),
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("Table Parameters:", pagination, filters, sorter, extra);
};

const ReportEvent = () => {
  return (
    <Content
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        padding: "20px",
        zIndex: "0",
        fontFamily: "Poppins, sans-serif",
      }}
      className="font-sans"
    >
      <div style={{ maxWidth: "1000px", width: "100%" }}>
        <Col>
          <div className="ml-3 mt-20">
            <h1 className="font-bold text-grey-800 text-4xl font-sans">
              Report Events
            </h1>
            <p className="mt-3 mb-3 text-grey-200 text-lg font-sans">
              Explore reported users, review categories, and check descriptions
              for flagged content.
            </p>
          </div>
        </Col>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
          bordered
          style={{ fontFamily: "Poppins, sans-serif" }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
          onChange={onChange}
        />
      </div>
    </Content>
  );
};

export default ReportEvent;
