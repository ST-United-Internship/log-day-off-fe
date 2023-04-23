import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { unAssignUser } from "../services/workSpaceDetailApi";
import { useParams } from "react-router-dom";
import { Notification } from "../components/Notifications/notification";
import { NOTIFICATION } from "../constants/notification";

export const useUnAssignUser = () => {
  const { id } = useParams();
  return useMutation(
    async (values) => {
      const { data } = await unAssignUser(id, values);
      return data;
    },
    {
      onError: (err) => {
        Notification(NOTIFICATION.ERROR, err.response.data.message);
      },
      mutationKey: [QUERY_KEY.WORKSPACE_DETAIL],
    }
  );
};
