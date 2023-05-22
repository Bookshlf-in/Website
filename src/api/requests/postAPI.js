import axios from "../axios";
import { isUATEnvironment } from "../../assets/utils/commons";

const PrintInUATEnvironment = (requestURL, requestBody, requestResponse) => {
  const Request = {
    type: "POST",
    url: requestURL,
    body: requestBody,
    response: requestResponse,
  };
  if (isUATEnvironment()) console.log(Request);
};

export const PostRequest = async (requestURL, requestBody) => {
  const response = await axios
    .post(requestURL, requestBody)
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((err) => {
      return { data: err.response.data, success: false };
    });
  PrintInUATEnvironment(requestURL, requestBody, response);
  return response;
};
