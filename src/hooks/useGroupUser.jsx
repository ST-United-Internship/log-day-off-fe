import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { listGroupsAPI } from "../services/groupService";

export const useGetListGroups = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GROUPS],
    queryFn: async () => {
      const { data } = await listGroupsAPI();
      return data;
    },
  });
};
