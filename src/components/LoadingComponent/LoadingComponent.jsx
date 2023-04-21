import { Spin } from "antd";
import "./loading-component.css";
const LoadingComponent = ({ children, isLoading, delay = 200 }) => {
  return (
    <Spin className="spin" spinning={isLoading} delay={delay}>
      {children}
    </Spin>
  );
};

export default LoadingComponent;
