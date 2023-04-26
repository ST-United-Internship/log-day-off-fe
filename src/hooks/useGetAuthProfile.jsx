import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { getProfile } from "../services/getProfile";

export const useGetAuthProfile = () =>
  useQuery({
    queryKey: [QUERY_KEY.AUTH_PROFILE],
    queryFn: async () => {
      const { data } = await getProfile();
      return data.user;
    },
  });
