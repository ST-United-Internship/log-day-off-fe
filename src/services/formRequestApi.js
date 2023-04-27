import axios from "axios";

import { API_URL } from "../constants/url";

export const createRequest = (id) => axios.post(API_URL.CREATE_REQUEST, id);
