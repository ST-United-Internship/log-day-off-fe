import { Table, Button } from "antd";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import "../assets/Information-day-off/informationdayoff.css";
import { useGetRequests } from "../hooks/useGetRequests";
import { getTimeElapsedString } from "../helpers/timeAgo";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";
import { STATUS_APPROVAL } from "../constants/statusApproval";
import { formatDate } from "../helpers/formatDate";

const InformationDayOff = () => {
  const { data, isLoading } = useGetRequests();

  const columns = [
    {
      title: "Request for Day",
      dataIndex: "day",
      key: "day",
      render: (_, record) => {
        const from = formatDate(record.from, "us-UK", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const to = formatDate(record.to, "us-UK", {
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
      dataIndex: "requestApproves",
      key: "status",
      render: (approves) => {
        const accepts = approves.filter(
          (item) => item.status === STATUS_APPROVAL.ACCEPT
        );
        const rejects = approves.filter(
          (item) => item.status === STATUS_APPROVAL.REJECT
        );
        return (
          <label>
            <span>{accepts.length} Accept</span>
            {" / "}
            <span>{rejects.length} Reject</span>
          </label>
        );
      },
    },
    {
      title: "Request Day",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (time) => {
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
        <Table
          columns={columns}
          dataSource={data}
          loading={isLoading}
          rowKey={(record) => record.id}
        />
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
