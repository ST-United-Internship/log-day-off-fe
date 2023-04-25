import { Form, Input, Button, Modal, Table, Tag, Card } from "antd";
import { useEffect, useState } from "react";
import "../assets/groupdetail/groupdetail.css";
import { ROLE } from "../constants/roles";
import withAuthorization from "../HOCs/withAuthorization";
import { PlusOutlined } from "@ant-design/icons";
import { useAssignMemberGroup } from "../hooks/useAssignMemberGroup";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import "../assets/css/GroupDetail/GroupDetail.css";
import { useParams } from "react-router-dom";
import { useGetGroupDetail } from "../hooks/useGroupDetail";
import { useUnAssignMemberGroup } from "../hooks/userUnassignGroup";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import { useGetListStaff } from "../hooks/useGetListStaff";
import { useAssignMasterRole } from "../hooks/useAssignMasterRole";
import NotFoundDetail from "./NotFound/NotFoundDetail";

const { TextArea } = Input;

const GroupDetail = () => {
  const [form] = Form.useForm();
  const [setFormData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalAssignStaffToMaster, setIsModalStaffOpen] = useState(false);

  const { id } = useParams();

  const {
    data: groupDetail,
    isLoading,
    refetch,
    isError: isErrorGroupDetail,
  } = useGetGroupDetail(id);

  const { data: allUser, isLoading: loadAllUser } = useGetAllUsers();
  const {
    data: allStaffs,
    isLoading: loadAllStaffs,
    refetch: refetchListStaffs,
  } = useGetListStaff(id);

  const {
    mutate: addAssignMember,
    isSuccess: isSuccessAdd,
    isLoading: isLoadingAdd,
  } = useAssignMemberGroup(id);

  const {
    mutate: unAssignMember,
    isSuccess: isSuccessUnAssign,
    isLoading: isLoadingUnAssign,
  } = useUnAssignMemberGroup(id);

  const {
    mutate: assignMaster,
    isSuccess: isSuccessAssignMaster,
    isLoading: isLoadingAssignMaster,
  } = useAssignMasterRole();

  const onAssignMember = (id) => {
    addAssignMember(id);
  };

  const onAssignMaster = (staffId) => {
    assignMaster(staffId);
  };

  useEffect(() => {
    if (isSuccessAdd || isSuccessUnAssign) {
      refetch();
    }

    if (isSuccessAssignMaster) {
      refetchListStaffs();
      refetch();
    }
  });

  const onFinish = (values) => {
    setFormData(values);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showStaffModal = () => {
    setIsModalStaffOpen(true);
  };

  const handleCloseStaffModal = () => setIsModalStaffOpen(false);

  const usersModal =
    allUser &&
    allUser.filter(
      (user) => user.role.name !== ROLE.ADMIN && user.role.name !== ROLE.MANAGER
    );

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onUnAssign = (e, id) => {
    e.preventDefault();
    unAssignMember(id);
  };

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

  const staffRows = [
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
            onClick={() => onAssignMaster(record.id)}
          >
            <PlusOutlined />
            ADD
          </Button>
        );
      },
    },
  ];

  if (isErrorGroupDetail) {
    return <NotFoundDetail />;
  }

  return (
    <div>
      <LoadingComponent
        isLoading={
          isLoading ||
          isLoadingAdd ||
          isLoadingUnAssign ||
          isLoadingAssignMaster
        }
      >
        <Form
          form={form}
          className="group-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
        >
          <div>
            <h3>{groupDetail?.name}</h3>
            <div className="wrap-btn-group">
              <Button onClick={showModal}>+ New User</Button>
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

              <Button style={{ marginLeft: "5px" }} onClick={showStaffModal}>
                + New Master
              </Button>
              <Modal
                title="Assign staff to master"
                open={isModalAssignStaffToMaster}
                onCancel={handleCloseStaffModal}
                okButtonProps={{ style: { display: "none" } }}
              >
                <Table
                  columns={staffRows}
                  dataSource={allStaffs}
                  loading={loadAllStaffs}
                ></Table>
              </Modal>
            </div>
          </div>
          <Form.Item label="Name" className="vung1">
            <TextArea className="otext1" rows={1} />
          </Form.Item>

          <Form.Item label="Masters">
            <Card>
              {groupDetail?.masters.map((item) => (
                <Tag color="#2db7f5">{item.username}</Tag>
              ))}
            </Card>
          </Form.Item>

          <Form.Item label="Members">
            <Card>
              {groupDetail?.users.map((item) => (
                <Tag
                  closable
                  onClose={(e) => onUnAssign(e, item.id)}
                  color="#2db7f5"
                >
                  {item.username}
                </Tag>
              ))}
            </Card>
          </Form.Item>
        </Form>
      </LoadingComponent>
    </div>
  );
};

export default withAuthorization([ROLE.ADMIN, ROLE.MANAGER])(GroupDetail);
