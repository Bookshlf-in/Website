import { React, useState } from "react";
import axios from "../../axios";

// MUI Components
import { Button, CircularProgress } from "@mui/material";

const Btn = (props) => {
  const [load, setLoad] = useState(false);
  const [sent, setSent] = useState(false);

  const SendMail = () => {
    setLoad(true);
    // console.log(props.template);
    axios
      .post("/admin-sendEmail", {
        type: "SEND_MULTIPLE",
        emailData: {
          to: props.to,
          from: "shipment@bookshlf.in",
          cc: props.cc,
          bcc: "bookshlf.in@gmail.com",
          subject: props.subject,
          text: props.subject,
          html: props.template,
        },
      })
      .then((res) => {
        setLoad(false);
        setSent(true);
      })
      .catch((err) => {
        setLoad(false);
        // console.log(err.response.data);
      });
  };
  return (
    <Button
      variant={sent ? "contained" : props.variant}
      color={sent ? "success" : props.color}
      size={props.size}
      onClick={SendMail}
      disabled={load}
      endIcon={load ? <CircularProgress color="inherit" size={15} /> : <></>}
    >
      {sent ? "Send Again" : load ? "Sending" : props.label}
    </Button>
  );
};
const Form = (props) => {
  return <div>Form</div>;
};
const Mail = (props) => {
  return (
    <div>
      {props.type === "button" ? (
        <Btn
          variant={props.variant}
          color={props.color}
          size={props.size}
          label={props.label}
          to={props.to}
          cc={props.cc}
          subject={props.subject}
          template={props.template}
        />
      ) : (
        <Form />
      )}
    </div>
  );
};
export default Mail;
