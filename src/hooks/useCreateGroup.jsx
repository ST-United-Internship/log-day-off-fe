import { useMutation } from "@tanstack/react-query";
import { createGroup } from "../services/groupApi";
import { Notification } from "../components/Notifications/notification";
import { NOTIFICATION } from "../constants/notification";

export const useCreateGroup = () => {
  return useMutation(
    async (values) => {
      const { data } = await createGroup(values);
      return data;
    },
    {
      onSuccess: (data) => {
        Notification(NOTIFICATION.SUCCESS, `Create Group ${data.message}!`);
      },
      onError: (err) => {
        Notification(NOTIFICATION.ERROR, err.response.data.message);
      },
    }
  );
};
