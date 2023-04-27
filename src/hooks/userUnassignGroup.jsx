import { useMutation } from "@tanstack/react-query";
import { unAssignMemberGroup } from "../services/groupDetailApi";
import { Notification } from "../components/Notifications/notification";
import { NOTIFICATION } from "../constants/notification";

export const useUnAssignMemberGroup = (id) => {
  return useMutation(
    async (values) => {
      const { data } = await unAssignMemberGroup(values, Number(id));
      return data;
    },
    {
      onSuccess: (data) => {
        Notification(NOTIFICATION.SUCCESS, data.message);
      },
      onError: (error) => {
        Notification(NOTIFICATION.ERROR, error.response.data.message);
      },
    }
  );
};
