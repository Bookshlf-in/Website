import axios from "axios";

const instance = axios.create({
    baseURL: "https://bookshlf.herokuapp.com"
});

export default instance;