import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { QUERY_KEY } from "../constants/query-key";
import { getRequestDetail } from "../services/requestApi";

export const useGetRequest = () => {
  const { id } = useParams();
  return useQuery({
    queryKey: [QUERY_KEY.REQUEST_DETAIL],
    queryFn: async () => {
      const { data } = await getRequestDetail(id);
      return data;
    },
  });
};
