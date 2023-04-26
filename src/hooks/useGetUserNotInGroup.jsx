import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { getUserNotInGroup } from "../services/getUserNotInGroup";

export const useGetUserNotInGroup = (gruopId) =>
  useQuery({
    queryKey: [QUERY_KEY.LIST_USER_NOT_IN_GROUP],
    queryFn: async () => {
      const { data } = await getUserNotInGroup(gruopId);
      return data.users;
    },
  });
