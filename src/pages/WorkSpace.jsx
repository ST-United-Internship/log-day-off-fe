import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Table, Form, Modal, Input } from "antd";
import { useEffect, useState } from "react";
import "../assets/styles/WorkSpace.css";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import { ROLE } from "../constants/roles";
import withAuthorization from "../HOCs/withAuthorization";
import { useCreateWorkSpace } from "../hooks/useCreateWorkSpace";
import { useGetListWorkspace } from "../hooks/useGetListWorkSpace";
import { useNavigate } from "react-router-dom";
import { Notification } from "../components/Notifications/notification";
import { NOTIFICATION } from "../constants/notification";

const WorkSpace = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const {
    mutate: createWorkspace,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useCreateWorkSpace();

  const {
    data: listWorkspace,
    isLoading: loadListWorkspace,
    refetch,
  } = useGetListWorkspace();

  const useQueryListWorkspace = useGetListWorkspace();

  const dataTable =
    listWorkspace?.length &&
    Object.keys(listWorkspace[0]).reduce((prev, curr) => {
      prev[curr] = curr;
      return prev;
    }, {});

  const columns = [
    {
      title: "Name",
      dataIndex: dataTable?.name,
    },
    {
      title: "State",
      dataIndex: dataTable?.status,
    },
    {
      title: "Managers",
      dataIndex: dataTable?.users,
      render: (users) => {
        return (
          <>
            {ROLE.MANAGER
              ? users.map((user, index) => {
                  if (index === 0)
                    return <span key={user.id}>{user.username}</span>;
                  return <span key={user.id}>{`, ${user.username}`}</span>;
                })
              : ""}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      Notification(NOTIFICATION.SUCCESS, "Create workspace successfully!");
      refetch();
      handleCancel();
    } else if (isError) {
      Notification(NOTIFICATION.ERROR, error);
    }
  }, [isSuccess]);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onRow = (record) => {
    return {
      onClick: (e) => {
        e.stopPropagation();
        navigate("/workspace-detail/" + record.id);
      },
    };
  };

  const onFinish = (values) => {
    createWorkspace(values, {
      onSettled: () => {
        useQueryListWorkspace.refetch();
      },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <LoadingComponent isLoading={loadListWorkspace}>
      <div className="nav-container">
        <div className="wrapper">
          <Space wrap>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ fontWeight: "600", textAlign: "right" }}
              onClick={() => setIsModalOpen(true)}
            >
              New Workspace
            </Button>
          </Space>
        </div>
      </div>
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
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input name of workspace!",
                },
              ]}
            >
              <Input placeholder="Workspace name" />
            </Form.Item>
          </Form>
        </LoadingComponent>
      </Modal>
      <Table columns={columns} dataSource={listWorkspace} onRow={onRow} />
    </LoadingComponent>
  );
};

export default withAuthorization([ROLE.ADMIN])(WorkSpace);
