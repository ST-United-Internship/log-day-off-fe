import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { addAssignMember } from "../services/groupDetailApi";
import { useParams } from "react-router-dom";

export const useAssignMemberGroup = () => {
  const { id } = useParams();
  return useMutation(
    async (values) => {
      const { data } = await addAssignMember(id, values);
      return data;
    },
    { mutationKey: [QUERY_KEY.GROUP_DETAIL] }
  );
};
