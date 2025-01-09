import  { useEffect, useState } from "react";
import { Layout, Col, Table, Tooltip, Modal, Space, Skeleton } from "antd";
import { StopOutlined, CloseOutlined } from "@ant-design/icons";
import "../../../pages/CreateRagam/style.css";
import "./report.css";
import { editDataPrivatePut, getDataPrivate } from "../../../utils/api"; 

const { Content } = Layout;

const ReportUser = () => {
  const [datas, setDatas] = useState([]); // Store datas with clusters
  const [loading, setLoading] = useState(true); // Loading state for data

  useEffect(() => {
    getReportUser();
  }, []);

  const getReportUser = () => {
    setLoading(true);
    getDataPrivate("/api/v1/report_user/read")
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

  const columns = [
    {
      title: "No",
      dataIndex: "report_id",
      key: "report_id",
    },
    {
      title: "Reported User",
      dataIndex: "reported_user",
      key: "reported_user",
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
          text: "Harassment",
          value: "harassment",
        },
        {
          text: "Impersonation",
          value: "impersonation",
        },
        {
          text: "Malicious Behavior",
          value: "malicious behavior",
        },
        {
          text: "Fake News or Misinformation",
          value: "fake news or misinformation",
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
              onClick={() => showConfirmAction("Resolved", datas.report_id, datas.reported_user_i, datas.reported_user)}
            />
          </Tooltip>
          <Tooltip title="Ignore">
            <CloseOutlined
              style={{ color: "black", fontSize: "16px", cursor: "pointer" }}
              onClick={() => showConfirmAction("Declined", datas.report_id, datas.reported_user_id, datas.reported_user)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];


  const showConfirmAction = (actionType, report_id, user_id, user_name) => {
    Modal.confirm({
      title: `Are you sure you want to ${actionType.toLowerCase()} this user?`,
      content: `This action will ${actionType.toLowerCase()}: ${user_name}`,
      onOk: async () => {
        const newStatus = actionType.toLowerCase(); // Dynamic status based on actionType
  
        // Create FormData and append status and user_id
        const formData = new FormData();
        formData.append("status", newStatus);
        formData.append("user_id", user_id);
  
        // Call the API to update the report
        editDataPrivatePut(
          `/api/v1/report_user/update/${report_id}`, // Use the endpoint for report_user
          formData
        )
          .then((resp) => {
            // Check for the success message in the response
            if (resp.message && resp.message.includes("updated successfully")) {
              console.log(`${actionType} confirmed for report ${report_id}`);
              getReportUser(); // Refresh or fetch the updated report data
            } else {
              console.error("Failed to update event:", resp.message || resp.error);
            }
          })
          .catch((err) => {
            console.error("Error updating event status:", err);
          });
      },
      onCancel() {
        console.log(`${actionType} canceled for report ${report_id}`);
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

export default ReportUser;
