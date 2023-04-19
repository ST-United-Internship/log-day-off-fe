import axios from "axios";
import { API_URL } from "../constants/url";

export const getWorkSpaceDetail = (id) =>
  axios.get(API_URL.WORKSPACE_DETAIL + "/" + id);
