import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { addAssignUser } from "../services/workSpaceDetailApi";
import { useParams } from "react-router-dom";

export const useAddAssignUser = () => {
  const { id } = useParams();
  return useMutation(
    async (values) => {
      const { data } = await addAssignUser(id, values);
      return data;
    },
    { mutationKey: [QUERY_KEY.WORKSPACE_DETAIL] }
  );
};
