import axios from "axios";
import { API_URL } from "../constants/url";

export const getWorkSpaceDetail = (id) =>
  axios.get(API_URL.WORKSPACE_DETAIL + "/" + id);

export const createWorkSpaceDetail = (id) =>
  axios.post(API_URL.CREATE_WORKSPACE_DETAIL + "/", id);

export const unAssignUser = (id, userId) =>
  axios.post(
    API_URL.WORKSPACE_DETAIL + "/" + id + "/" + API_URL.UNASSIGN_USERS,
    {
      userId,
    }
  );
