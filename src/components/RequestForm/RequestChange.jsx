import { Button, Input } from "antd";
import "../../assets/requestchange/requestchange.css";
const RequestChange = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <form>
          <h3>Reason for change</h3>
          <Input.TextArea
            rows={4}
            placeholder="maxLength is 6"
            maxLength={6}
            className="req-text"
          />
          <Button type="primary" htmlType="submit">
            send
          </Button>
          <Button className="req-button-hai">cancel</Button>
        </form>
      </div>
    </div>
  );
};
export default RequestChange;
