import axios from "axios";
import { API_URL } from "../constants/url";

export const getNewAPI = () => axios.get(API_URL.NEWS);
