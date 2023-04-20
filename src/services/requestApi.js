import axios from "axios";
import { API_URL } from "../constants/url";

export const getRequests = () => axios.get(API_URL.REQUESTS);

export const approveRequest = (data) =>
  axios.post(API_URL.APPROVE_REQUEST, data);
