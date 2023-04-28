import { Button, Card, Form, Input, Modal, Space } from "antd";
import { useGetAuthProfile } from "../../hooks/useGetAuthProfile";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { EditOutlined } from "@ant-design/icons";
import { useChangePassWord } from "../../hooks/useChangePassworkd";
import { useState } from "react";
import { getStorageData } from "../../helpers/storage";
import { PROFILE } from "../../constants/auth";
import { useChangeUserName } from "../../hooks/useChangeUserNamel";

const Profile = () => {
  const authUser = getStorageData(PROFILE);
  const { data: profile, isLoading: isLoadingProfile } = useGetAuthProfile();
  const [isModalOpenUserName, setIsModalOpenUserName] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModalPassword = () => {
    setIsModalOpen(true);
  };
  const showModalUserName = () => {
    setIsModalOpenUserName(true);
  };

  const handCancelUserName = () => {
    setIsModalOpenUserName(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { mutate: changePassWord, isLoading: isLoadingChangePassword } =
    useChangePassWord();

  const onChangePassword = (values) => {
    changePassWord({ ...values, userRequestId: authUser.id });
  };

  const { mutate: changeUserName, isLoading: isLoadingChangeUserName } =
    useChangeUserName();

  const onChangeUserName = (values) => {
    changeUserName({ ...values, userRequestId: authUser.id });
  };
  return (
    <div>
      <LoadingComponent isLoading={isLoadingProfile}>
        <Card style={{ width: 400 }}>
          <p>Name : {profile?.username}</p>
          <p>Email: {profile?.email}</p>
          <p>Gender: {profile?.gender}</p>
          <p>SlackID: {profile?.slackId}</p>
          <Space>
            <Button onClick={showModalPassword}>
              <EditOutlined />
              Change Password
            </Button>
            <Modal
              title="Change Password"
              open={isModalOpen}
              onCancel={handleCancel}
              onOk={form.submit}
              confirmLoading={isLoadingChangePassword}
              destroyOnClose={true}
            >
              <Form onFinish={onChangePassword} preserve={false} form={form}>
                <Form.Item
                  label="Old Password"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    label="Old Password"
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    <Form.Item
                      name="oldPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please select a date",
                        },
                        {
                          validator: (rule, value) => {
                            if (!/[A-Z]/.test(value)) {
                              return Promise.reject(
                                "Password must contain at least one uppercase letter"
                              );
                            }
                            if (!/[a-z]/.test(value)) {
                              return Promise.reject(
                                "Password must contain at least one lowercase letter"
                              );
                            }
                            if (!/\d/.test(value)) {
                              return Promise.reject(
                                "Password must contain at least one number"
                              );
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <Input.Password placeholder="password" type="Input" />
                    </Form.Item>
                  </Form.Item>
                </Form.Item>
                <Form.Item
                  label="New Password"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please select a date",
                      },
                      {
                        validator: (rule, value) => {
                          if (!/[A-Z]/.test(value)) {
                            return Promise.reject(
                              "Password must contain at least one uppercase letter"
                            );
                          }
                          if (!/[a-z]/.test(value)) {
                            return Promise.reject(
                              "Password must contain at least one lowercase letter"
                            );
                          }
                          if (!/\d/.test(value)) {
                            return Promise.reject(
                              "Password must contain at least one number"
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input.Password placeholder="password" type="Input" />
                  </Form.Item>
                </Form.Item>
                <Form.Item
                  label="Confirm Password"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    name="newPasswordConfirm"
                    rules={[
                      {
                        required: true,
                        message: "Please select a date",
                      },
                      {
                        validator: (rule, value) => {
                          if (!/[A-Z]/.test(value)) {
                            return Promise.reject(
                              "Password must contain at least one uppercase letter"
                            );
                          }
                          if (!/[a-z]/.test(value)) {
                            return Promise.reject(
                              "Password must contain at least one lowercase letter"
                            );
                          }
                          if (!/\d/.test(value)) {
                            return Promise.reject(
                              "Password must contain at least one number"
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input.Password placeholder="password" type="Input" />
                  </Form.Item>
                </Form.Item>
              </Form>
            </Modal>
            <Button onClick={showModalUserName}>
              <EditOutlined />
              Change Name
            </Button>
            <Modal
              title="Change name"
              open={isModalOpenUserName}
              onCancel={handCancelUserName}
              onOk={form.submit}
              confirmLoading={isLoadingChangeUserName}
              destroyOnClose={true}
            >
              <Form onFinish={onChangeUserName} preserve={false} form={form}>
                <Form.Item
                  name="newUserName"
                  rules={[
                    {
                      required: true,
                      message: "Please select a date",
                    },
                  ]}
                >
                  <Input placeholder="new name" type="Input" />
                </Form.Item>
              </Form>
            </Modal>
          </Space>
        </Card>
      </LoadingComponent>
    </div>
  );
};

export default Profile;
