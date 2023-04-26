import { useMutation } from "@tanstack/react-query";
import { createMember } from "../services/listMember";
import { Notification } from "../components/Notifications/notification";
import { NOTIFICATION } from "../constants/notification";

export const useCreateMember = () => {
  return useMutation(
    async (values) => {
      const { data } = await createMember(values);
      return data;
    },

    {
      onError: (err) => {
        Notification(NOTIFICATION.ERROR, err.response.data.message);
      },
    }
  );
};
