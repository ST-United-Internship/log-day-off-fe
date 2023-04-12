import { Table, Button } from "antd";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import "../assets/Information-day-off/informationdayoff.css";
const { Column } = Table;
const data = [
  {
    key: "1",
    requestforday: "2022.10.14",
    quantity: "0.5",
    requester: "Khoa Nguyen",
    status: "Approved",
    requestday: "An hourse ago",
  },
  {
    key: "2",
    requestforday: "2022.07.12 - 2022.07.17",
    quantity: "2",
    requester: "Quang Nguyen",
    status: "Rejected",
    requestday: "Two days ago",
  },
  {
    key: "3",
    requestforday: "2022.09.18",
    quantity: "1.5",
    requester: "Thanh Nguyen",
    status: "Reverted",
    requestday: "Yesterday",
  },
];
const InformationDayOff = () => (
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
    </div>

    <Table dataSource={data}>
      <Column
        title="Request for Day"
        dataIndex="requestforday"
        key="frequestforday"
      />
      <Column title="Quantity" dataIndex="quantity" key="quantity" />
      <Column title="Requester" dataIndex="requester" key="requester" />
      <Column title="Status" dataIndex="status" key="status" />
      <Column title="Request Day" dataIndex="requestday" key="requestday" />
    </Table>
  </>
);
export default InformationDayOff;
