import { Table, Space, Button } from "antd";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import "../assets/reuqest-account/requestaccount.css";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";
const columns = [
  {
    title: "Request for Day",
    dataIndex: "day",
    key: "day",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Requester",
    dataIndex: "requester",
    key: "requester",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Request Day",
    dataIndex: "requestday",
    key: "requestday",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="large">
        <div className="button-action">
          <Button className="checkout" shape="circle">
            <CheckOutlined />
          </Button>
          <Button className="closeout" shape="circle">
            <CloseOutlined />
          </Button>
          <Button className="editout" shape="circle">
            <EditOutlined />
          </Button>
        </div>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    day: "2022.14.10",
    quantity: 0.5,
    requester: "Khoa Nguyen",
    status: "Requested",
    requestday: "An Hourse Ago",
  },
  {
    key: "2",
    day: "2022.10.16 - 2022.10.28",
    quantity: 2,
    requester: "Quang Nguyen",
    status: "Request Change",
    requestday: "Two Days Ago",
  },
  {
    key: "3",
    day: "2022.07.04 - 2022.07.20",
    quantity: 3,
    requester: "Thanh Nguyen",
    status: "Approved (2/3)",
    requestday: "Yesterday",
  },
];
const RequestAccount = () => <Table columns={columns} dataSource={data} />;
export default withAuthorization([ROLE.ADMIN, ROLE.MANAGER])(RequestAccount);
