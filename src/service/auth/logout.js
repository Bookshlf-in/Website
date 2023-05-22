import { GetRequest } from "../../api/requests/getAPI";
import { logout } from "../../api/endpoints";
import axios from "../../api/axios";

export const Logout = async () => {
  const response = await GetRequest(logout);
  if (response.success) {
    localStorage.removeItem("bookshlf_user");
    localStorage.removeItem("bookshlf_user_AddBook");
    delete axios.defaults.headers.common["Authorization"];
  }
  return response;
};
