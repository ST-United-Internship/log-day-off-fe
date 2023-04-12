import axios from "axios";
import { API_URL } from "../constants/url";

export const getHealthApi = async () => {
  const { data } = await axios.get("home");
  return data[0][API_URL.DEPARTMENT_HEALTH];
};
