import React from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar.js";
import {Link} from "react-router-dom";

function Home() {
  return (<div className="app">
    <div className="home-bg">{Navbar}</div>
  </div>)
};
export default Home;
