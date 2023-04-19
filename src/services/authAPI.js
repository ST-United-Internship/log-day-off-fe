import axios from "axios";
import { API_URL } from "../constants/url";

export const login = (credentials) => axios.post(API_URL.LOGIN, credentials);
