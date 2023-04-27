import axios from "axios";
import { API_URL } from "../constants/url";

export const getProfile = (id) =>
  axios.get(
    id
      ? `users/${id}/${API_URL.GET_USER_PROFILE}`
      : API_URL.GET_AUTH_USER_PROFILE
  );
