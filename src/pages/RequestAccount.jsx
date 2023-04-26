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
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, refetch } = useGetRequests();
  const { mutate: approveRequest, isLoading: loadApproveRequest } =
    useApproveRequest();
  const { mutate: updateRequest, isLoading: loadUpdateRequest } =
    useUpdateRequest();

  const authUser = getStorageData(PROFILE);

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
    form.setFieldsValue({
      ...record,
      from: formatDate(record.from),
      to: formatDate(record.to),
    });
    setOpenModal(true);
  };

  const handleCancelEdit = () => {
    form.setFieldsValue(null);
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
      id: form.getFieldValue("id"),
      values: { ...values, userRequestId: form.getFieldValue("user").id },
    });
  };

  useEffect(() => {
    refetch();
  }, [loadUpdateRequest, loadApproveRequest]);

  const columns = useMemo(() => {
    return [
      {
        title: "Request for Day",
        dataIndex: "day",
        key: "day",
        render: (_, record) => {
          const from = formatDate(record.from, "us-UK", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const to = formatDate(record.to, "us-UK", {
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
        render: (approves, record) => {
          const isChanged =
            record.dayoffs.length &&
            record.dayoffs[record.dayoffs.length - 1].action === "Request";
          const rejects = approves.some(
            (item) => item.status === STATUS_APPROVAL.REJECT
          );
          const accepts = approves.filter(
            (item) => item.status === STATUS_APPROVAL.ACCEPT
          );
          if (rejects) return <label>Rejected</label>;
          else if (accepts.length)
            return <label>Approved ({accepts.length})</label>;
          else if (isChanged) return <label>Request Changed</label>;
          return <label>Requested</label>;
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
      {
        title: "Action",
        key: "action",
        render: (_, record) => {
          const acceptedBy = record.requestApproves.some(
            (item) => item.user.id && item.status === STATUS_APPROVAL.ACCEPT
          );
          const isRejected = record.requestApproves.some(
            (item) => item.status === STATUS_APPROVAL.REJECT
          );

          if (isRejected) return <label>No action required</label>;
          return (
            <Space className="button-action" wrap>
              {authUser.role.name === ROLE.MASTER ? (
                <>
                  {acceptedBy ? null : (
                    <Button
                      className="checkout"
                      shape="circle"
                      onClick={(e) =>
                        handleConfirm(
                          e,
                          record.id,
                          authUser.slackId,
                          STATUS_APPROVAL.ACCEPT
                        )
                      }
                    >
                      <CheckOutlined />
                    </Button>
                  )}

                  <Button
                    className="closeout"
                    shape="circle"
                    onClick={(e) =>
                      handleConfirm(
                        e,
                        record.id,
                        authUser.slackId,
                        STATUS_APPROVAL.REJECT
                      )
                    }
                  >
                    <CloseOutlined />
                  </Button>
                </>
              ) : null}

              {authUser.id === record.user.id ? (
                <Button
                  className="editout"
                  shape="circle"
                  onClick={(e) => handleOpenEdit(e, record)}
                >
                  <EditOutlined />
                </Button>
              ) : null}
            </Space>
          );
        },
      },
    ];
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
                  const to = new Date(form.getFieldValue("to"));
                  if (date < new Date()) {
                    return Promise.reject("Date must be in the future");
                  } else if (date > to)
                    return Promise.reject(
                      "Date 'from' must be smaller than 'to'"
                    );
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
              {
                validator: (_, value) => {
                  const date = new Date(value);
                  const from = new Date(form.getFieldValue("from"));
                  if (date < new Date()) {
                    return Promise.reject("Date must be in the future");
                  } else if (date < from)
                    return Promise.reject(
                      "Date 'to' must be larger than 'from'"
                    );
                  return Promise.resolve();
                },
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
