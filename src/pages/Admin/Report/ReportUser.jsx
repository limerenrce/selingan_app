import React from "react";
import { Layout, Col, Table, Tooltip, Modal, Space } from "antd";
import { StopOutlined, CloseOutlined } from "@ant-design/icons";
import "../../../pages/CreateRagam/style.css";
import "./report.css";
const { confirm } = Modal;

const showConfirm = (actionType, user) => {
  confirm({
    title: `Are you sure you want to ${actionType.toLowerCase()} this user?`,
    content: `This action will ${actionType.toLowerCase()} the user: ${user}`,
    onAccept() {
      console.log(`${actionType} confirmed for ${user}`);
    },
    onDecline() {
      console.log(`${actionType} canceled for ${user}`);
    },
  });
};

const { Content } = Layout;

const dataSource = [
  {
    key: "1",
    no: 1,
    reportedUsers: "whiteheartvluu",
    submittedBy: "cocopan",
    reportedDate: "2024-09-10",
    category: "Impersonation",
    description: "Please don’t join this event. It's a scam.",
  },
  {
    key: "2",
    no: 2,
    reportedUsers: "preachypeach",
    submittedBy: "ningayuk",
    reportedDate: "2024-10-08",
    category: "Impersonation",
    description: "I just don’t like this activity.",
  },
  {
    key: "3",
    no: 3,
    reportedUsers: "bloomingfleur",
    submittedBy: "fleurdelis",
    reportedDate: "2024-10-12",
    category: "Harassment",
    description: "It contains harmful advice.",
  },
  {
    key: "4",
    no: 4,
    reportedUsers: "stardust",
    submittedBy: "haechanhaecha",
    reportedDate: "2024-10-20",
    category: "Fake News or Misinformation",
    description: "Offensive language used in comments.",
  },
  {
    key: "5",
    no: 5,
    reportedUsers: "kinoyuki",
    submittedBy: "truzdolls",
    reportedDate: "2024-10-21",
    category: "Fake News or Misinformation",
    description: "Event details are no longer valid.",
  },
  {
    key: "6",
    no: 6,
    reportedUsers: "cakebutter",
    submittedBy: "the__blue",
    reportedDate: "2024-10-27",
    category: "Fake News or Misinformation",
    description: "Content copied from another source.",
  },
  {
    key: "7",
    no: 7,
    reportedUsers: "mchoijooh",
    submittedBy: "defofcaffeine",
    reportedDate: "2024-11-10",
    category: "Malicious Behavior",
    description: "Threatening messages shared publicly.",
  },
  {
    key: "8",
    no: 8,
    reportedUsers: "artshere",
    submittedBy: "itzartsy",
    reportedDate: "2024-11-12",
    category: "Harassment",
    description: "Inappropriate and explicit content.",
  },
  {
    key: "9",
    no: 9,
    reportedUsers: "drewithme",
    submittedBy: "aesarts",
    reportedDate: "2024-11-24",
    category: "Malicious Behavior",
    description: "Promoting prohibited substances.",
  },
  {
    key: "10",
    no: 10,
    reportedUsers: "gamemasterx",
    submittedBy: "levelup",
    reportedDate: "2024-11-28",
    category: "Harassment",
    description: "Encouraging unsafe behavior.",
  },
];

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
        text: "Harassment",
        value: "Harassment",
      },
      {
        text: "Impersonation",
        value: "Impersonation",
      },
      {
        text: "Malicious Behavior",
        value: "Malicious Behavior",
      },
      {
        text: "Fake News or Misinformation",
        value: "Fake News or Misinformation",
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
            style={{
              color: "red",
              fontSize: "16px",
              cursor: "pointer",
              fontFamily: "Poppins, sans-serif",
            }}
            onClick={() => showConfirm("Block", record.reportedUsers)}
          />
        </Tooltip>
        <Tooltip title="Ignore">
          <CloseOutlined
            style={{ color: "black", fontSize: "16px", cursor: "pointer" }}
            onClick={() => showConfirm("Ignore", record.reportedUsers)}
          />
        </Tooltip>
      </Space>
    ),
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("Table Parameters:", pagination, filters, sorter, extra);
};

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
      <div style={{ maxWidth: "1000px", width: "100%" }}>
        <Col>
          <div className="ml-3 mt-20">
            <h1 className="font-bold text-grey-800 text-4xl font-sans">
              Report Users
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

export default ReportUser;
