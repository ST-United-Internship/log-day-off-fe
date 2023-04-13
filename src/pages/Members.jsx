import { Table } from "antd";

const data = [
  {
    key: "1",
    col1: "Data 1",
    col2: "Data 2",
  },
  {
    key: "2",
    col1: "Data 3",
    col2: "Data 4",
  },
  {
    key: "3",
    col1: "Data 5",
    col2: "Data 6",
  },
  {
    key: "4",
    col1: "Data 7",
    col2: "Data 8",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "col1",
    key: "col1",
    width: "30%",
  },

  {
    title: "Email",
    dataIndex: "col2",
    key: "col2",
  },
];

const Members = () => {
  return <Table dataSource={data} columns={columns} pagination={false} />;
};

export default Members;
