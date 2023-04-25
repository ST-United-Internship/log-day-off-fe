import axios from "axios";
import { API_URL } from "../constants/url";

export const getWorkSpaceDetail = (id) =>
  axios.get(API_URL.WORKSPACE_DETAIL + "/" + id);

export const unAssignUser = (id, userId) =>
  axios.post(
    API_URL.WORKSPACE_DETAIL + "/" + id + "/" + API_URL.UNASSIGN_USERS,
    {
      userId,
    }
  );

export const addAssignUser = (id, userId) =>
  axios.post(
    API_URL.WORKSPACE_DETAIL + "/" + id + "/" + API_URL.ADDASSIGN_USERS,
    {
      userId,
    }
  );
export const adminResetPassword = (id) =>
  axios.put(API_URL.ADMIN_RESET_PASSWORD, id);
