import { useState } from "react";

// API
import axios from "../../../axios";

// MUI Components
import { TextField, Button, Dialog } from "@mui/material";
import { Stack, CircularProgress, Alert } from "@mui/material";

// MUI Icons
import EditIcon from "@mui/icons-material/Edit";

const bookshlfSignature = `<p style="font-size:12px;margin: 5px 10px">Best Regards,</p> <div style="display : flex;">
<img src="https://lh4.googleusercontent.com/L_0BNXxlCk0-RoIlp_SkBOsvLeZI9-CCsfIJIPWdjatxmCKdNKYBuyAWay-GvyRPjhSOQ8-zEz3W0dYEadqcO9AF90m0V62qFlw1BcuvoYv8iC9irzuLLLh9AZALA2Lefuc9-LEdrO_sDan8kw" alt="bookshlf.in" height="70" width="70"> <div style="margin-left: 16px"> <p style="font-size:12px;color:rgb(44,50,102);font-family:Montserrat,sans-serif;font-weight:700; margin: 0px;"> Team Bookshlf </p> <p style="font-size:10px;font-family:Montserrat,sans-serif; margin: 5px 0px;"> E : <a style="text-decoration:none;" href="mailto:bookshlf.in@gmail.com" target="_blank">bookshlf.in@gmail.com<span style="color:red"></span></a> </p>
<p style="font-size:10px;font-family:Montserrat,sans-serif; margin: 5px 0px;"> M : <a style="text-decoration:none;" href="tel:+91 97926 66122" target="_blank"> +91 97926 66122</a> </p>
<a style="font-size:10px;font-family:Montserrat,sans-serif; margin: 5px 0px; text-decoration:none;" href="https://bookshlf.in" target="_blank">www.bookshlf.in</a> <br> 
<span><a href="https://www.youtube.com/channel/UCvZJWq7cQ4-cGJFsCWIppGQ" target="_blank" ><img src="https://lh4.googleusercontent.com/7fb7KCJzkYhsPpO5Xl2mLrBuXyeIvu0QX-YYTDpAK8sXkC7dsLiPeb44HW-94ctdVfcCkO9bBEEV5jQ1cV5k-K8BYFaeEV0FfJyDKVvEnFkIpa3dF21n8GjIfflMh763Ql_AlnSxMG9HqLsV8Q" height="20" width="20"/></a></span>
<span><a href="https://instagram.com/_bookshlf" target="_blank"><img src="https://lh5.googleusercontent.com/ufGENV_gt-_cq6oOGxIsUO1wYOFE3UhjJ4LxMxMzjiUPtB4jBFxcDGNT5LO1K9jVxNAJ3AVqxy2fbetFSulm1DQ5ZShNThhxTha3VurbYRqcanHVht9JTjf1NGf3c87V2Rp28ZzwdxSNZmJ7s-tP4HBnBJQar8CRiBEWp860nosZgZ9w54IncYn-ahJbrw" height="20" width="20"/></a></span> </div> </div>`;

const formatDate = (date) => {
  const newDate = new Date(date);
  return (
    newDate.toLocaleDateString("en-US") +
    " : " +
    newDate.toLocaleTimeString("en-US")
  );
};

const ComposeMail = ({ value, type, emailData }) => {
  // loading states
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [show, setShow] = useState(false);

  // States
  const [data, setData] = useState({
    to: emailData ? emailData.email : "",
    from: "support@bookshlf.in",
    cc: "",
    bcc: "bookshlf.in@gmail.com",
    subject: emailData ? emailData.subject : "",
    text: "",
  });

  const makeHTML = (text) => {
    return `<div><p>${text}</p> <div class="gmail_quote">${
      emailData
        ? `<div dir="ltr" class="gmail_attr">On ${formatDate(
            emailData?.createdAt
          )} <a href="mailto:${data.to}" target="_blank">${
            data.to
          }</a> wrote: <br> <blockquote class="gmail_quote" style="margin:0 0 0 .8ex; border-left:1px #ccc solid;padding-left:1ex"><div dir="auto">${
            emailData?.message
          }</div></div>`
        : ``
    } </div> <br><br> <div dir="ltr" data-smartmail="gmail_signature">${bookshlfSignature}</div> </div>`;
  };

  // generating params
  const generateParams = async () => {
    return new Promise((resolve, reject) => {
      resolve({
        type: type,
        emailData: {
          to: data.to,
          from: data.from,
          cc: data.cc,
          bcc: data.bcc,
          subject: data.subject,
          html: makeHTML(data.text),
        },
      });
    });
  };

  // sending mail
  const sendEmail = async () => {
    setSending(true);
    const params = await generateParams();
    // console.log(params);
    axios
      .post("/admin-sendEmail", params)
      .then((res) => {
        // console.log("email Sent!");
        setShow(true);
        setSending(false);
      })
      .catch((err) => {
        setSending(false);
        console.log(err.response.data);
      });
  };

  // handle state change
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Button
        className="admin-ComposeMailBtn"
        variant="contained"
        color="primary"
        startIcon={<EditIcon />}
        onClick={() => setOpen(true)}
      >
        {value}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Stack
          spacing={2}
          sx={{ padding: "24px 15px", width: 550, minHeight: "50vh" }}
        >
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <TextField
              size="small"
              label="To"
              name="to"
              value={data.to}
              onChange={handleChange}
              sx={{ "& input": { fontSize: "12px" } }}
              fullWidth
            />
            <TextField
              size="small"
              label="From"
              name="from"
              value={data.from}
              onChange={handleChange}
              sx={{ "& input": { fontSize: "12px" } }}
              fullWidth
            />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <TextField
              size="small"
              label="CC"
              name="cc"
              value={data.cc}
              onChange={handleChange}
              sx={{ "& input": { fontSize: "12px" } }}
              fullWidth
            />
            <TextField
              size="small"
              label="BCC"
              name="bcc"
              value={data.bcc}
              onChange={handleChange}
              sx={{ "& input": { fontSize: "12px" } }}
              fullWidth
            />
          </Stack>
          <TextField
            size="small"
            label="Subject"
            name="subject"
            value={data.subject}
            onChange={handleChange}
            sx={{ "& input": { fontSize: "12px" } }}
            fullWidth
          />
          <TextField
            size="small"
            label="Message"
            multiline
            minRows={5}
            name="text"
            value={data.text}
            onChange={handleChange}
            sx={{ "& textarea": { fontSize: "12px" } }}
            fullWidth
          />
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Button
              variant="contained"
              sx={{ maxWidth: 100 }}
              onClick={sendEmail}
              endIcon={
                sending ? <CircularProgress size={15} color="inherit" /> : null
              }
              disabled={sending}
            >
              Send
            </Button>
            {show && (
              <Alert size="small" sx={{ padding: "0px 16px" }}>
                Mail Sent Successfully!
              </Alert>
            )}
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

export default ComposeMail;
