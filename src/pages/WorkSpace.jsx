import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Table, Form, message, Modal } from "antd";
import { useEffect, useState } from "react";
import "../assets/styles/WorkSpace.css";
import InputComponent from "../components/InputComponent/InputComponent";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import { ROLE } from "../constants/roles";
import withAuthorization from "../HOCs/withAuthorization";
import { useMutationHooks } from "../hooks/useMuationHook";
import * as WorkSpaceService from "../services/WorkSpaceService";

const WorkSpace = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateWorkSpace, setStateWorkSpace] = useState({
    name: "",
  });
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

  const mutation = useMutationHooks((data) => {
    const { name } = data;
    const res = WorkSpaceService.createWorkSpace({ name });
    return res;
  });

  const { isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      message.success("Create work space successfully!");
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateWorkSpace({ name: "" });
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onFinish = () => {
    mutation.mutate(stateWorkSpace);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleOnChange = (e) => {
    setStateWorkSpace({
      ...stateWorkSpace,
      [e.target.name]: e.target.value,
    });
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
        title="Create work space"
        open={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
      >
        <LoadingComponent isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{
              span: 3,
            }}
            wrapperCol={{
              span: 22,
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
          >
            <Form.Item
              label="Name"
              name="Name"
              rules={[
                {
                  required: true,
                  message: "Please input name of work space!",
                },
              ]}
            >
              <InputComponent
                value={stateWorkSpace.name}
                name="name"
                onChange={handleOnChange}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 3,
                span: 21,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </Modal>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  );
};

export default withAuthorization([ROLE.ADMIN])(WorkSpace);
