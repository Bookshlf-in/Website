import { GetRequest } from "../../api/requests/getAPI";
import { searchURL } from "../../api/endpoints";

export const BookSearch = async (bookTitle) => {
  const params = {
    q: bookTitle,
  };
  const result = await GetRequest(searchURL, params);
  //   console.log(result);
  return result;
};
