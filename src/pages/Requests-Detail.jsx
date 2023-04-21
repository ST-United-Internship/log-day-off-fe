import { Descriptions, Form, Radio, Select, Spin } from "antd";
import { Col, Row } from "antd";
import { useMemo, useState } from "react";
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Button, Modal, Input } from "antd";
import "../assets/css/requests.css";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";
import { useGetRequest } from "../hooks/useGeRequest";
import { useApproveRequest } from "../hooks/useApproveRequest";
import { getStorageData } from "../helpers/storage";
import { PROFILE } from "../constants/auth";
import { useUpdateRequest } from "../hooks/useUpdateRequest";

const { Option } = Select;

const RequestDetail = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [form] = Form.useForm();
  const profile = getStorageData(PROFILE);
  const { data, isLoading } = useGetRequest();
  const { mutate: approveRequest, isLoading: loading } = useApproveRequest();
  const { mutate: updateRequest, isLoading: loadUpdateRequest } =
    useUpdateRequest();

  const handleOk = () => {
    approveRequest({
      requestId: data.id,
      slackId: profile.slackId,
      statusApprove: "accept",
    });
  };

  const handleOk1 = () => {
    approveRequest({
      requestId: data.id,
      slackId: profile.slackId,
      statusApprove: "reject",
    });
  };

  const onFinish = (values) => {
    updateRequest({
      id: data.id,
      values: { ...values, userRequestId: profile.id },
    });
  };

  const formatDate = (date) =>
    new Date(date).toISOString().slice(0, 10).split(":")[0];

  const dayoffs = useMemo(
    () =>
      data &&
      data.dayoffs.reduce((prev, curr, index, arr) => {
        const previous = arr[index - 1];
        const clone = JSON.parse(JSON.stringify(prev));
        const currClone = JSON.parse(JSON.stringify(curr));
        if (
          previous &&
          curr.action === previous.action &&
          curr.action === "Request"
        ) {
          currClone.detail = [previous.detail, curr.detail];
        }
        return [...clone, currClone];
      }, []),
    [data]
  );

  if (isLoading) return <Spin />;

  return (
    <Row gutter={30}>
      <Col span={12}>
        <h1>Basic Infomation</h1>
        <Descriptions layout="horizontal" column={1}>
          <Descriptions.Item label="From">
            {new Date(data.from).toLocaleDateString("us-UK", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Descriptions.Item>
          <Descriptions.Item label="To">
            {new Date(data.to).toLocaleDateString("us-UK", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Descriptions.Item>
          <Descriptions.Item label="Quantity">
            {data.quantity}
          </Descriptions.Item>
          <Descriptions.Item label="Reason">{data.reason}</Descriptions.Item>
          <Descriptions.Item label="Status">
            {data.typeRequest}
          </Descriptions.Item>
        </Descriptions>
        <h1>Actions</h1>
        <Button
          className="iconre"
          type="primary"
          icon={<CheckOutlined />}
          onClick={() => setOpenModal(true)}
        />
        <Modal
          open={openModal}
          title="Are you sure ????  "
          onOk={handleOk}
          onCancel={() => setOpenModal(false)}
          okText="Approve"
          okButtonProps={{ loading }}
        />

        <Button
          className="iconre1"
          type="primary"
          icon={<CloseOutlined />}
          onClick={() => setOpenModal1(true)}
        />
        <Modal
          title="Are you sure ???"
          centered
          open={openModal1}
          onOk={handleOk1}
          okText="Reject"
          onCancel={() => setOpenModal1(false)}
          okButtonProps={{ loading }}
        />

        <Button
          className="iconre2"
          type="primary"
          icon={<EditOutlined />}
          onClick={() => setOpenModal2(true)}
        />
        <Modal
          open={openModal2}
          title="Update Request"
          onOk={form.submit}
          onCancel={() => setOpenModal2(false)}
          confirmLoading={loadUpdateRequest}
        >
          <Form
            initialValues={{
              ...data,
              from: formatDate(data.from),
              to: formatDate(data.to),
            }}
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
                <Radio value="Off">Off </Radio>
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
              ]}
            >
              <Input className="text-select" type="Date" />
            </Form.Item>
            <Form.Item
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
            </Form.Item>
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
      </Col>

      <Col span={12}>
        <h1>Histories</h1>
        {dayoffs.map((item) => {
          if (item.detail instanceof Array) {
            return (
              <>
                <div className="reqs">{item.action}</div>
                <div>{item.detail[0].name + " update request"}</div>
                <Row align="middle" justify="center">
                  <Col span={24} md={10}>
                    <Descriptions layout="horizontal" column={1}>
                      <Descriptions.Item label="From">
                        {item.detail[0].From}
                      </Descriptions.Item>
                      <Descriptions.Item label="To">
                        {item.detail[0].To}
                      </Descriptions.Item>
                      <Descriptions.Item label="Quantity">
                        {item.detail[0].quantity}
                      </Descriptions.Item>
                      <Descriptions.Item label="Reason">
                        {item.detail[0].Reason}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                  <Col span={0} md={4}>
                    <ArrowRightOutlined />
                  </Col>
                  <Col span={24} md={10}>
                    <Descriptions layout="horizontal" column={1}>
                      <Descriptions.Item label="From">
                        {item.detail[1].From}
                      </Descriptions.Item>
                      <Descriptions.Item label="To">
                        {item.detail[1].To}
                      </Descriptions.Item>
                      <Descriptions.Item label="Quantity">
                        {item.detail[1].quantity}
                      </Descriptions.Item>
                      <Descriptions.Item label="Reason">
                        {item.detail[1].Reason}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
                <br />
              </>
            );
          }
          return (
            <>
              <div className="reqs">{item.action}</div>
              <div>{item.detail.name + " " + item.detail.value}</div>
              {item.action === "Request" ? (
                <Descriptions layout="horizontal" column={1}>
                  <Descriptions.Item label="From">
                    {item.detail.From}
                  </Descriptions.Item>
                  <Descriptions.Item label="To">
                    {item.detail.To}
                  </Descriptions.Item>
                  <Descriptions.Item label="Quantity">
                    {item.detail.quantity}
                  </Descriptions.Item>
                  <Descriptions.Item label="Reason">
                    {item.detail.Reason}
                  </Descriptions.Item>
                </Descriptions>
              ) : null}
              <br />
            </>
          );
        })}
      </Col>
    </Row>
  );
};

export default withAuthorization([ROLE.ADMIN, ROLE.MANAGER])(RequestDetail);
