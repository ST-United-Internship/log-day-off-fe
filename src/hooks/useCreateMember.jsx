import { useMutation } from "@tanstack/react-query";
import { createMemer } from "../services/listMember";

export const useCreateMember = () => {
  return useMutation(
    async (values) => {
      const { data } = await createMemer(values);
      return data;
    }
    // { mutationKey: [QUERY_KEY.LIST_WORKSPACE] }
  );
};
