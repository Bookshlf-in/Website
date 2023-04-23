import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BOOKSHLF,
  withCredentials: true,
});

const bookshlf_user = JSON.parse(localStorage.getItem("bookshlf_user"));

if (bookshlf_user?.authHeader) {
  instance.defaults.headers.common["Authorization"] = bookshlf_user.authHeader;
}

export default instance;
