import { GetRequest } from "../../api/requests/getAPI";
import { searchTitle, searchBook } from "../../api/endpoints";

export const BookSearchTitle = async (bookTitle) => {
  const params = {
    q: bookTitle,
  };
  const result = await GetRequest(searchTitle, params);
  return result;
};

export const BookSearch = async (params) => {
  const result = await GetRequest(searchBook, params);
  return result;
};

export const BooksPerPage = () => {
  const windowSize = window.innerWidth;
  switch (windowSize) {
    case 450:
      return 8;
    case 600:
      return 12;
    case 900:
      return 15;
    case 1200:
      return 20;
    default:
      return 20;
  }
};
