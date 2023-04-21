import axios from "axios";
import { API_URL } from "../constants/url";

export const createGroup = (data) => axios.post(API_URL.CREATE_GROUP, data);
export const getListGroup = () => axios.get(API_URL.LIST_GROUP);
