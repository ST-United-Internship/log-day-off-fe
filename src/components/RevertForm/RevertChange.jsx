import { Button, Input } from "antd";
import "../../assets/revertchange/revertchange.css";
const RevertChange = () => {
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
            className="rev-text"
          />
          <Button type="primary" htmlType="submit">
            send
          </Button>
          <Button className="rev-button-hai">cancel</Button>
        </form>
      </div>
    </div>
  );
};
export default RevertChange;
