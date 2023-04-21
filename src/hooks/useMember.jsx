import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { getListMember } from "../services/listMember";

export const useMember = () => {
  return useQuery({
    queryKey: [QUERY_KEY.LIST_MEMBER],
    queryFn: async () => {
      const { data } = await getListMember();
      return data;
    },
    staleTime: 10000, // cache for 10 seconds
    refetchInterval: 3000, // refetch every 5 seconds
  });
};
