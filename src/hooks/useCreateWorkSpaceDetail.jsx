import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { createWorkSpace } from "../services/workSpaceApi";

export const useCreateWorkSpaceDetail = () => {
  return useMutation(
    async (values) => {
      const { data } = await createWorkSpace(values);
      return data;
    },
    { mutationKey: [QUERY_KEY.LIST_WORKSPACE] }
  );
};
