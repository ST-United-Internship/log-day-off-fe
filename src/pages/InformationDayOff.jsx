import { Table, Button } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import "../assets/Information-day-off/informationdayoff.css";
import { useGetRequests } from "../hooks/useGetRequests";
import { getTimeElapsedString } from "../helpers/timeAgo";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";
import { STATUS_APPROVAL } from "../constants/statusApproval";
import { formatDate } from "../helpers/formatDate";
import { useState } from "react";

const InformationDayOff = () => {
  const { data, isLoading } = useGetRequests();
  const [statusFilter, setStatusFilter] = useState(null);

  const handleApprovedFilter = () => {
    setStatusFilter(STATUS_APPROVAL.ACCEPT);
  };

  const handleRejectedFilter = () => {
    setStatusFilter(STATUS_APPROVAL.REJECT);
  };

  const handleRevertedFilter = () => {
    setStatusFilter(null);
  };

  const filteredData = statusFilter
    ? data.filter((item) => {
        const approves = item.requestApproves.filter(
          (item) => item.status === statusFilter
        );
        return approves.length > 0;
      })
    : data;

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
        <Button className="checkout-df" onClick={handleApprovedFilter}>
          <CheckOutlined /> Approved day off
        </Button>
        <Button className="closeout-df" onClick={handleRejectedFilter}>
          <CloseOutlined /> Rejected day off
        </Button>
        <Button className="editout-df" onClick={handleRevertedFilter}>
          <RollbackOutlined /> Reverted lists day off
        </Button>
        <Table
          columns={columns}
          dataSource={filteredData}
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
