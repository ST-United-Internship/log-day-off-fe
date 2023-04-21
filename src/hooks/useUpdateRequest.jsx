import { useMutation } from "@tanstack/react-query";
import { Notification } from "../components/Notifications/notification";
import { NOTIFICATION } from "../constants/notification";
import { updateRequestDetail } from "../services/requestApi";

export const useUpdateRequest = () => {
  return useMutation(
    async ({ id, values }) => {
      const { data } = await updateRequestDetail(id, values);
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
