import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { addAssignUser } from "../services/workSpaceDetailApi";
import { useParams } from "react-router-dom";
import { Notification } from "../components/Notifications/notification";
import { NOTIFICATION } from "../constants/notification";

export const useAddAssignUser = () => {
  const { id } = useParams();
  return useMutation(
    async (values) => {
      const { data } = await addAssignUser(id, values);
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
