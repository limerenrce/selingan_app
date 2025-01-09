import { useEffect, useState } from "react";
import { Layout, Col, Table, Tooltip, Space, Modal, Skeleton } from "antd";
import { StopOutlined, CloseOutlined } from "@ant-design/icons"; // Import icons
import "../../../pages/CreateRagam/style.css";
import "./report.css";
import { getDataPrivate, editDataPrivatePut } from "../../../utils/api"; 

const { Content } = Layout;

const ReportEvent = () => {
  const [datas, setDatas] = useState([]); // Store datas with clusters
  const [loading, setLoading] = useState(true); // Loading state for data

  useEffect(() => {
    getReportRagam();
  }, []);

  const getReportRagam = () => {
    setLoading(true);
    getDataPrivate("/api/v1/report_ragam/read")
      .then((resp) => {
        if (resp && resp.datas) {
          setDatas(resp.datas);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("Table Parameters:", pagination, filters, sorter, extra);
  };
  // Updated columns with tooltip-based Actions column
  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Reported Ragam",
      dataIndex: "reported_ragam",
      key: "reported_ragam",
    },
    {
      title: "Submitted by",
      dataIndex: "submitted_by",
      key: "submitted_by",
    },
    {
      title: "Reported Date",
      dataIndex: "created_at",
      key: "created_at",
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
          value: "fraud or scam",
        },
        {
          text: "Spam",
          value: "spam",
        },
        {
          text: "Harmful Content",
          value: "harmful content",
        },
        {
          text: "Hateful Content",
          value: "hateful content",
        },
        {
          text: "Canceled Event",
          value: "canceled event",
        },
        {
          text: "Copyright Infringment",
          value: "copyright infringment",
        },
        {
          text: "Violence",
          value: "violence",
        },
        {
          text: "Sexual Activity",
          value: "sexual activity",
        },
        {
          text: "Regulated Content",
          value: "regulated content",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, datas) => (
        <Space>
          <Tooltip title="Approve">
            <StopOutlined
              style={{ color: "red", fontSize: "16px", cursor: "pointer" }}
              onClick={() => showConfirmAction("Resolved", datas.id)}
            />
          </Tooltip>
          <Tooltip title="Ignore">
            <CloseOutlined
              style={{ color: "black", fontSize: "16px", cursor: "pointer" }}
              onClick={() => showConfirmAction("Declined", datas.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const showConfirmAction = (actionType, ragamId) => {
    Modal.confirm({
      title: `Are you sure you want to ${actionType.toLowerCase()} this ragam?`,
      content: `This action will ${actionType.toLowerCase()} the event: ${ragamId}`,
      onOk: async () => {
        const newStatus = actionType.toLowerCase();  // Block action resolves the event.

        // Create FormData and append status
        const formData = new FormData();
        formData.append("status", newStatus);

        editDataPrivatePut(
          `/api/v1/report_ragam/update/${ragamId}`, // Pass ragamId as part of the URL
          formData
        )
          .then((resp) => {
            // Check for the success message in the response
            if (resp.message && resp.message.includes("updated successfully")) {
              console.log(`${actionType} confirmed for event ${ragamId}`);
              getReportRagam();
            } else {
              console.error(
                "Failed to update event:",
                resp.message || resp.error
              );
            }
          })
          .catch((err) => {
            console.error("Error updating event status:", err);
          });
      },
      onCancel() {
        console.log(`${actionType} canceled for event ${ragamId}`);
      },
    });
  };
 

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
        {loading ? (
          <Skeleton active />
        ) : datas.length > 0 ? (
          <Table
            dataSource={datas}
            columns={columns} 
            pagination={{ pageSize: 5 }}
            bordered
            style={{ fontFamily: "Poppins, sans-serif" }}
            showSorterTooltip={{
              target: "sorter-icon",
            }}
            onChange={onChange}
          />
        ) : (
          <p>No reports available.</p>
        )}
      </div>
    </Content>
  );
};

export default ReportEvent;
