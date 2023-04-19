import { Table } from "antd";
import { Col, Row } from "antd";
import { useState } from "react";
import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Modal, Input } from "antd";
import "../assets/css/requests.css";
import withAuthorization from "../HOCs/withAuthorization";
import { ROLE } from "../constants/roles";

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
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const [modal2Open, setModal2Open] = useState(false);

  const [loading1, setLoading1] = useState(false);
  const [open1, setOpen1] = useState(false);
  const showModal1 = () => {
    setOpen1(true);
  };
  const handleOk1 = () => {
    setLoading1(true);
    setTimeout(() => {
      setLoading1(false);
      setOpen1(false);
    }, 1000);
  };
  const handleCancel1 = () => {
    setOpen1(false);
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
              onClick={showModal}
            />
            <Modal
              open={open}
              title="Are you sure ????  "
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button
                  key="Approve"
                  type="primary"
                  loading={loading}
                  onClick={handleOk}
                >
                  Approve
                </Button>,
              ]}
            ></Modal>

            <Button
              className="iconre1"
              type="primary"
              icon={<CloseOutlined />}
              onClick={() => setModal2Open(true)}
            />
            <Modal
              title="Are you sure ???"
              centered
              open={modal2Open}
              onOk={() => setModal2Open(false)}
              onCancel={() => setModal2Open(false)}
            ></Modal>

            <Button
              className="iconre2"
              type="primary"
              icon={<EditOutlined />}
              onClick={showModal1}
            />
            <Modal
              open={open1}
              title="Are you sure ????  "
              onOk={handleOk1}
              onCancel={handleCancel1}
              footer={[
                <p>
                  <Input.TextArea></Input.TextArea>
                </p>,
                <Button key="back" onClick={handleCancel1}>
                  Cancel
                </Button>,
                <Button
                  key="Approve"
                  type="primary"
                  loading={loading1}
                  onClick={handleOk1}
                >
                  send
                </Button>,
              ]}
            ></Modal>
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

export default withAuthorization([ROLE.ADMIN, ROLE.MANAGER])(TableExample);
