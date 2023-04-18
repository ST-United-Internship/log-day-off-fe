import { useMutation } from "@tanstack/react-query";
import { createWorkSpace } from "../services/workSpaceApi";

export const useCreateWorkSpace = () => {
  return useMutation(async (values) => {
    const { data } = await createWorkSpace(values);
    return data;
  });
};
