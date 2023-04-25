import { Table, Space, Button, Modal, Form, Radio, Input } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import "../assets/reuqest-account/requestaccount.css";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";
import { useGetRequests } from "../hooks/useGetRequests";
import { useApproveRequest } from "../hooks/useApproveRequest";
import { getStorageData } from "../helpers/storage";
import { PROFILE } from "../constants/auth";
import { useEffect, useMemo, useState } from "react";
import { getTimeElapsedString } from "../helpers/timeAgo";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../helpers/formatDate";
import { useUpdateRequest } from "../hooks/useUpdateRequest";
import { STATUS_APPROVAL } from "../constants/statusApproval";

const RequestAccount = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [modalData, setModalData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, refetch } = useGetRequests();
  const { mutate: approveRequest, isLoading: loadApproveRequest } =
    useApproveRequest();
  const { mutate: updateRequest, isLoading: loadUpdateRequest } =
    useUpdateRequest();

  const handleConfirm = (e, requestId, slackId, statusApprove) => {
    e.stopPropagation();
    Modal.confirm({
      title: "Do you Want to confirm this request?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        approveRequest({ requestId, slackId, statusApprove });
      },
    });
  };

  const handleOpenEdit = (e, record) => {
    e.stopPropagation();
    setModalData(record);
    setOpenModal(true);
  };

  const handleCancelEdit = () => {
    setModalData(null);
    setOpenModal(false);
  };

  const onRow = (record) => {
    return {
      onClick: (e) => {
        e.stopPropagation();
        navigate("/request-detail/" + record.id);
      },
    };
  };

  const onFinish = (values) => {
    updateRequest({
      id: modalData.id,
      values: { ...values, userRequestId: modalData.user.id },
    });
  };

  useEffect(() => {
    if (!loadApproveRequest || !loadUpdateRequest) refetch();
  }, [loadUpdateRequest, loadApproveRequest]);

  const columns = useMemo(() => {
    let column = [
      {
        title: "Request for Day",
        dataIndex: "day",
        key: "day",
        render: (_, record) => {
          const from = new Date(record.from).toLocaleDateString("us-UK", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const to = new Date(record.to).toLocaleDateString("us-UK", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return (
            <label>
              <span>{from} - </span>
              <span>{to}</span>
            </label>
          );
        },
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Requester",
        dataIndex: "user",
        key: "user",
        render: (user) => {
          return <span>{user.username}</span>;
        },
      },
      {
        title: "Status",
        dataIndex: "requestApproves",
        key: "status",
        render: (approves) => {
          const accepts = approves.filter(
            (item) => item.status === STATUS_APPROVAL.ACCEPT
          );
          const rejects = approves.filter(
            (item) => item.status === STATUS_APPROVAL.REJECT
          );
          return (
            <label>
              <span>{accepts.length} Accept</span>
              {" / "}
              <span>{rejects.length} Reject</span>
            </label>
          );
        },
      },
      {
        title: "Request Day",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (time) => {
          return <span>{getTimeElapsedString(new Date(time))}</span>;
        },
      },
    ];
    if (getStorageData(PROFILE).role.name === ROLE.MASTER)
      column = [
        ...column,
        {
          title: "Action",
          key: "action",
          render: (_, record) => {
            return (
              <Space size="small" className="button-action" wrap>
                <Button
                  className="checkout"
                  shape="circle"
                  onClick={(e) =>
                    handleConfirm(
                      e,
                      record.id,
                      record.user.slackId,
                      STATUS_APPROVAL.ACCEPT
                    )
                  }
                >
                  <CheckOutlined />
                </Button>

                <Button
                  className="closeout"
                  shape="circle"
                  onClick={(e) =>
                    handleConfirm(
                      e,
                      record.id,
                      record.user.slackId,
                      STATUS_APPROVAL.REJECT
                    )
                  }
                >
                  <CloseOutlined />
                </Button>

                <Button
                  className="editout"
                  shape="circle"
                  onClick={(e) => handleOpenEdit(e, record)}
                >
                  <EditOutlined />
                </Button>
              </Space>
            );
          },
        },
      ];
    return column;
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        onRow={onRow}
      />
      <Modal
        open={openModal}
        title="Update Request"
        onOk={form.submit}
        onCancel={handleCancelEdit}
        confirmLoading={loadUpdateRequest}
      >
        <Form
          initialValues={
            modalData
              ? {
                  ...modalData,
                  from: formatDate(modalData.from),
                  to: formatDate(modalData.to),
                }
              : null
          }
          form={form}
          onFinish={onFinish}
          name="complex-form"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          className="full-form"
        >
          <Form.Item
            label="Type of day off"
            name="typeRequest"
            rules={[{ required: true, message: "Please select an option!" }]}
          >
            <Radio.Group>
              <Radio value="DayOff">DayOff </Radio>
              <Radio value="WFH">WFH </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="From"
            name="from"
            rules={[
              {
                required: true,
                message: "Date is required.",
              },
              {
                validator: (_, value) => {
                  const date = new Date(value);
                  if (date < new Date()) {
                    return Promise.reject("Date must be in the future");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input className="text-select" type="Date" />
          </Form.Item>
          {/* <Form.Item
              label="Province"
              name="province"
              rules={[
                {
                  required: true,
                  message: "Province is required",
                },
              ]}
            >
              <Select placeholder="Select province" className="select-form">
                <Option value="one">Morning</Option>
                <Option value="two">Afternoon</Option>
                <Option value="three">All day</Option>
              </Select>
            </Form.Item> */}
          <Form.Item
            label="To"
            name="to"
            rules={[
              {
                required: true,
                message: "Date is required.",
              },
            ]}
          >
            <Input placeholder="01-01-2023" type="Date" />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Number is required",
              },
              {
                validator: (_, value) => {
                  if (isNaN(value)) {
                    return Promise.reject("Please enter a valid number");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="0.5, 1, 2,..." />
          </Form.Item>
          <Form.Item
            label="Reason"
            name="reason"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default withAuthorization([
  ROLE.ADMIN,
  ROLE.MANAGER,
  ROLE.MASTER,
  ROLE.STAFF,
])(RequestAccount);
