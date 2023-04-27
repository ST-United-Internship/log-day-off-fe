import axios from "axios";
import { API_URL } from "../constants/url";

export const changePassWord = (id) => axios.put(API_URL.CHANGE_PASSWORD, id);
