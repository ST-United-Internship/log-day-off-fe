import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Switch,
  Table,
  message,
} from "antd";
import { useEffect, useState } from "react";
import "../assets/css/WorkSpaceDetail/WorkSpaceDetail.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";
import { useWorkSpaceDetail } from "../hooks/useWorkSpaceDetail";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import { useCreateWorkSpaceDetail } from "../hooks/useCreateWorkSpaceDetail";
import { useUnAssignUser } from "../hooks/useUnAssignUser";

const WorkSpaceDetail = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    mutate: createWorkSpaceDetail,
    isLoading,
    isError,
    isSuccess,
  } = useCreateWorkSpaceDetail();
  const { mutate: unAssignUser } = useUnAssignUser();

  const onUnAssignUser = (id) => {
    unAssignUser(id);
  };

  const onFinish = (values) => {
    createWorkSpaceDetail(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { data, isLoading: loadWorkspace } = useWorkSpaceDetail();

  useEffect(() => {
    if (isSuccess) {
      message.success("Create workspace successfully!");
      handleCancel();
    } else if (isError) {
      message.error("Create workspace unsuccessfully!");
    }
  }, [isSuccess]);
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
      title: "Actions",
      key: "action",
      render: (_, record) => {
        console.log(record);
        return (
          <Form>
            <Space size="middle">
              <Button className="btn-space">
                <EditOutlined />
                Reset Password
              </Button>
              <Button
                className="btn-space"
                name="username"
                onClick={() => onUnAssignUser(record.id)}
              >
                <DeleteOutlined name="username" />
                Remove
              </Button>
            </Space>
          </Form>
        );
      },
    },
  ];
  return (
    <div className="workspace-container">
      <Form.Item name={["user", "name"]} label="Name">
        <Input placeholder="" className="workspace-text" />
      </Form.Item>
      <div className="wrap-btn">
        <Button className="btn-workspace" onClick={showModal}>
          + New manager
        </Button>
        <Modal
          title="Create Workspace"
          open={isModalOpen}
          onCancel={handleCancel}
          onOk={form.submit}
        >
          <LoadingComponent isLoading={isLoading}>
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
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
              form={form}
            >
              <Form.Item
                labelAlign="left"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: "Please input name of workspace!",
                  },
                ]}
              >
                <Space>
                  <Form.Item name="username" noStyle>
                    <Input
                      style={{
                        width: "200px",
                      }}
                      placeholder="0.5, 1, 2,..."
                    />
                  </Form.Item>
                </Space>
              </Form.Item>
              <Form.Item labelAlign="left" label="Email">
                <Space>
                  <Form.Item
                    name="email"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Number is required",
                      },
                    ]}
                  >
                    <Input
                      style={{
                        width: "200px",
                      }}
                      placeholder="0.5, 1, 2,..."
                    />
                  </Form.Item>
                </Space>
              </Form.Item>
            </Form>
          </LoadingComponent>
        </Modal>
      </div>
      <Space align="center" className="head-wrap">
        Status:{""}
        <Switch checked={checkStrictly} onChange={setCheckStrictly} />
      </Space>
      <Table
        columns={columns}
        dataSource={data?.users}
        loading={loadWorkspace}
      ></Table>
    </div>
  );
};
export default withAuthorization([ROLE.ADMIN])(WorkSpaceDetail);
