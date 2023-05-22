import {
  register,
  verifyEmailOtp,
  verifyEmail,
  recoveryEmailOtp,
} from "../../api/endpoints";
import { PostRequest } from "../../api/requests/postAPI";

export const handelSignup = async (requestBody) => {
  const response = await PostRequest(register, requestBody);
  return response;
};

export const handelSendOtp = async (type, requestBody) => {
  const url = type === "EMAIL_VERIFICATION" ? verifyEmailOtp : recoveryEmailOtp;
  const response = await PostRequest(url, requestBody);
  return response;
};

export const handleVerify = async (requestBody) => {
  const response = await PostRequest(verifyEmail, requestBody);
  return response;
};
