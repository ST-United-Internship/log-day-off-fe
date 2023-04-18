import axios from "axios";
import { API_URL } from "../constants/url";

export const createWorkSpace = (data) =>
  axios.post(API_URL.CREATE_WORKSPACE, data);
