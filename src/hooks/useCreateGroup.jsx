import { useMutation } from "@tanstack/react-query";
// import { QUERY_KEY } from "../constants/query-key";
import { createGroup } from "../services/groupApi";

export const useCreateGroup = () => {
  return useMutation(async (values) => {
    const { data } = await createGroup(values);
    return data;
  });
};
