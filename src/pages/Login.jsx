import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import "../assets/login/login.css";

const GmailLoginForm = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="nen">
      <Form name="basic" onFinish={onFinish}>
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Col xs={22} sm={16} md={12} lg={8}>
            <div className="login-form">
              <h1>
                <img
                  className="login-logo"
                  src="https://a.slack-edge.com/80588/marketing/img/meta/slack_hash_256.png"
                  alt=""
                />
              </h1>
              <h1 className="login-form__title">Gmail Login</h1>
              <Form.Item
                className="email-form"
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email",
                  },
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                className="rem"
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form__button"
                >
                  Log in
                </Button>
              </Form.Item>

              <div className="login-form__or">OR</div>

              <Button
                type="primary"
                icon={<GoogleOutlined />}
                className="login-form__button"
                onClick={() => {
                  // Handle Google login here
                }}
              >
                Log in with Google
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default GmailLoginForm;
