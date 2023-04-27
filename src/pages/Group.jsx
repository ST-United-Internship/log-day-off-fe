import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Modal, Select, Space, Table, Tag } from "antd";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useGetListWorkspace } from "../hooks/useGetListWorkSpace";
import { useCreateGroup } from "../hooks/useCreateGroup";
import { useGetListGroup } from "../hooks/useGetListGroup";
import { getStorageData } from "../helpers/storage";
import { PROFILE } from "../constants/auth";

const Group = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const profile = getStorageData(PROFILE);

  const { mutate: createGroup, isLoading, isSuccess } = useCreateGroup();

  const { data: listWorkSpace } = useGetListWorkspace();

  const {
    data: listGroup,
    isLoading: loadListGroup,
    refetch,
  } = useGetListGroup();

  const mapping = listGroup?.map((item) => ({
    ...item,
    workspace: item.workspace.name,
  }));

  const onRow = (record) => {
    return {
      onClick: (e) => {
        e.stopPropagation();
        navigate(`/group/${record.id}`);
      },
    };
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Member (s)",
      dataIndex: "users",
      key: "users",
      render: (_, { users }) => {
        return users.map((item) => (
          <Tag color="#2db7f5" key={item.id}>
            {item.username}
          </Tag>
        ));
      },
    },
    {
      title: "Master (s)",
      dataIndex: "master",
      key: "master",
      render: (_, { master }) => {
        return master.map((item) => (
          <Tag color="#2db7f5" key={item.id}>
            {item.username}
          </Tag>
        ));
      },
    },
    {
      title: "Workspace (s)",
      dataIndex: "workspace",
      key: "workspace",
      render: (_, { workspace, id }) => {
        return (
          <Link
            to={`/workspace-detail/${id}`}
            onClick={(e) => {
              e.stopPropagation();
              if (profile.role.name !== ROLE.ADMIN) e.preventDefault();
            }}
          >
            <Tag color="#108ee9">{workspace}</Tag>
          </Link>
        );
      },
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      refetch();
      handleCancel();
    }
  }, [isSuccess]);

  const onFinish = (values) => {
    createGroup(values);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <LoadingComponent isLoading={loadListGroup}>
        <div className="nav-container">
          <div className="wrapper">
            <a href="#"></a>
            <Space wrap>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ fontWeight: "600" }}
                onClick={() => setIsModalOpen(true)}
              >
                New Group
              </Button>
            </Space>
          </div>
        </div>
        <Modal
          title="Create Group"
          open={isModalOpen}
          onCancel={handleCancel}
          onOk={form.submit}
        >
          <LoadingComponent isLoading={isLoading}>
            <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 18,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
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
                    message: "Please input name of group!",
                  },
                ]}
              >
                <Input placeholder="Group name" />
              </Form.Item>
              <Form.Item
                labelAlign="left"
                label="Workspace"
                name="workSpaceId"
                rules={[
                  {
                    required: true,
                    message: "Please select the workspace!",
                  },
                ]}
              >
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={listWorkSpace?.map((option) => ({
                    value: option.id,
                    label: option.name,
                  }))}
                />
              </Form.Item>
            </Form>
          </LoadingComponent>
        </Modal>
        <Table
          columns={columns}
          dataSource={mapping}
          onRow={onRow}
          rowKey={(record) => record.id}
        />
      </LoadingComponent>
    </>
  );
};
export default withAuthorization([ROLE.MANAGER, ROLE.ADMIN])(Group);
