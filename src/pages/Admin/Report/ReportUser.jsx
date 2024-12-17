import React from "react";
import { Layout, Col, Table, Tooltip, Space } from "antd";
import { StopOutlined, CloseOutlined } from "@ant-design/icons"; // Import icons
import "../../../pages/CreateRagam/style.css";
import "./report.css";

const { Content } = Layout;

const dataSource = [
  {
    key: "1",
    no: 1,
    reportedUsers: "whiteheartvluu",
    submittedBy: "cocopan",
    reportedDate: "2024-09-10",
    category: "Fraud or Scam",
    description: "Please don’t join this event. It's a scam.",
  },
  {
    key: "2",
    no: 2,
    reportedUsers: "preachypeach",
    submittedBy: "ningayuk",
    reportedDate: "2024-10-08",
    category: "Spam",
    description: "I just don’t like this activity.",
  },
  {
    key: "3",
    no: 3,
    reportedUsers: "bloomingfleur",
    submittedBy: "fleurdelis",
    reportedDate: "2024-10-12",
    category: "Harmful Content",
    description: "It contains harmful advice.",
  },
  {
    key: "4",
    no: 4,
    reportedUsers: "stardust",
    submittedBy: "haechanhaecha",
    reportedDate: "2024-10-20",
    category: "Hateful Content",
    description: "Offensive language used in comments.",
  },
  {
    key: "5",
    no: 5,
    reportedUsers: "kinoyuki",
    submittedBy: "truzdolls",
    reportedDate: "2024-10-21",
    category: "Canceled Event",
    description: "Event details are no longer valid.",
  },
  {
    key: "6",
    no: 6,
    reportedUsers: "cakebutter",
    submittedBy: "the__blue",
    reportedDate: "2024-10-27",
    category: "Copyright Infringement",
    description: "Content copied from another source.",
  },
  {
    key: "7",
    no: 7,
    reportedUsers: "mchoijooh",
    submittedBy: "defofcaffeine",
    reportedDate: "2024-11-10",
    category: "Violence",
    description: "Threatening messages shared publicly.",
  },
  {
    key: "8",
    no: 8,
    reportedUsers: "artshere",
    submittedBy: "itzartsy",
    reportedDate: "2024-11-12",
    category: "Sexual Activity",
    description: "Inappropriate and explicit content.",
  },
  {
    key: "9",
    no: 9,
    reportedUsers: "drewithme",
    submittedBy: "aesarts",
    reportedDate: "2024-11-24",
    category: "Regulated Content",
    description: "Promoting prohibited substances.",
  },
  {
    key: "10",
    no: 10,
    reportedUsers: "gamemasterx",
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
    title: "Reported Users",
    dataIndex: "reportedUsers",
    key: "reportedUsers",
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
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
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
            onClick={() => console.log(`Blocked ${record.reportedUsers}`)}
          />
        </Tooltip>
        <Tooltip title="Ignore">
          <CloseOutlined
            style={{ color: "gray", fontSize: "16px", cursor: "pointer" }}
            onClick={() => console.log(`Ignored ${record.reportedUsers}`)}
          />
        </Tooltip>
      </Space>
    ),
  },
];

const ReportUser = () => {
  return (
    <Content
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        padding: "20px",
        zIndex: "0",
      }}
      className="font-sans"
    >
      <div style={{ maxWidth: "800px", width: "100%" }}>
        <Col>
          <div className="ml-3 mt-20">
            <h1 className="font-bold text-grey-800 text-4xl font-sans">
              Report Users
            </h1>
            <p className="mt-3 text-grey-200 text-lg font-sans">
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
        />
      </div>
    </Content>
  );
};

export default ReportUser;
