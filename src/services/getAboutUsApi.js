import axios from "axios";
import { API_URL } from "../constants/url";

export const getAboutUsAPI = () => axios.get(API_URL.ABOUT_US);
