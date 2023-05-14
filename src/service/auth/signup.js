import { register, verifyEmailOtp, verifyEmail } from "../../api/endpoints";
import { PostRequest } from "../../api/requests/postAPI";

export const handelSignup = async (requestBody) => {
  const response = await PostRequest(register, requestBody);
  return response;
};

export const handelSendOtp = async (requestBody) => {
  const response = await PostRequest(verifyEmailOtp, requestBody);
  return response;
};

export const handleVerify = async (requestBody) => {
  const response = await PostRequest(verifyEmail, requestBody);
  return response;
};
