import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { getListWorkspace } from "../services/workSpaceApi";

export const useGetListWorkspace = () => {
  return useQuery({
    queryKey: [QUERY_KEY.LIST_WORKSPACE],
    queryFn: async () => {
      const { data } = await getListWorkspace();
      return data;
    },
  });
};
