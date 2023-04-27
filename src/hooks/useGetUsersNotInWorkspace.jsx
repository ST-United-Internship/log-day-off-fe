import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { getUserNotInWorkspace } from "../services/getUserNotInWorkspace";

export const useGetUsersNotInWorkspace = (workspaceId) =>
  useQuery({
    queryKey: [QUERY_KEY.LIST_USER_NOT_IN_WORKSPACE],
    queryFn: async () => {
      const { data } = await getUserNotInWorkspace(workspaceId);
      return data.users;
    },
  });
