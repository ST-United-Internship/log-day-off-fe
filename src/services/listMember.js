import axios from "axios";
import { API_URL } from "../constants/url";

export const createMemer = (data) => axios.post(API_URL.CREATE_MEMBER, data);
export const getListMember = () => axios.get(API_URL.LIST_MEMBER);
