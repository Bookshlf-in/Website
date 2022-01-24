import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BOOKSHLF,
  withCredentials: true,
});

const obj = JSON.parse(localStorage.getItem("bookshlf_user"));

if (obj?.authHeader) {
  instance.defaults.headers.common["Authorization"] = obj.authHeader;
}

export default instance;
