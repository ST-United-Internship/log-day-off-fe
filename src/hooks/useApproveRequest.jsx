import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Notification } from "../components/Notifications/notification";
import { NOTIFICATION } from "../constants/notification";
import { QUERY_KEY } from "../constants/query-key";
import { approveRequest } from "../services/requestApi";

export const useApproveRequest = () => {
  const navigate = useNavigate();
  return useMutation(
    async (values) => {
      const { data } = await approveRequest(values);
      return data;
    },
    {
      onSuccess: () => {
        navigate("/dashboard");
      },
      onError: (err) => {
        Notification(NOTIFICATION.ERROR, err.response.data.message);
      },
      mutationKey: [QUERY_KEY.REQUEST_DETAIL, QUERY_KEY.REQUESTS],
    }
  );
};
