import axios from "axios";
import { API_URL } from "../constants/url";

export const getAboutMemberApi = () => axios.get(API_URL.ABOUT_MEMBER);
