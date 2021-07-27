import {React, useState} from "react";
import axios from "../../axios";

const Messages = (props) => {
  const [messages, setmessages] = useState([]);
  const [filteredMessages, setfilteredMessages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [load, setload] = useState(false);
  const [page, setpage] = useState(1);
  const [type, settype] = useState("UnRead");

  const filter = (read) => {
    setfilteredMessages(
      messages.filter((message) => {
        return message.read !== read;
      })
    );
  };

  const getMessages = () => {
    setload(true);
    axios
      .get("/admin-getMessageList", {params: {page: 1}})
      .then((response) => {
        setmessages(response.data.data);
        setTotalPages(response.data.totalPages);
        setfilteredMessages(
          response.data.data.filter((message) => {
            return message.read === false;
          })
        );
        setload(false);
        console.log(response.data);
      })
      .catch((error) => {
        setload(false);
      });
  };
  const LoadMore = () => {
    if (page + 1 <= totalPages) {
      axios
        .get("/admin-getMessageList", {params: {page: page + 1}})
        .then((response) => {
          setmessages(messages.concat(response.data.data));
          setTotalPages(response.data.totalPages);
          setfilteredMessages(
            messages.concat(response.data.data).filter((message) => {
              return message.read === (type === "UnRead" ? false : true);
            })
          );
          setpage(page + 1);
          console.log(response.data);
        })
        .catch((error) => {});
    }
  };
  const MarkAsRead = (e, message, id) => {
    e.target.className = "fas fa-spinner";
    e.target.style.animation = "spin 2s linear infinite";
    message.read = true;
    axios
      .post("/admin-markMessageAsRead", {
        messageId: id,
      })
      .then((response) => {
        setfilteredMessages(
          messages.filter((message) => {
            return message.read === (type === "UnRead" ? false : true);
          })
        );
      })
      .catch((error) => {});
  };
  const MarkAsUnRead = (e, message, id) => {
    e.target.className = "fas fa-spinner";
    e.target.style.animation = "spin 2s linear infinite";
    message.read = false;
    axios
      .post("/admin-markMessageAsUnread", {
        messageId: id,
      })
      .then((response) => {
        setfilteredMessages(
          messages.filter((message) => {
            return message.read === (type === "UnRead" ? false : true);
          })
        );
      })
      .catch((error) => {});
  };
  const DeleteMessage = (e, id) => {
    e.target.className = "fas fa-spinner";
    e.target.style.animation = "spin 2s linear infinite";
    axios
      .delete("/admin-deleteMessage", {
        data: {messageId: id},
      })
      .then((response) => {
        setfilteredMessages(
          filteredMessages.filter((message) => {
            return message._id !== id;
          })
        );
      })
      .catch((error) => {});
  };
  return (
    <div className="messages-cont">
      <button
        type="submit"
        className="findprofile-email-button"
        onClick={(e) => {
          e.preventDefault();
          getMessages();
        }}
      >
        Fetch Messages / Update
      </button>
      <br />
      {load ? (
        <i
          className="fas fa-circle-notch"
          style={{
            display: load ? "inline-block" : "none",
            animation: "spin 2s linear infinite",
            fontSize: "64px",
          }}
        />
      ) : (
        <>
          <select
            className="bv-btns"
            onChange={(e) => {
              settype(e.target.value);
              if (e.target.value === "UnRead") {
                filter(true);
              } else {
                filter(false);
              }
            }}
          >
            <option value="UnRead">Not Seen</option>
            <option value="Read">Seen</option>
          </select>
          {filteredMessages.length ? (
            <>
              {filteredMessages.map((message, idx) => (
                <div className="messages-item" key={idx}>
                  <div className="messages-item-top">
                    <p className="messages-top-name">Name : {message.name}</p>
                    <p className="messages-top-email">
                      Email :{" "}
                      <input
                        id={message._id}
                        type="text"
                        value={message.email}
                        contentEditable="false"
                      />{" "}
                      &nbsp;&nbsp;
                      <i
                        className="far fa-copy"
                        title="Copy to Clipboard"
                        onClick={(e) => {
                          const mail = document.getElementById(message._id);
                          mail.select();
                          document.execCommand("copy");
                          e.target.innerHTML = "copied!";
                          setTimeout(() => {
                            e.target.innerHTML = "";
                          }, 3000);
                        }}
                      ></i>
                    </p>
                  </div>
                  <div className="messages-item-middle">
                    <p className="messages-middle-sub">Subject :</p>
                    <div className="messages-middle-sub-containt">
                      <textarea
                        className="messages-subject"
                        value={message.subject}
                      />
                    </div>
                  </div>
                  <div className="messages-item-bottom">
                    <p className="messages-bottom-message">Message</p>
                    <div className="messages-bottom-message-containt">
                      <textarea
                        className="messages-desc"
                        value={message.message}
                      />
                    </div>
                  </div>
                  <div className="delete-message" title="Delete Message">
                    <i
                      className="fas fa-trash-alt"
                      onClick={(e) => {
                        DeleteMessage(e, message._id);
                      }}
                    />
                  </div>
                  <div
                    className="markasread-message"
                    title={message.read ? "Mark as UnRead" : "Mark as Read"}
                  >
                    <i
                      className={
                        message.read ? "fas fa-check-square" : "far fa-square"
                      }
                      onClick={(e) => {
                        if (message.read) {
                          MarkAsUnRead(e, message, message._id);
                        } else {
                          MarkAsRead(e, message, message._id);
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  LoadMore();
                }}
                style={{display: page + 1 <= totalPages ? "block" : "none"}}
              >
                More&nbsp;
                <i className="fas fa-caret-down" />
              </button>
            </>
          ) : (
            <h1>Nothing Here!</h1>
          )}
        </>
      )}
    </div>
  );
};

export default Messages;
