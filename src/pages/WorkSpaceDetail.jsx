import { Button, Form, Input, Space, Switch, Table } from "antd";
import { useState } from "react";
import "../assets/css/WorkSpaceDetail/WorkSpaceDetail.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: "12%",
  },
  {
    title: "Action",
    key: "action",

    render: () => (
      <Space size="middle">
        <Button className="btn-space">
          <EditOutlined />
          Reset Password
        </Button>
        <Button className="btn-space">
          <DeleteOutlined />
          Remove
        </Button>
      </Space>
    ),
  },
];
const data = [
  {
    key: 1,
    name: "John Brown sr.",
    email: "locphuho@gmail.com",
    address: "New York No. 1 Lake Park",
  },

  {
    key: 2,
    name: "Joe Black",
    email: "locphuho@gmail.com",
    address: "Sydney No. 1 Lake Park",
  },
];

const WorkSpaceDetail = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);
  return (
    <div className="workspace-container">
      <Form.Item name={["user", "name"]} label="Name">
        <Input placeholder="" className="workspace-text" />
      </Form.Item>
      <div className="wrap-btn">
        <Button className="btn-workspace">+ New manager</Button>
      </div>
      <Space align="center" className="head-wrap">
        Status:{""}
        <Switch checked={checkStrictly} onChange={setCheckStrictly} />
      </Space>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
export default WorkSpaceDetail;
