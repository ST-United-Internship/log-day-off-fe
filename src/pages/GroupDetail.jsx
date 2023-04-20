import { Form, Input, Button } from "antd";
import { useState } from "react";
import "../assets/groupdetail/groupdetail.css";
import { ROLE } from "../constants/roles";
import withAuthorization from "../HOCs/withAuthorization";
const { TextArea } = Input;

const GroupDetail = () => {
  const [form] = Form.useForm();
  const [setFormData] = useState(null);

  const onFinish = (values) => {
    setFormData(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onCancel = () => {
    setFormData(null);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      className="group-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div>
        <h3>Basic Information</h3>
      </div>
      <Form.Item label="Name" className="vung1">
        <TextArea className="otext1" rows={1} />
      </Form.Item>

      <Form.Item label="Masters" className="vung2">
        <TextArea className="otext2" rows={4} />
      </Form.Item>

      <Form.Item label="Members" className="vung3">
        <TextArea className="otext3" rows={4} />
      </Form.Item>

      <Form.Item>
        <Button className="nut-group-mot" type="primary" htmlType="submit">
          Send
        </Button>

        <Button className="nut-group-hai" type="default" onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default withAuthorization([ROLE.MANAGER, ROLE.ADMIN])(GroupDetail);
