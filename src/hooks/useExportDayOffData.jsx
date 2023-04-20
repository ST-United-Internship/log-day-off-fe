import { useMutation } from "@tanstack/react-query";
import { exportDayoffAPI } from "../services/exportDayoffApi";
import { NOTIFICATION } from "../constants/notification";

export const useExportDayOffData = () => {
  return useMutation(
    async () => {
      const { data } = await exportDayoffAPI();
      return data;
    },
    {
      onSuccess: (data) => {
        window.open(data.url);
      },

      onError: (err) => {
        Notification(NOTIFICATION.ERROR, err.response.data.message);
      },
    }
  );
};
