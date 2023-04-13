import { Button, Form } from "antd";
import "../assets/approve/approvemodal.css";
const ApproveModal = () => {
  return (
    <Form className="form-approve">
      <div>
        <p> Are you sure?</p>
        <br></br>
        <br></br>
        <br></br>
        <Button className="approve-nut-mot">Yes</Button>
        <Button className="approve-nut-hai" type="primary">
          No
        </Button>
      </div>
    </Form>
  );
};
export default ApproveModal;
