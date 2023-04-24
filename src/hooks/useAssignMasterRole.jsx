import { useMutation } from "@tanstack/react-query";
import { assignMaster } from "../services/assignMaster";
import { NOTIFICATION } from "../constants/notification";
import { Notification } from "../components/Notifications/notification";

export const useAssignMasterRole = () => {
  return useMutation(
    async (staffId) => {
      const { data } = await assignMaster(Number(staffId));
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
