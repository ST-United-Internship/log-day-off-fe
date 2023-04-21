import { Form, Input, Button, Modal, Table } from "antd";
import { useState } from "react";
import "../assets/groupdetail/groupdetail.css";
import { ROLE } from "../constants/roles";
import withAuthorization from "../HOCs/withAuthorization";
import { PlusOutlined } from "@ant-design/icons";
import { useAssignMemberGroup } from "../hooks/useAssignMemberGroup";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import "../assets/css/GroupDetail/GroupDetail.css";
const { TextArea } = Input;

const GroupDetail = () => {
  const [form] = Form.useForm();
  const [setFormData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: allUser, isLoading: loadAllUser } = useGetAllUsers();

  const onAssignMember = (id) => {
    addAssignMember(id);
  };

  const onFinish = (values) => {
    setFormData(values);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const usersModal =
    allUser &&
    allUser.filter(
      (user) => user.role.name !== ROLE.ADMIN && user.role.name !== ROLE.MANAGER
    );

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onCancel = () => {
    setFormData(null);
    form.resetFields();
  };
  const { mutate: addAssignMember } = useAssignMemberGroup();

  const rows = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        return <span>{role.name}</span>;
      },
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => {
        return (
          <Button
            className="btn-space"
            name="username"
            onClick={() => onAssignMember(record.id)}
          >
            <PlusOutlined name="username" />
            ADD
          </Button>
        );
      },
    },
  ];

  return (
    <Form
      form={form}
      className="group-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div>
        <h3>Basic Information</h3>
        <div className="wrap-btn-group">
          <Button className="btn-group" onClick={showModal}>
            + New User
          </Button>
          <Modal
            title="Add user"
            open={isModalOpen}
            onCancel={handleCancel}
            okButtonProps={{ style: { display: "none" } }}
          >
            <Table
              columns={rows}
              dataSource={usersModal}
              loading={loadAllUser}
            ></Table>
          </Modal>
        </div>
      </div>
      <Form.Item label="Name" className="vung1">
        <TextArea className="otext1" rows={1} />
      </Form.Item>

      <Form.Item label="Masters" className="vung2">
        <TextArea className="otext2" rows={4} />
      </Form.Item>

      <Form.Item label="Members" className="vung3">
        <TextArea className="otext3" rows={4} />
      </Form.Item>

      <Form.Item>
        <Button className="nut-group-mot" type="primary" htmlType="submit">
          Send
        </Button>

        <Button className="nut-group-hai" type="default" onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default withAuthorization([ROLE.MANAGER])(GroupDetail);
