import axios from "axios";
import { API_URL } from "../constants/url";

export const createWorkSpace = async (data) => {
  const res = await axios.post(API_URL.CREATE_WORKSPACE, data);
  return res.data;
};
