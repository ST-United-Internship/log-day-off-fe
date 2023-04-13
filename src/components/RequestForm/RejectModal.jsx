import { Button, Form } from "antd";
import "../assets/reject/rejectmodal.css";
const RejectModal = () => {
  return (
    <Form className="form-reject">
      <div>
        <p> Are you sure?</p>
        <br></br>
        <br></br>
        <br></br>
        <Button className="reject-nut-mot">Yes</Button>
        <Button className="reject-nut-hai" type="primary">
          No
        </Button>
      </div>
    </Form>
  );
};
export default RejectModal;
