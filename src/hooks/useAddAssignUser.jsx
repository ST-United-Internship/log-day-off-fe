import { useMutation } from "@tanstack/react-query";
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
      onSuccess: (data) => {
        Notification(NOTIFICATION.SUCCESS, data.message);
      },
      onError: (err) => {
        Notification(NOTIFICATION.ERROR, err.response.data.message);
      },
    }
  );
};
