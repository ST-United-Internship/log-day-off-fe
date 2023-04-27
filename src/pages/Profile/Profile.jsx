import { Button, Card, Form, Input, Modal } from "antd";
import { useGetAuthProfile } from "../../hooks/useGetAuthProfile";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { EditOutlined } from "@ant-design/icons";
import { useChangePassWord } from "../../hooks/useChangePassworkd";
import { useState } from "react";
import { getStorageData } from "../../helpers/storage";
import { PROFILE } from "../../constants/auth";

const Profile = () => {
  const authUser = getStorageData(PROFILE);
  const { data: profile, isLoading: isLoadingProfile } = useGetAuthProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModalPassword = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { mutate: changePassWord, isLoading: isLoadingChangePassword } =
    useChangePassWord();

  const onChangePassword = (values) => {
    changePassWord({ ...values, userRequestId: authUser.id });
  };
  return (
    <div>
      <LoadingComponent isLoading={isLoadingProfile}>
        <Card style={{ width: 300 }}>
          <p>Name : {profile?.username}</p>
          <p>Email: {profile?.email}</p>
          <p>Gender: {profile?.gender}</p>
          <p>SlackID: {profile?.slackId}</p>
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
                  name="oldPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please select a date",
                    },
                  ]}
                >
                  <Input placeholder="password" type="Input" />
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
                  ]}
                >
                  <Input placeholder="password" type="Input" />
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
                  ]}
                >
                  <Input placeholder="password" type="Input" />
                </Form.Item>
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </LoadingComponent>
    </div>
  );
};

export default Profile;
