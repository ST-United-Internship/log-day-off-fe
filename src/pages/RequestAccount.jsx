import { Table, Space, Button, Modal } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import "../assets/reuqest-account/requestaccount.css";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";
import timeAgo from "../helpers/timeAgo";
import { useGetRequests } from "../hooks/useGetRequests";
import { useApproveRequest } from "../hooks/useApproveRequest";
import { getStorageData } from "../helpers/storage";
import { PROFILE } from "../constants/auth";

const RequestAccount = () => {
  const { data, isLoading } = useGetRequests();
  const { mutate: approveRequest } = useApproveRequest();
  const handleConfirm = (requestId, slackId, statusApprove) => {
    Modal.confirm({
      title: "Do you Want to confirm this request?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        approveRequest({ requestId, slackId, statusApprove });
      },
    });
  };

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
        return <span>{timeAgo(time)}</span>;
      },
    },
  ];

  if (getStorageData(PROFILE).role === ROLE.MASTER)
    columns.push({
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small" className="button-action" wrap>
          <Button
            className="checkout"
            shape="circle"
            onClick={() =>
              handleConfirm(record.id, record.user.slackId, "accept")
            }
          >
            <CheckOutlined />
          </Button>
          <Button className="closeout" shape="circle">
            <CloseOutlined />
          </Button>
          <Button className="editout" shape="circle">
            <EditOutlined />
          </Button>
        </Space>
      ),
    });

  return <Table columns={columns} dataSource={data} loading={isLoading} />;
};

export default withAuthorization([ROLE.ADMIN, ROLE.MANAGER, ROLE.MASTER])(
  RequestAccount
);
