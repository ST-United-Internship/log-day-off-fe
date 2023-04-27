import { Button, Form, Input, Modal, Space, Switch, Table } from "antd";
import { useEffect, useState } from "react";
import "../assets/css/WorkSpaceDetail/WorkSpaceDetail.css";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";
import { useWorkSpaceDetail } from "../hooks/useWorkSpaceDetail";
import { useUnAssignUser } from "../hooks/useUnAssignUser";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import { useAddAssignUser } from "../hooks/useAddAssignUser";
import NotFoundDetail from "./NotFound/NotFoundDetail";
import { useResetPassword } from "../hooks/useResetPassword";

const WorkSpaceDetail = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenReset, setIsModalOpenReset] = useState(false);
  const [form] = Form.useForm();

  //get all user
  const {
    data,
    isLoading: loadWorkspace,
    error: errorWorkspaceDetail,
    refetch: refetchWorkSpaceDetail,
  } = useWorkSpaceDetail();
  const {
    data: allUser,
    isLoading: loadAllUser,
    refetch: refetchGetAllUsers,
  } = useGetAllUsers();

  // assign user
  const {
    mutate: assignUser,
    isLoading: loadingAssignUser,
    isSuccess: isSuccessAssignUser,
  } = useAddAssignUser();

  const onAssignUser = (id) => {
    assignUser(id);
  };

  //unassign user
  const {
    mutate: unAssignUser,
    isLoading: loadingUnAssign,
    isSuccess: isSuccessUnAssignUser,
  } = useUnAssignUser();

  const onUnAssignUser = (id) => {
    unAssignUser(id);
  };

  //reset password
  const { mutate: resetPassword, isLoading: loadResetPassword } =
    useResetPassword();

  const onResetPassword = (userId, values) => {
    resetPassword({ userId, ...values });
  };
  // role admin can edit
  const usersModal =
    allUser && allUser.filter((user) => user.role.name !== ROLE.ADMIN);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModalPassword = () => {
    setIsModalOpenReset(true);
  };
  const handleCancelPassword = () => {
    setIsModalOpenReset(false);
  };

  useEffect(() => {
    if (isSuccessAssignUser || isSuccessUnAssignUser) {
      refetchGetAllUsers();
      refetchWorkSpaceDetail();
    }
  });

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
        console.log(record);
        return (
          <Space size="middle">
            <div>
              <Button className="btn-space-reset" onClick={showModalPassword}>
                <EditOutlined />
                Reset Password
              </Button>
              <Modal
                title="Reset Password"
                open={isModalOpenReset}
                onCancel={handleCancelPassword}
                onOk={form.submit}
                confirmLoading={loadResetPassword}
              >
                <Form
                  form={form}
                  name="complex-form"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  className="full-form"
                  onFinish={(values) => onResetPassword(record.id, values)}
                >
                  <Form.Item label="New password">
                    <Form.Item
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the password",
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
                      <Input.Password placeholder="Password" size="large" />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item label="New passwork confirm">
                    <Form.Item
                      name="newPasswordConfirm"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please enter the password",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="New password "
                        size="large"
                      />
                    </Form.Item>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
            <div>
              <Button
                className="btn-space-remove"
                name="username"
                onClick={() => onUnAssignUser(record.id)}
              >
                <DeleteOutlined name="username" />
                Remove
              </Button>
            </div>
          </Space>
        );
      },
    },
  ];

  const rows = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => {
        return (
          <Button
            className="btn-space"
            name="username"
            onClick={() => onAssignUser(record.id)}
          >
            <PlusOutlined name="username" />
            ADD
          </Button>
        );
      },
    },
  ];

  if (errorWorkspaceDetail) {
    return <NotFoundDetail />;
  }

  return (
    <div className="workspace-container">
      <div className="wrap-btn">
        <Button className="btn-workspace" onClick={showModal}>
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
            rowKey={(record) => record.id}
          ></Table>
        </Modal>
      </div>
      <Space align="center" className="head-wrap">
        Status:{""}
        <Switch checked={checkStrictly} onChange={setCheckStrictly} />
      </Space>
      <Table
        columns={columns}
        dataSource={data?.users}
        loading={loadWorkspace || loadingUnAssign || loadingAssignUser}
        rowKey={(record) => record.id}
      />
    </div>
  );
};
export default withAuthorization([ROLE.ADMIN])(WorkSpaceDetail);
