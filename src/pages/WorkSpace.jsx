import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Table, Form, message, Modal, Input } from "antd";
import { useEffect, useState } from "react";
import "../assets/styles/WorkSpace.css";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import { ROLE } from "../constants/roles";
import withAuthorization from "../HOCs/withAuthorization";
import { useCreateWorkSpace } from "../hooks/useCreateWorkSpace";

const WorkSpace = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "State",
      dataIndex: "state",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.state.length - b.state.length,
    },
    {
      title: "Managers",
      dataIndex: "manager",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.manager.indexOf(value) === 0,
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      state: "Active",
      manager: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      state: "Inactive",
      manager: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      state: "Active",
      manager: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      state: "Inactive",
      manager: "London No. 2 Lake Park",
    },
  ];

  const {
    mutate: createWorkspace,
    isLoading,
    isError,
    isSuccess,
  } = useCreateWorkSpace();

  useEffect(() => {
    if (isSuccess) {
      message.success("Create work space successfully!");
      handleCancel();
    } else if (isError) {
      message.error("Create work space unsuccessfully!");
    }
  }, [isSuccess]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onFinish = (values) => {
    createWorkspace(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="nav-container">
        <div className="wrapper">
          <a href="#">Branding</a>
          <Space wrap>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ fontWeight: "600" }}
              onClick={() => setIsModalOpen(true)}
            >
              New Workspace
            </Button>
            {/* <UserOutlined className="user-icon" /> */}
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
            autoComplete="off"
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
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  );
};

export default withAuthorization([ROLE.ADMIN])(WorkSpace);
