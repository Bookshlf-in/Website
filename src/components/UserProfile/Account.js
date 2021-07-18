import {React, useState} from "react";
function Account(props) {
  return (
    <div className="user-profile-container" id="user-profile-container">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              src="/images/user.svg"
              alt="Avatar"
              width="200px"
              height="200px"
            />
            <h1>{props.user.name ? props.user.name : ""}</h1>
            <p
              style={{
                color: "blue",
                fontFamily: "PT Sans",
              }}
            >
              {props.user.email ? props.user.email : ""}
            </p>
          </div>
          <div className="flip-card-back">
            <h1>{props.user.name ? props.user.name : ""}</h1>
            <br />
            <p>{props.user.email ? props.user.email : ""}</p>
            <br />
            <p>
              {" "}
              Roles :{" "}
              {props.user.roles ? (
                props.user.roles.map((role) => <b key={role}>{role + " "}</b>)
              ) : (
                <b></b>
              )}
            </p>
            <br />
            <p>
              User Since :{" "}
              {props.user.createdAt ? props.user.createdAt.substr(0, 4) : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Account;
