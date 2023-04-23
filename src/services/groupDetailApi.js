import axios from "axios";
import { API_URL } from "../constants/url";

export const addAssignMember = (userId, groupId) =>
  axios.post(API_URL.GROUP + "/" + API_URL.ASSIGN_MEMBER, {
    groupId,
    userId,
  });
