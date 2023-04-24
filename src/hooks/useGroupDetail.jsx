import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { getGroupDetail } from "../services/groupDetailApi";

export const useGetGroupDetail = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY.GROUP_DETAIL, id],
    queryFn: async () => {
      const { data } = await getGroupDetail(id);
      return data;
    },
  });
};
