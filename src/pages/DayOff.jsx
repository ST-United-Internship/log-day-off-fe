import { Button, Form, Input, Radio, Select, Space } from "antd";
import "../assets/css/DayOffLDO/DayOff.css";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";
import { useCreateRequest } from "../hooks/useCreateRequest";
import { PROFILE } from "../constants/auth";
import { getStorageData } from "../helpers/storage";

const DayOff = () => {
  const { mutate: createRequest } = useCreateRequest();
  const authUser = getStorageData(PROFILE);
  const onFinish = (values) => {
    switch (authUser.role.name) {
      case ROLE.ADMIN:
        createRequest({ ...values, userRequestId: authUser.id });
        break;
      case ROLE.MANAGER:
        createRequest({ ...values, userRequestId: authUser.id });
        break;
      case ROLE.STAFF:
        createRequest({ ...values, userRequestId: authUser.id });
        break;
      default:
        break;
    }
  };
  return (
    <div className="main-container">
      <Form
        onFinish={onFinish}
        name="complex-form"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        className="full-form"
      >
        <Form.Item
          label="Type of day off"
          initialValue={1}
          name="typeRequest"
          rules={[{ required: true, message: "Please select an option!" }]}
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value={1}>Off </Radio>
              <Radio value={2}>WFH </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <div className="form-container">
          <Form.Item label="From" className="full-form">
            <Input.Group compact>
              <Form.Item
                name="from"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Date is required.",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "200px",
                  }}
                  placeholder="01-01-2023"
                  className="text-select"
                />
              </Form.Item>
              <Form.Item
                name={["province", "province"]}
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Province is required",
                  },
                ]}
              >
                <Select
                  placeholder="Select province"
                  style={{ width: "200px" }}
                  className="select-form"
                >
                  <Option value="one">Morning</Option>
                  <Option value="two">Afternoon</Option>
                  <Option value="three">All day</Option>
                </Select>
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </div>
        <Form.Item
          label="To"
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="to"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: "inline-block",
              width: "200px",
            }}
          >
            <Input placeholder="01-01-2023" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Quantity">
          <Space>
            <Form.Item
              name="quantity"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Number is required",
                },
              ]}
            >
              <Input
                style={{
                  width: "200px",
                }}
                placeholder="0.5, 1, 2,..."
              />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item
          label="Reason"
          name="reason"
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="reason"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: "inline-block",
              width: "200px",
            }}
          >
            <Input.TextArea
              showCount
              maxLength={100}
              style={{ width: "200px" }}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item label=" " colon={false} className="full-btn">
          <Button type="primary" className="btn-cancel">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default withAuthorization([ROLE.MANAGER, ROLE.STAFF, ROLE.ADMIN])(
  DayOff
);
