import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { unAssignUser } from "../services/workSpaceDetailApi";
import { useParams } from "react-router-dom";

export const useUnAssignUser = () => {
  const { id } = useParams();
  return useMutation(
    async (values) => {
      const { data } = await unAssignUser(id, values);
      return data;
    },
    { mutationKey: [QUERY_KEY.WORKSPACE_DETAIL] }
  );
};
