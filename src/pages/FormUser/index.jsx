import { Button, Form, Input, Radio, Grid } from "antd";
import { ROLE } from "../../constants/roles";
import { getStorageData } from "../../helpers/storage";
import withAuthorization from "../../HOCs/withAuthorization";
import { useCreateManager } from "../../hooks/useCreateManager";
import { useCreateStaff } from "../../hooks/useCreateStaff";
import { PROFILE } from "../../constants/auth";
import "./formuser.css";

const { useBreakpoint } = Grid;

const FormUser = () => {
  const { mutate: createStaff } = useCreateStaff();
  const { mutate: createManager } = useCreateManager();
  const { md } = useBreakpoint();
  const authUser = getStorageData(PROFILE);

  const onFinish = (values) => {
    switch (authUser.role.name) {
      case ROLE.MANAGER:
        createStaff(values);
        break;
      case ROLE.ADMIN:
        createManager(values);
        break;
      default:
        break;
    }
  };

  const formLayout = md
    ? { labelCol: { span: 4 }, wrapperCol: { span: 20 }, layout: "horizontal" }
    : {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
        layout: "vertical",
      };

  return (
    <Form className="form-user" onFinish={onFinish} {...formLayout}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
        labelAlign="left"
      >
        <Input placeholder="Username" size="large" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
        labelAlign="left"
      >
        <Input.Password placeholder="Password" size="large" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
        labelAlign="left"
      >
        <Input type="email" placeholder="Email" size="large" />
      </Form.Item>

      <Form.Item
        label="Slack ID"
        name="slackId"
        rules={[{ required: true, message: "Please input your slack id!" }]}
        labelAlign="left"
      >
        <Input placeholder="Your Slack Id" size="large" />
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select an option!" }]}
        initialValue={"male"}
        labelAlign="left"
      >
        <Radio.Group>
          <Radio value={"male"}>Male</Radio>
          <Radio value={"female"}>Female</Radio>
          <Radio value={"other"}>Other</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" size="large">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default withAuthorization([ROLE.ADMIN, ROLE.MANAGER])(FormUser);
