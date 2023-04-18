import { Button, Form, Input, Radio, Select, Space } from "antd";
import { useState } from "react";
import "../assets/css/DayOffLDO/DayOff.css";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";

const DayOff = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="main-container">
      <Form
        name="complex-form"
        onFinish={onFinish}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        className="full-form"
      >
        <Form.Item label="Type of day off">
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={1}>Off </Radio>
              <Radio value={2}>WFH </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <div className="form-container">
          <Form.Item label="From" className="full-form">
            <Input.Group compact>
              <Form.Item
                name={["from", "date"]}
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Date is required",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "200px",
                  }}
                  placeholder="01-01-2023"
                  className="text-select"
                />
                <Form.Item
                  name={["province", "province"]}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Province is required",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select province"
                    style={{ width: "200px" }}
                    className="select-form"
                  >
                    <Option value="Zhejiang">Morning</Option>
                    <Option value="Jiangsu">Afternoon</Option>
                    <Option value="Jiangsu">All day</Option>
                  </Select>
                </Form.Item>
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </div>
        <Form.Item
          label="To"
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="date"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: "inline-block",
              width: "200px",
            }}
          >
            <Input placeholder="01-01-2023" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Quantity">
          <Space>
            <Form.Item
              name="quantity"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Number is required",
                },
              ]}
            >
              <Input
                style={{
                  width: "200px",
                }}
                placeholder="0.5, 1, 2,..."
              />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item
          label="Reason"
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="reason"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: "inline-block",
              width: "200px",
            }}
          >
            <Input.TextArea
              showCount
              maxLength={100}
              style={{ width: "200px" }}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item label=" " colon={false} className="full-btn">
          <Button type="primary" htmlType="submit" className="btn-cancel">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default withAuthorization([ROLE.STAFF, ROLE.STAFF])(DayOff);
