import {React, useState} from "react";

const Messages = (props) => {
  const [messages, setmessages] = useState([]);
  const [filteredMessages, setfilteredMessages] = useState([]);
  const filter = (categItem) => {
    const updatedItems = messages.filter((curElem) => {
      return curElem.category === categItem;
    });
    setfilteredMessages(updatedItems);
  };

  return (
    <div className="messages-cont">
      <select
        className="bv-btns"
        onChange={(e) => {
          filter(e.target.value);
        }}
      >
        <option value="UnRead">Not Seen</option>
        <option value="Read">Seen</option>
      </select>
      <div className="messages-item">
        <div className="messages-item-top">
          <p className="messages-top-name">Name : XYZ</p>
          <p className="messages-top-email">Email : abc@gmail.com</p>
        </div>
        <div className="messages-item-middle">
          <p className="messages-middle-sub">Subject : </p>
          <div className="messages-middle-sub-containt">
            <textarea className="messages-subject" />
          </div>
        </div>
        <div className="messages-item-bottom">
          <p className="messages-bottom-message">Message</p>
          <div className="messages-bottom-message-containt">
            <textarea className="messages-desc" />
          </div>
        </div>
        <div className="delete-message" title="Delete Message">
          <i className="fas fa-trash-alt" />
        </div>
        <div className="markasread-message" title="Mark as Read">
          <i class="fas fa-check-square" />
        </div>
      </div>
    </div>
  );
};

export default Messages;
