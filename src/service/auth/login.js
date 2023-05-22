import { login } from "../../api/endpoints";
import { PostRequest } from "../../api/requests/postAPI";
import axios from "../../api/axios";

export const handleLogin = async (requestBody) => {
  const response = await PostRequest(login, requestBody);
  if (response.success) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
    localStorage.setItem(
      "bookshlf_user",
      JSON.stringify({
        authHeader: `Bearer ${response.data.token}`,
      })
    );
  }
  return response;
};
