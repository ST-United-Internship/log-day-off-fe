import axios from "axios";
import { API_URL } from "../constants/url";

export const getPricePlanAPI = async () => {
  const { data } = await axios.get("home");
  return data[0][API_URL.PRICE_PLAN];
};
