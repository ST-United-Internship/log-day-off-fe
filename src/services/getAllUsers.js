import axios from "axios";
import { API_URL } from "../constants/url";

export const getAllUsers = () => axios.get(API_URL.GETALL_USERS);
