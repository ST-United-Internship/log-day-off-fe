import axios from "axios";
import { API_URL } from "../constants/url";

export const exportDayoffAPI = () => axios.post(API_URL.EXPORT_DAY_OFF);
