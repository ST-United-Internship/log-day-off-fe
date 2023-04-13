import { notification } from "antd";

export const Notification = (type, description) => {
  notification[type]({
    message: type.charAt(0).toUpperCase() + type.slice(1),
    description: description,
  });
};
