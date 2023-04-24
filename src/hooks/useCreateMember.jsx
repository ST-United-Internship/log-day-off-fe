import { useMutation } from "@tanstack/react-query";
import { createMember } from "../services/listMember";

export const useCreateMember = () => {
  return useMutation(
    async (values) => {
      const { data } = await createMember(values);
      return data;
    }
    // { mutationKey: [QUERY_KEY.LIST_WORKSPACE] }
  );
};
