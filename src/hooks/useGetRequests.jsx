import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { getRequests } from "../services/requestApi";

export const useGetRequests = () => {
  return useQuery({
    queryKey: [QUERY_KEY.REQUESTS],
    queryFn: async () => {
      const { data } = await getRequests();
      return data;
    },
  });
};
