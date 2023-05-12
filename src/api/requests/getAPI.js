import axios from "../axios";
import { isUATEnvironment } from "../../assets/utils/commons";

const PrintInUATEnvironment = (requestURL, requestParams, requestResponse) => {
  const Request = {
    type: "GET",
    url: requestURL,
    params: requestParams,
    response: requestResponse,
  };
  if (isUATEnvironment()) console.log(Request);
};

export const GetRequest = async (requestURL, requestParams) => {
  const response = await axios
    .get(requestURL, { params: requestParams })
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((err) => {
      return { data: err.response.data, success: false };
    });
  PrintInUATEnvironment(requestURL, requestParams, response);
  return response;
};
