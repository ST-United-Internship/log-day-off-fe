import axios from "axios";

import { API_URL } from "../constants/url";

export const createRequest = (values) =>
  axios.post(API_URL.CREATE_REQUEST, values);
