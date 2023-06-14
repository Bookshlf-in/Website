import axios from "../axios";
import { PrintInUATEnvironment } from "../../assets/utils/commons";

export const DeleteRequest = async (requestURL, data) => {
  const response = await axios
    .delete(requestURL, { data: data })
    .then((res) => {
      return { data: res.data, success: true };
    })
    .catch((err) => {
      return { data: err.response.data, success: false };
    });
  const Request = {
    type: "DELETE",
    url: requestURL,
    params: data,
    response: response,
  };
  PrintInUATEnvironment(Request);
  return response;
};
