import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { setStorageData } from "../helpers/storage";
import { ACCESS_TOKEN, PROFILE } from "../constants/auth";
import { login } from "../services/authAPI";
import { Notification } from "../components/Notifications/notification";
import { NOTIFICATION } from "../constants/notification";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation(
    async (credentials) => {
      const { data } = await login(credentials);
      return data;
    },
    {
      onSuccess: (data) => {
        setStorageData(ACCESS_TOKEN, data.token);
        setStorageData(PROFILE, data.user);
        navigate("/dashboard");
      },
      onError: (err) => {
        Notification(NOTIFICATION.ERROR, err.response.data.message);
      },
    }
  );
};
