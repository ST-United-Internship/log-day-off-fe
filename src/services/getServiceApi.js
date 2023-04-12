import axios from "axios";
import { API_URL } from "../constants/url";

export const getServiceAPI = () => axios.get(API_URL.SERVICE);
