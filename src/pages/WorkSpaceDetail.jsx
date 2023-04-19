import { Button, Form, Input, Space, Switch, Table } from "antd";
import { useState } from "react";
import "../assets/css/WorkSpaceDetail/WorkSpaceDetail.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";
import { useWorkSpaceDetail } from "../hooks/useWorkSpaceDetail";

const columns = [
  {
    title: "Name",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
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

const WorkSpaceDetail = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);

  const { data, isLoading } = useWorkSpaceDetail();
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
      <Table
        columns={columns}
        dataSource={data?.users}
        loading={isLoading}
      ></Table>
    </div>
  );
};
export default withAuthorization([ROLE.ADMIN, ROLE.MANAGER])(WorkSpaceDetail);
