import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Notification } from "../components/Notifications/notification";
import { NOTIFICATION } from "../constants/notification";
import { createStaff } from "../services/formStaffApi";

export const useCreateStaff = () => {
  const navigate = useNavigate();
  return useMutation(
    async (values) => {
      const { data } = await createStaff(values);
      return data;
    },
    {
      onSuccess: () => {
        navigate("/dashboard");
      },
      onError: (err) => {
        Notification(NOTIFICATION.ERROR, err.response.data.message);
      },
    }
  );
};
