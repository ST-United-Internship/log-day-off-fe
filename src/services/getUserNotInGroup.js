import axios from "axios";
import { API_URL } from "../constants/url";

export const getUserNotInGroup = (groupId) =>
  axios.get(`${API_URL.GET_USER_NOT_IN_GROUP}/${groupId}/user-not-in-group`);
