import { useMutation } from "@tanstack/react-query";
import { Notification } from "../components/Notifications/notification";
import { NOTIFICATION } from "../constants/notification";
import { changePassWord } from "../services/changePassWord";

export const useChangePassWord = () => {
  return useMutation(
    async (values) => {
      const { data } = await changePassWord(values);
      return data;
    },
    {
      onSuccess: (data) => {
        Notification(NOTIFICATION.SUCCESS, data.message);
      },
      onError: (err) => {
        Notification(NOTIFICATION.ERROR, err.response.data.message);
      },
    }
  );
};
