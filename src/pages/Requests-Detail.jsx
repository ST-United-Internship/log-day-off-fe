import { Table } from "antd";
import { Col, Row } from "antd";
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import "../assets/css/requests.css";

const columns = [
  {
    title: "Column 1",
    dataIndex: "col1",
    key: "col1",
    render: () => "Data",
    width: "30%",
  },
  {
    title: "Column 2",
    dataIndex: "col2",
    key: "col2",
  },
];

const data = [
  {
    key: "1",
  },
  {
    key: "2",
  },
  {
    key: "3",
  },
  {
    key: "4",
  },
  {
    key: "5",
  },
  {
    key: "6",
  },
];

const TableExample = () => {
  const tableStyle = {
    width: "90%",
  };
  return (
    <>
      <Row>
        <Col span={12}>
          <div>
            <h1>Basic Infomation</h1>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              style={tableStyle}
            />
            <h1>Actions</h1>
            <Button
              className="iconre"
              type="primary"
              icon={<CheckOutlined />}
            />
            <Button
              className="iconre"
              type="primary"
              icon={<CloseOutlined />}
            />
            <Button
              className="iconre"
              type="primary"
              icon={<ReloadOutlined />}
            />
            <Button className="iconre" type="primary" icon={<EditOutlined />} />
          </div>
        </Col>
        <Col span={12}>
          <div>
            <h1>Histories</h1>
            <div className="reqs"> Request</div>
            <br />
            <div className="reqs"> Approved</div>
            <br />

            <div className="reqs"> Request Change</div>
            <br />
            <div className="reqs"> Request</div>
            <br />
            <div className="reqs"> Approved</div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default TableExample;
