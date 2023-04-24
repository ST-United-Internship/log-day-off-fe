import axios from "axios";
import { API_URL } from "../constants/url";

export const getListStaffs = (groupId) => {
  const config = {
    params: { groupId },
  };
  return axios.get(API_URL.LIST_STAFFS, config);
};
