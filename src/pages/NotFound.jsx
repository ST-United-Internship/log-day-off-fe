import { Link } from "react-router-dom";
import "../assets/css/not-found.css";
import { Button } from "antd";

const NotFound = () => {
  return (
    <div className="center">
      <p>Not found</p>
      <Link to="/" className="link-home">
        <Button> Go back home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
