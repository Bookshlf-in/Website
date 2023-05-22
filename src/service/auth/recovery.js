import { PostRequest } from "../../api/requests/postAPI";
import { passwordReset } from "../../api/endpoints";

export const handleResetPassword = async (requestBody) => {
  //   console.log(requestBody);
  const response = await PostRequest(passwordReset, requestBody);
  return response;
};
