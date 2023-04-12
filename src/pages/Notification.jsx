import { Form, Input, Switch } from "antd";
import "../assets/notification/notification.css";
const Notification = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <Form onFinish={onFinish}>
      <div>
        <h3>Slack</h3>
      </div>
      <Form.Item label="Day off channel">
        <Input.TextArea className="noti-text-mot" rows={4} />
      </Form.Item>

      <Form.Item label="HR channel">
        <Input.TextArea className="noti-text-hai " rows={4} />
      </Form.Item>

      <Form.Item
        label="Mapping user by email"
        className="switchButton"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
    </Form>
  );
};
export default Notification;
