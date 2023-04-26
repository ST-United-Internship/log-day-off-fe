import { Button, Form, Input, Radio, Select, Space } from "antd";
import "../assets/css/DayOffLDO/DayOff.css";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";
import { useCreateRequest } from "../hooks/useCreateRequest";
import { PROFILE } from "../constants/auth";
import { getStorageData } from "../helpers/storage";
import { Notification } from "../components/Notifications/notification";
import { NOTIFICATION } from "../constants/notification";

const DayOff = () => {
  const { mutate: createRequest } = useCreateRequest();
  const authUser = getStorageData(PROFILE);
  const onFinish = (values) => {
    const fromMilli = new Date(values.from).getTime();
    const toMilli = new Date(values.to).getTime();
    if (fromMilli <= toMilli)
      createRequest({ ...values, userRequestId: authUser.id });
    else
      Notification(
        NOTIFICATION.ERROR,
        "Date 'to' should be larger or equal than date 'from'"
      );
  };
  return (
    <div className="main-container">
      <Form
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
          initialValue="DayOff"
          name="typeRequest"
          rules={[{ required: true, message: "Please select an option!" }]}
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="DayOff">DayOff </Radio>
              <Radio value="WFH">WFH </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <div className="form-container">
          <Form.Item label="From" className="full-form">
            <Input.Group compact>
              <Form.Item
                name="from"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please select a date",
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
                <Input
                  style={{
                    width: "200px",
                  }}
                  placeholder="01-01-2023"
                  className="text-select"
                  type="Date"
                />
              </Form.Item>
              <Form.Item
                name={["section", "section"]}
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Section is required",
                  },
                ]}
              >
                <Select
                  placeholder="Select section"
                  style={{ width: "200px" }}
                  className="select-form"
                >
                  <Option value="one">Morning</Option>
                  <Option value="two">Afternoon</Option>
                  <Option value="three">All day</Option>
                </Select>
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
            name="to"
            rules={[
              {
                required: true,
                message: "Please select a date",
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
            style={{
              display: "inline-block",
              width: "200px",
            }}
          >
            <Input placeholder="01-01-2023" type="Date" />
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
                  message: "Please enter a number",
                },
                {
                  validator: (_, value) => {
                    if (isNaN(value)) {
                      return Promise.reject("Please enter a valid number");
                    }
                    if (value < 0) {
                      return Promise.reject("Please enter a positive number");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                type="number"
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
          name="reason"
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
          <Button type="primary" className="btn-cancel">
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
export default withAuthorization([
  ROLE.MANAGER,
  ROLE.STAFF,
  ROLE.ADMIN,
  ROLE.MASTER,
])(DayOff);
