import { useMutation } from "@tanstack/react-query";
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
      onSuccess: (data) => {
        Notification(NOTIFICATION.SUCCESS, data.message);
      },
      onError: (err) => {
        Notification(NOTIFICATION.ERROR, err.response.data.message);
      },
    }
  );
};
