import axios from "axios";
import { API_URL } from "../constants/url";

export const createManager = (values) =>
  axios.post(API_URL.CREATE_MANAGER, values);
