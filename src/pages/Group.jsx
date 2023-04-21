import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useGetListWorkspace } from "../hooks/useGetListWorkSpace";
import { useCreateGroup } from "../hooks/useCreateGroup";
import { NOTIFICATION } from "../constants/notification";
import { Notification } from "../components/Notifications/notification";
import { useGetListGroup } from "../hooks/useGetListGroup";

const Group = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const {
    mutate: createGroup,
    isLoading,
    isError,
    isSuccess,
  } = useCreateGroup();

  const { data: listWorkSpace } = useGetListWorkspace();

  const { data: listGroup, isLoading: loadListGroup } = useGetListGroup();
  const dataTable =
    listGroup?.length > 0 &&
    Object.keys(listGroup[0]).reduce((prev, curr) => {
      prev[curr] = curr;
      return prev;
    }, {});

  const columns = [
    {
      title: "Name",
      dataIndex: dataTable?.name,
    },

    {
      title: "Member (s)",
      dataIndex: dataTable?.staff,
    },
    {
      title: "Master (s)",
      dataIndex: dataTable?.manager,
    },
  ];
  useEffect(() => {
    if (isSuccess) {
      Notification(NOTIFICATION.SUCCESS, "Create Group successfully!");
      handleCancel();
    } else if (isError) {
      Notification(NOTIFICATION.ERROR, "Create Group unsuccessfully!");
    }
  }, [isSuccess]);

  const onFinish = (values) => {
    createGroup(values);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        <Table columns={columns} dataSource={listGroup} />
      </LoadingComponent>
    </>
  );
};
export default withAuthorization([ROLE.MANAGER, ROLE.ADMIN])(Group);
