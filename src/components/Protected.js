import { React, useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/userContext";

import axios from "./../axios";
export default function Protected() {
  const [user, setUser] = useContext(UserContext);
  const [accessed, setAccessed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const callApi = () => {
    setLoading(true);
    axios
      .get("/protected")
      .then(() => {
        console.log("protected route accessed");
        setLoading(false);
        setAccessed(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setAccessed(false);
      });
  };

  useEffect(() => {
    callApi();
  }, [user]);

  const login = () => {
    setLoginLoading(true);
    axios
      .post("/signIn", {
        email: "rk57382@gmail.com",
        password: "test1234",
      })
      .then((response) => {
        console.log("Logged In", response);
        localStorage.setItem(
          "bookshlf_user",
          JSON.stringify({
            authHeader: `Bearer ${response.data.token}`,
            roles: response.data.roles,
          })
        );
        if (response.data.token) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
        }
        setUser({
          authHeader: `Bearer ${response.data.token}`,
          roles: response.data.roles,
        });
        setLoginLoading(false);
      })
      .catch((error) => {
        console.log("Login error", error);
        setLoginLoading(false);
      });
  };

  const logout = () => {
    setLogoutLoading(true);
    axios
      .get("/signOut")
      .then((response) => {
        localStorage.removeItem("bookshlf_user");
        delete axios.defaults.headers.common["Authorization"];
        console.log("Signed Out");
        setUser(null);
        setLogoutLoading(false);
      })
      .catch((error) => {
        console.log("Logout error", error);
        setLogoutLoading(false);
      });
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {loading ? (
          <h1 style={{ color: "#120E43" }}>Loading</h1>
        ) : accessed ? (
          <h1 style={{ color: "#4DD637" }}>Protected Route accessed</h1>
        ) : (
          <h1 style={{ color: "#FF6263" }}>Protected Route not Accessed</h1>
        )}
        <button
          onClick={callApi}
          style={{ backgroundColor: "#5DA3FA", marginTop: "20px" }}
        >
          {loading ? "Loading" : "Refresh"}
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button style={{ backgroundColor: "#03203C" }} onClick={login}>
          {loginLoading ? "Loading" : "Login"}
        </button>
        <button style={{ backgroundColor: "#03203C" }} onClick={logout}>
          {logoutLoading ? "Loading" : "Logout"}
        </button>
      </div>
      <div style={{ padding: "20px", textAlign: "center" }}>
        user = {JSON.stringify(user)}
      </div>
    </>
  );
}
