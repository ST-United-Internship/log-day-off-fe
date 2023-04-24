import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/query-key";
import { getListStaffs } from "../services/getStaffsApi";

export const useGetListStaff = (staffId) => {
  return useQuery({
    queryKey: [QUERY_KEY.LIST_STAFF],
    queryFn: async () => {
      const { data } = await getListStaffs(staffId);
      return data.staffs;
    },
  });
};
