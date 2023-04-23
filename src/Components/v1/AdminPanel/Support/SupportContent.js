import React, { useState, useEffect } from "react";

// API
import axios from "../../../../api/axios";

// MUI Components
import { Stack, Pagination, Alert } from "@mui/material";
import { CircularProgress } from "@mui/material";
import Message from "./Message";

const SupportContent = ({ panel, setPanel, page, setPage }) => {
  // loading
  const [Loading, setLoading] = useState(false);

  // data states
  const [totalPages, setTotalPages] = useState(0);
  const [noOfMessagesInOnePage, setnoOfMessagesInOnePage] = useState(50);
  const [messagesList, setMessagesList] = useState([]);

  // fetch users messages
  const fetchMessages = () => {
    setLoading(true);
    const getURL = "/admin-getMessageList";
    let getParams = {
      page: page,
      noOfMessagesInOnePage: noOfMessagesInOnePage,
    };
    if (panel > 0) {
      getParams = {
        ...getParams,
        queryType:
          panel === 1 ? "GENERAL" : panel === 2 ? "ORDER_HELP" : "FEEDBACK",
      };
    }

    axios
      .get(getURL, {
        params: getParams,
      })
      .then((res) => {
        // console.log(res.data);
        setMessagesList(res.data.data);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, [panel, page]);

  return (
    <Stack className="admin-supportContent" spacing={2}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, pageNo) => setPage(pageNo)}
        color="primary"
        size="small"
        shape="rounded"
      />
      <Stack
        sx={{ flexGrow: 1, width: "calc(100% - 20px)" }}
        alignItems="center"
      >
        {Loading && <CircularProgress size={40} color="info" />}
        {!Loading && messagesList && messagesList.length ? (
          messagesList.map((message) => (
            <React.Fragment key={message._id}>
              <Message data={message} />
            </React.Fragment>
          ))
        ) : !Loading ? (
          <Alert severity="warning"> No Messages Found</Alert>
        ) : null}
      </Stack>
    </Stack>
  );
};

export default SupportContent;
