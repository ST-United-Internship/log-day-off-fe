import axios from "axios";
import { API_URL } from "../constants/url";

export const getRequests = () => axios.get(API_URL.REQUESTS);

export const approveRequest = (data) =>
  axios.post(API_URL.APPROVE_REQUEST, data);

export const getRequestDetail = (id) => axios.get(API_URL.REQUESTS + "/" + id);

export const updateRequestDetail = (id, data) =>
  axios.patch(API_URL.REQUESTS + "/" + id, data);
