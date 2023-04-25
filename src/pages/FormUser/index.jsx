import { Button, Form, Input, Radio, Grid, Select } from "antd";
import { ROLE } from "../../constants/roles";
import { getStorageData } from "../../helpers/storage";
import withAuthorization from "../../HOCs/withAuthorization";
import { useCreateManager } from "../../hooks/useCreateManager";
import { useCreateStaff } from "../../hooks/useCreateStaff";
import { PROFILE } from "../../constants/auth";
import "./formuser.css";
import { useEffect } from "react";

const { Option } = Select;
const { useBreakpoint } = Grid;

const FormUser = () => {
  const {
    mutate: createStaff,
    isLoading: loadingStaff,
    isError: errorStaff,
    isSuccess: successStaff,
  } = useCreateStaff();
  const {
    mutate: createManager,
    isLoading: loadingMana,
    isError: errorMana,
    isSuccess: successMana,
  } = useCreateManager();
  const { md } = useBreakpoint();
  const authUser = getStorageData(PROFILE);

  const [form] = Form.useForm();
  useEffect(() => {
    if (!errorStaff || !errorMana) {
      form.resetFields();
    }
    if (successStaff || successMana) {
      form.resetFields();
    }
  }, [errorStaff, errorStaff, successStaff, successMana]);

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

  const selectRoles =
    (authUser.role.name === ROLE.ADMIN && [
      ROLE.MANAGER,
      ROLE.MASTER,
      ROLE.STAFF,
    ]) ||
    (authUser.role.name === ROLE.MANAGER && [ROLE.MASTER, ROLE.STAFF]);

  const formLayout = md
    ? { labelCol: { span: 4 }, wrapperCol: { span: 20 }, layout: "horizontal" }
    : {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
        layout: "vertical",
      };

  return (
    <Form
      className="form-user"
      onFinish={onFinish}
      form={form}
      labelAlign="left"
      {...formLayout}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Username" size="large" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Password" size="large" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input type="email" placeholder="Email" size="large" />
      </Form.Item>

      <Form.Item
        label="Slack ID"
        name="slackId"
        rules={[{ required: true, message: "Please input your slack id!" }]}
      >
        <Input placeholder="Your Slack Id" size="large" />
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select an option!" }]}
        initialValue={"male"}
      >
        <Radio.Group>
          <Radio value={"male"}>Male</Radio>
          <Radio value={"female"}>Female</Radio>
          <Radio value={"other"}>Other</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="roleName"
        label="Role"
        rules={[{ required: true, message: "Please select an role!" }]}
        initialValue={selectRoles[0]}
      >
        <Select>
          {selectRoles.map((role) => (
            <Option key={role} value={role}>
              {role[0].toUpperCase() + role.slice(1)}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          className="button-submit"
          htmlType="submit"
          size="large"
          loading={loadingStaff || loadingMana}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default withAuthorization([ROLE.ADMIN, ROLE.MANAGER])(FormUser);
