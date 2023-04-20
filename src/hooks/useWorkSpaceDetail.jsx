import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { getWorkSpaceDetail } from "../services/workSpaceDetailApi";
import { useParams } from "react-router-dom";

export const useWorkSpaceDetail = () => {
  const { id } = useParams();
  return useQuery({
    queryKey: [QUERY_KEY.WORKSPACE_DETAIL],
    queryFn: async () => {
      const { data } = await getWorkSpaceDetail(id);
      return data;
    },
  });
};
