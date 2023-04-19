import axios from "axios";
import { API_URL } from "../constants/url";

export const createStaff = (values) => axios.post(API_URL.CREATE_STAFF, values);
