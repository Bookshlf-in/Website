import axios from "axios";

const instance = axios.create({
    baseURL: "https://bookshlf.web.app"
});

export default instance;