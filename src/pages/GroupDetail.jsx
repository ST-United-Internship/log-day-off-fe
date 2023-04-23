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
const { TextArea } = Input;

const GroupDetail = () => {
  const [form] = Form.useForm();
  const [setFormData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();

  const { data: groupDetail, isLoading, refetch } = useGetGroupDetail(id);

  const { data: allUser, isLoading: loadAllUser } = useGetAllUsers();

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

  const onAssignMember = (id) => {
    addAssignMember(id);
  };

  useEffect(() => {
    if (isSuccessAdd || isSuccessUnAssign) {
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

  return (
    <div>
      <LoadingComponent
        isLoading={isLoading || isLoadingAdd || isLoadingUnAssign}
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
