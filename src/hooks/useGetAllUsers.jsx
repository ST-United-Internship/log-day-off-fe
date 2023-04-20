import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { getAllUsers } from "../services/getAllUsers";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEY.ALL_USERS],
    queryFn: async () => {
      const { data } = await getAllUsers();
      return data;
    },
  });
};
