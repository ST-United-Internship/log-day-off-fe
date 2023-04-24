import axios from "axios";
import { API_URL } from "../constants/url";

export const createMember = (data) => axios.post(API_URL.CREATE_MEMBER, data);
export const getListMember = () => axios.get(API_URL.GETALL_USERS + "/all");
