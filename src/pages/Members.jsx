import { Form, Modal, Input } from "antd";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import "../assets/styles/member.css";
import { useCreateMember } from "../hooks/useCreateMember";
import { NOTIFICATION } from "../constants/notification";
import { Notification } from "../components/Notifications/notification";
import { useEffect, useState } from "react";

const Members = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { mutate: createMember, isError, isSuccess } = useCreateMember();

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    createMember(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (isSuccess) {
      Notification(NOTIFICATION.SUCCESS, "Add member successfully!");
      handleCancel();
    } else if (isError) {
      Notification(NOTIFICATION.ERROR, "Unsuccessfully!");
    }
  }, [isSuccess]);
  return (
    <>
      <div className="nav-container">
        <div className="wrapper">
          <Space wrap>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ fontWeight: "600", textAlign: "right" }}
              onClick={() => setIsModalOpen(true)}
            >
              New Member
            </Button>
            <Button
              type="primary"
              style={{ fontWeight: "600", textAlign: "right" }}
              onClick={() => setIsModalOpen(true)}
            >
              Log off
            </Button>
          </Space>
        </div>
      </div>
      <Modal
        title="Create Member"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={form.submit}
      >
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            labelAlign="left"
            label="User name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input user name!",
              },
            ]}
          >
            <Input placeholder="User Name" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            label="SlackId"
            name="slackId"
            rules={[
              {
                required: true,
                message: "Please input slackId!",
              },
            ]}
          >
            <Input placeholder="SlackId" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please input gender!",
              },
            ]}
          >
            <Input placeholder="Gender" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input email!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default withAuthorization([ROLE.ADMIN, ROLE.MANAGER])(Members);
