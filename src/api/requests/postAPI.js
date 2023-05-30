import axios from "../axios";
import { PrintInUATEnvironment } from "../../assets/utils/commons";

export const PostRequest = async (requestURL, requestBody) => {
  const response = await axios
    .post(requestURL, requestBody)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((err) => {
      return { data: err.response.data, success: false };
    });
  const Request = {
    type: "POST",
    url: requestURL,
    body: requestBody,
    response: response,
  };
  PrintInUATEnvironment(Request);
  return response;
};
