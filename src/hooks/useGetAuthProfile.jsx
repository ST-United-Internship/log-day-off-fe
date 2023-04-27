import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { getProfile } from "../services/getProfile";
import { useParams } from "react-router-dom";

export const useGetAuthProfile = () => {
  const params = useParams();
  return useQuery({
    queryKey: [QUERY_KEY.AUTH_PROFILE],
    queryFn: async () => {
      const { data } = await getProfile(params?.userId);
      return data.user;
    },
  });
};
