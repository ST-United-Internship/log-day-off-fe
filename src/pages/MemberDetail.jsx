import { Button, Form, Input } from "antd";
import "../assets/css/MemberDetailLDO/MemberDetail.css";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const onFinish = (values) => {
  console.log(values);
};
const MemberDetail = () => (
  <div>
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      validateMessages={validateMessages}
    >
      <div className="title-text">
        <h2>Basic Information</h2>
      </div>
      <Form.Item
        name={["user", "name"]}
        label="First Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Khoa" />
      </Form.Item>
      <Form.Item
        name={["user", "name"]}
        label="Last Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Nguyen" />
      </Form.Item>
      <Form.Item
        name={["user", "email"]}
        label="Email"
        rules={[
          {
            required: true,
            type: "email",
          },
        ]}
      >
        <Input placeholder="KhoaNguyen@gmail.com" />
      </Form.Item>
      <Form.Item
        name={["user", "name"]}
        label="Slack Id"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="12345" />
      </Form.Item>
      <div className="wrap-btn">
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit" className="wrap-left">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" className="wrap-right">
            Send
          </Button>
        </Form.Item>
      </div>
    </Form>
  </div>
);
export default MemberDetail;
