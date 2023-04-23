import { useMutation } from "@tanstack/react-query";
import { Notification } from "../components/Notifications/notification";
import { NOTIFICATION } from "../constants/notification";
import { createManager } from "../services/formManagerApi";

export const useCreateManager = () => {
  return useMutation(
    async (values) => {
      const { data } = await createManager(values);
      return data;
    },
    {
      onSuccess: () => {
        Notification(NOTIFICATION.SUCCESS, "Create successfully");
      },
      onError: (err) => {
        Notification(NOTIFICATION.ERROR, err.response.data.message);
      },
    }
  );
};
