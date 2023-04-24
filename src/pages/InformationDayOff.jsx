import { Table, Button } from "antd";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import "../assets/Information-day-off/informationdayoff.css";
import { useGetRequests } from "../hooks/useGetRequests";
import { getTimeElapsedString } from "../helpers/timeAgo";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";

const InformationDayOff = () => {
  const { data, isLoading } = useGetRequests();
  console.log(data);
  const columns = [
    {
      title: "Request for Day",
      dataIndex: "day",
      key: "day",
      render: (_, record) => {
        const from = new Date(record.from).toLocaleDateString("us-UK", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const to = new Date(record.to).toLocaleDateString("us-UK", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return (
          <label>
            <span>{from} - </span>
            <span>{to}</span>
          </label>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Requester",
      dataIndex: "user",
      key: "user",
      render: (user) => {
        return <span key={user.id}>{user.username}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Request Day",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (time) => {
        console.log(new Date(time));
        return <span>{getTimeElapsedString(new Date(time))}</span>;
      },
    },
  ];
  return (
    <>
      <div className="button-dayoff">
        <Button className="checkout-df">
          <CheckOutlined /> Approved day off
        </Button>
        <Button className="closeout-df">
          <CloseOutlined /> Rejected day off
        </Button>
        <Button className="editout-df">
          <EditOutlined /> Reverted day off
        </Button>
        <Table columns={columns} dataSource={data} loading={isLoading} />
      </div>
    </>
  );
};

export default withAuthorization([
  ROLE.ADMIN,
  ROLE.MANAGER,
  ROLE.MASTER,
  ROLE.STAFF,
])(InformationDayOff);
