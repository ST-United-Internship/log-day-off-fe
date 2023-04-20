import { useMutation } from "@tanstack/react-query";
import { Notification } from "../components/Notifications/notification";
import { NOTIFICATION } from "../constants/notification";
import { createStaff } from "../services/formStaffApi";

export const useCreateStaff = () => {
  return useMutation(
    async (values) => {
      const { data } = await createStaff(values);
      return data;
    },
    {
      onSuccess: () => {
        // navigate("/dashboard");
        Notification(NOTIFICATION.SUCCESS, "Create successfully");
      },
      onError: (err) => {
        Notification(NOTIFICATION.ERROR, err.response.data.message);
      },
    }
  );
};
