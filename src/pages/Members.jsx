import { Form, Modal, Input, Table, Radio } from "antd";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import "../assets/styles/member.css";
import { useCreateMember } from "../hooks/useCreateMember";
import { NOTIFICATION } from "../constants/notification";
import { Notification } from "../components/Notifications/notification";
import { useEffect, useState } from "react";
import { useMember } from "../hooks/useMember";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";

const Members = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

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

  const { data: listMember, isLoading: loadListMember } = useMember();
  const dataTable =
    listMember?.length > 0 &&
    Object.keys(listMember[0]).reduce((prev, curr) => {
      prev[curr] = curr;
      return prev;
    }, {});

  const columns = [
    {
      title: "Name",
      dataIndex: dataTable?.username,
    },

    {
      title: "Email",
      dataIndex: dataTable?.email,
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      Notification(NOTIFICATION.SUCCESS, "Add member successfully!");
      handleCancel();
    } else if (isError) {
      Notification(NOTIFICATION.ERROR, "Unsuccessfully!");
    }
  }, [isSuccess]);

  const onRow = (record) => {
    return {
      onClick: (e) => {
        e.stopPropagation();
        navigate(`/profile/${record.id}`);
      },
    };
  };

  return (
    <>
      <LoadingComponent isLoading={loadListMember}>
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
                {
                  validator: (_, value) => {
                    const regex = /^[a-z0-9._-]{11}$/i;
                    if (value && !regex.test(value)) {
                      return Promise.reject(
                        "Please enter a valid Slack ID with 11 characters"
                      );
                    }
                    return Promise.resolve();
                  },
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
                {
                  validator: (rule, value) => {
                    if (!/[A-Z]/.test(value)) {
                      return Promise.reject(
                        "Password must contain at least one uppercase letter"
                      );
                    }
                    if (!/[a-z]/.test(value)) {
                      return Promise.reject(
                        "Password must contain at least one lowercase letter"
                      );
                    }
                    if (!/\d/.test(value)) {
                      return Promise.reject(
                        "Password must contain at least one number"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select an option!" }]}
              initialValue={"male"}
              labelAlign="left"
            >
              <Radio.Group>
                <Radio value={"male"}>Male</Radio>
                <Radio value={"female"}>Female</Radio>
                <Radio value={"other"}>Other</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              labelAlign="left"
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
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
        <Table
          columns={columns}
          dataSource={listMember}
          onRow={onRow}
          style={{ cursor: "pointer" }}
          rowKey={(record) => record.id}
        />
      </LoadingComponent>
    </>
  );
};

export default withAuthorization([ROLE.ADMIN, ROLE.MANAGER])(Members);
