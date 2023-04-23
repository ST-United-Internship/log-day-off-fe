import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { getListGroup } from "../services/groupApi";

export const useGetListGroup = () => {
  return useQuery({
    queryKey: [QUERY_KEY.LIST_GROUP],
    queryFn: async () => {
      const { data } = await getListGroup();
      return data.groups;
    },
  });
};
