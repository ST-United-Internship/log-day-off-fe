import { Col, Row, Input, Button, Form } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import "../assets/login/login.css";
import { useState } from "react";

const GmailLoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="login-session">
      <Row className="login-container">
        <Col className="left_side_login" span={12}></Col>
        <Col className="right_side_login" span={24} lg={12}>
          <Form className="form-login">
            <Form.Item className="form-logo">
              <img
                className="login-image"
                src="https://res.cloudinary.com/da3bmd8ak/image/upload/v1681356223/Logo.png"
              />
            </Form.Item>
            <h1>Welcome Back</h1>

            <p>Login to the Dashboard</p>

            <Form.Item
              className="form-name"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                className="input-name"
                placeholder="Enter your email"
                prefix={<UserOutlined className="site-form-item-icon" />}
                size="large"
              />
            </Form.Item>

            <Form.Item
              className="form-password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                className="input-password"
                placeholder="Input password"
                prefix={<KeyOutlined className="site-form-item-icon" />}
                size="large"
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
              />
            </Form.Item>

            <Form.Item className="sub-btn">
              <Button htmlType="submit" size="large">
                GET START
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default GmailLoginForm;
