import { Table } from "antd";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Member (s)",
    dataIndex: "member",
    defaultSortOrder: "descend",
  },
  {
    title: "Master (s)",
    dataIndex: "master",
  },
];
const data = [
  {
    key: "1",
    name: "HR",
    member: "API o day",
    master: "api o day",
  },
  {
    key: "2",
    name: "KAS",
    member: "API o day ",
    master: "api o day",
  },
];

const Group = () => (
  <>
    <Table columns={columns} dataSource={data} />
  </>
);
export default withAuthorization([ROLE.MANAGER])(Group);
