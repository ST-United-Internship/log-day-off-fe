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
import { Notification } from "../components/Notifications/notification";
import { NOTIFICATION } from "../constants/notification";

const WorkSpaceDetail = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //get all user
  const { data, isLoading: loadWorkspace, refetch } = useWorkSpaceDetail();
  const { data: allUser, isLoading: loadAllUser } = useGetAllUsers();

  const {
    mutate: assignUser,
    isLoading: loadingAssignUser,
    isSuccess: successAssign,
  } = useAddAssignUser();
  const {
    mutate: unAssignUser,
    isLoading: loadingUnAssign,
    isSuccess: successUnAssign,
  } = useUnAssignUser();

  const usersModal =
    allUser && allUser.filter((user) => user.role.name !== ROLE.ADMIN);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onAssignUser = (id) => {
    assignUser(id);
  };

  const onUnAssignUser = (id) => {
    unAssignUser(id);
  };

  useEffect(() => {
    if (successAssign || successUnAssign) {
      const message =
        (successAssign && "Assign user successfully!") ||
        (successUnAssign && "Delete user successfully!");
      Notification(NOTIFICATION.SUCCESS, message);
      refetch();
      handleCancel();
    }
  }, [successAssign, successUnAssign]);

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
            <Button className="btn-space-reset">
              <EditOutlined />
              Reset Password
            </Button>
            <Button
              className="btn-space-remove"
              name="username"
              onClick={() => onUnAssignUser(record.id)}
            >
              <DeleteOutlined name="username" />
              Remove
            </Button>
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
  return (
    <div className="workspace-container">
      <Form.Item name={["user", "name"]} label="Name">
        <Input placeholder="" className="workspace-text" />
      </Form.Item>
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
      />
    </div>
  );
};
export default withAuthorization([ROLE.ADMIN])(WorkSpaceDetail);
