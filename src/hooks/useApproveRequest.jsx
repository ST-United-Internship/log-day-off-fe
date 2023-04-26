import { useMutation } from "@tanstack/react-query";
import { Notification } from "../components/Notifications/notification";
import { NOTIFICATION } from "../constants/notification";
import { QUERY_KEY } from "../constants/query-key";
import { approveRequest } from "../services/requestApi";

export const useApproveRequest = () => {
  return useMutation(
    async (values) => {
      const { data } = await approveRequest(values);
      return data;
    },
    {
      onSuccess: (data) => {
        Notification(NOTIFICATION.SUCCESS, data.message);
      },
      onError: (err) => {
        Notification(NOTIFICATION.ERROR, err.response.data.message);
      },
      mutationKey: [QUERY_KEY.REQUEST_DETAIL, QUERY_KEY.REQUESTS],
    }
  );
};
