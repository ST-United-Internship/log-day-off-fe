import { useMutation } from "@tanstack/react-query";
import { Notification } from "../components/Notifications/notification";
import { NOTIFICATION } from "../constants/notification";
import { QUERY_KEY } from "../constants/query-key";
import { createWorkSpace } from "../services/workSpaceApi";

export const useCreateWorkSpace = () => {
  return useMutation(
    async (values) => {
      const { data } = await createWorkSpace(values);
      return data;
    },
    {
      onError: (err) => {
        Notification(NOTIFICATION.ERROR, err.response.data.message);
      },
    },

    { mutationKey: [QUERY_KEY.LIST_WORKSPACE] }
  );
};
