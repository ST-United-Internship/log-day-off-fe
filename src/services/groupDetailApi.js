import axios from "axios";
import { API_URL } from "../constants/url";

export const addAssignMember = (userId, groupId) =>
  axios.post(
    API_URL.CREATE_GROUP + "/" + API_URL.GROUP + "/" + API_URL.ASSIGN_MEMBER,
    {
      groupId,
      userId,
    }
  );

export const getGroupDetail = (groupId) =>
  axios.get(`${API_URL.WORKSPACE_GROUP}/${groupId}`);

export const unAssignMemberGroup = (userId, groupId) =>
  axios.post(
    API_URL.CREATE_GROUP + "/" + API_URL.GROUP + "/" + API_URL.UN_ASSIGN_MEMBER,
    {
      groupId,
      userId,
    }
  );
