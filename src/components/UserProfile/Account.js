import {React} from "react";
import "./Account.css";
import Avatar from "@material-ui/core/Avatar";

function Account(props) {
  console.log(props);
  return (
    <div className="user-profile-container" id="user-profile-container">
      <div className="user-profile-container-top">
        <div className="user-profile-details">
          <span>
            <i className="fas fa-user"></i>
            {props.user.name}
          </span>
          <span>
            <i className="fas fa-envelope"></i>
            {props.user.email}
          </span>
          <span>
            <i className="fas fa-universal-access"></i>Customer Since :{" "}
            {props.user.createdAt.substr(0, 4)}
          </span>
          <span>
            <i className="fas fa-hat-cowboy"></i>Roles :{" "}
            {props.user.roles.map((role, i) => (
              <b key={i}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
                {i === props.user.roles.length - 1 ? "" : " , "}
              </b>
            ))}
          </span>
        </div>
        <div className="user-profile-img">
          <Avatar
            alt={props.user.name}
            src="/images/user.png"
            style={{height: "150px", width: "150px"}}
          />
        </div>
      </div>
    </div>
  );
}
export default Account;

//
