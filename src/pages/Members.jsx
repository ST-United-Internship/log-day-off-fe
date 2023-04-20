/* eslint-disable no-unused-vars */
import { Table } from "antd";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";
import { useGetAllUsers } from "../hooks/useGetAllUsers";

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
  const { data: allUser, isLoading: loadAllUser } = useGetAllUsers();
  console.log(allUser);
  return <Table dataSource={data} columns={columns} pagination={false} />;
};

export default withAuthorization([ROLE.MANAGER, ROLE.ADMIN])(Members);
