import { Form, Input, Switch } from "antd";
import "../assets/notification/notification.css";
import { ROLE } from "../constants/roles";
import withAuthorization from "../HOCs/withAuthorization";
const Notification = () => {
  return (
    <Form>
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
export default withAuthorization([ROLE.MANAGER])(Notification);
