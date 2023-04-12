import axios from "axios";
import { API_URL } from "../constants/url";

export const getMoreServiceApi = () => axios.get(API_URL.MORE_SERVICES);
