import {React, useEffect} from "react";
import axios from "./../axios";
export default function Protected() {
  useEffect(() => {
    axios
      .get("/protected")
      .then(() => console.log("protected route accessed"))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h1>Protected Route Component</h1>
    </div>
  );
}
