import axios from "axios";
import { API_URL } from "../constants/url";

export const addAssignMember = (id, userId) =>
  axios.post(
    API_URL.WORKSPACE_DETAIL + "/" + id + "/" + API_URL.ADDASSIGN_USERS,
    {
      userId,
    }
  );
