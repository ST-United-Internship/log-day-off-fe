import axios from "axios";
import { API_URL } from "../constants/url";

export const getUserNotInWorkspace = (workspaceId) =>
  axios.get(
    `${API_URL.GET_USER_NOT_IN_WORKSPACE}/${workspaceId}/users-not-in-workspace`
  );
