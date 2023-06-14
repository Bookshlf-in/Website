import axios from "../axios";
import { PrintInUATEnvironment } from "../../assets/utils/commons";

export const GetRequest = async (requestURL, requestParams) => {
  const response = await axios
    .get(requestURL, { params: requestParams })
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((err) => {
      return { data: err?.response?.data, success: false };
    });
  const Request = {
    type: "GET",
    url: requestURL,
    params: requestParams,
    response: response,
  };
  PrintInUATEnvironment(Request);
  return response;
};
