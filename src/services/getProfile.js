import axios from "axios";
import { API_URL } from "../constants/url";

export const getProfile = () => axios.get(API_URL.GET_AUTH_USER_PROFILE);
