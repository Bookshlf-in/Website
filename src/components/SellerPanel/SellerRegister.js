import { React, useState, useContext } from "react";
import { styled } from "@mui/styles";
import { UserContext } from "../../Context/userContext";
import { useHistory } from "react-router-dom";
import axios from "../../axios";

// Components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";

// icons
import AddPhotoIcon from "@mui/icons-material/AddAPhotoRounded";
import AddIcon from "@mui/icons-material/AddCircleOutlineRounded";

const Input = styled("input")({
  display: "none",
});

export default function SellerRegister() {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);

  // states
  const [Name, setName] = useState("");
  const [Intro, setIntro] = useState("");
  const [load, setload] = useState(false);
  const [Image, setImage] = useState("");
  const [Photo, setPhoto] = useState(null);
  const [PhoneNo, setPhoneNo] = useState("");
  const [AltPhoneNo, setAltPhoneNo] = useState("");
  const [alert, setalert] = useState({
    show: false,
    type: "info",
    msg: "",
  });

  const handelUpload = (e) => {
    setPhoto(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  // Image Size Validator
  const validateSize = () => {
    const fileSize = Photo.size / 1024 / 1024; // in MiB
    if (fileSize > 5) {
      setload(false);
      setalert({
        show: true,
        type: "error",
        msg: "Image File Size Should be Less Than 5 MB.",
      });
      setTimeout(() => {
        setalert({
          show: false,
          type: "info",
          msg: "",
        });
      }, 3000);
      return false;
    } else return true;
  };

  // uploading single image File
  const uploadSingleImage = async (img) => {
    const formData = new FormData();
    formData.append("folder", "sellerProfile");
    formData.append("file", img);
    const result = await axios({
      method: "post",
      url: "/uploadFile",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        return response.data.link;
      })
      .catch((error) => {
        // console.log(error.response.data);
      });
    return result;
  };

  // Redirecting
  const Redirect = () => {
    localStorage.setItem(
      "bookshlf_user",
      JSON.stringify({
        ...user,
        roles: [...Array.from(user.roles), "seller"],
      })
    );
    setUser({
      ...user,
      roles: [...Array.from(user.roles), "seller"],
    });
    setTimeout(() => {
      history.go(0);
    }, 3000);
  };

  // registering Seller
  const handelRegister = async () => {
    setload(true);
    if (Photo && validateSize()) {
      if (PhoneNo.length >= 10 && PhoneNo.length <= 12) {
        const imgURL = await uploadSingleImage(Photo);
        axios
          .post("/sellerRegister", {
            name: Name,
            phoneNo: Number(PhoneNo),
            altPhoneNo: Number(AltPhoneNo),
            intro: Intro,
            photo: imgURL,
          })
          .then((response) => {
            setload(false);
            setalert({
              show: true,
              type: "success",
              msg: "Registration Successfully Completed",
            });
            Redirect();
          })
          .catch((error) => {
            setload(false);
            setalert({
              show: true,
              type: "error",
              msg: "Registration Failed. Try Again",
            });
            setTimeout(() => {
              setalert({
                show: false,
                type: "info",
                msg: "",
              });
            }, 3000);
          });
      } else {
        setload(false);
        setalert({
          show: true,
          type: "error",
          msg: "Phone Number Invalid!",
        });
        setTimeout(() => {
          setalert({
            show: false,
            type: "info",
            msg: "",
          });
        }, 3000);
      }
    } else {
      if (PhoneNo.length >= 10 && PhoneNo.length <= 12) {
        axios
          .post("/sellerRegister", {
            name: Name,
            phoneNo: Number(PhoneNo),
            altPhoneNo: Number(AltPhoneNo),
            intro: Intro,
          })
          .then((response) => {
            setload(false);
            setalert({
              show: true,
              type: "success",
              msg: "Registration Successfully Completed",
            });
            Redirect();
          })
          .catch((error) => {
            setload(false);
            setalert({
              show: true,
              type: "error",
              msg: "Registration Failed. Try Again",
            });
            setTimeout(() => {
              setalert({
                show: false,
                type: "info",
                msg: "",
              });
            }, 3000);
          });
      } else {
        setload(false);
        setalert({
          show: true,
          type: "error",
          msg: "Phone Number Invalid!",
        });
        setTimeout(() => {
          setalert({
            show: false,
            type: "info",
            msg: "",
          });
        }, 3000);
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        minHeight: "calc(100vh - 56px)",
      }}
    >
      {user ? (
        <Stack spacing={1} direction="column">
          <Alert severity="error">
            Oops you are not registered. Please Register As Seller.
          </Alert>
          <Stack
            direction="column"
            spacing={1}
            sx={{ padding: "0px 10px" }}
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              spacing={1}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar
                alt="Profile"
                src={Image}
                style={{ height: "100px", width: "100px" }}
              />
              <label>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={(e) => handelUpload(e)}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <AddPhotoIcon />
                </IconButton>
              </label>
            </Stack>

            <TextField
              label="Name"
              variant="filled"
              fullWidth
              onChange={(e) => setName(e.target.value)}
              value={Name}
              helperText="Preferred Seller Name"
              sx={{ maxWidth: 300 }}
            />
            <TextField
              variant="filled"
              fullWidth
              label="About Yourself"
              helperText="Tell Others about Yourself. A short Insight Intro."
              multiline
              maxRows={2}
              onChange={(e) => setIntro(e.target.value)}
              value={Intro}
              sx={{ maxWidth: 300 }}
            />

            <TextField
              label="Contact Number"
              variant="filled"
              fullWidth
              value={PhoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              type="number"
              sx={{ maxWidth: 300 }}
            />
            <TextField
              label="Alternate Contact Number"
              variant="filled"
              fullWidth
              value={AltPhoneNo}
              onChange={(e) => setAltPhoneNo(e.target.value)}
              type="number"
              sx={{ maxWidth: 300 }}
            />
            {alert.show ? (
              <Alert severity={alert.type}>{alert.msg}</Alert>
            ) : null}
            <LoadingButton
              endIcon={<AddIcon />}
              loading={load}
              loadingPosition="end"
              variant="contained"
              onClick={handelRegister}
              fullWidth
              sx={{ maxWidth: 300 }}
            >
              Register
            </LoadingButton>
          </Stack>
        </Stack>
      ) : (
        <Alert severity="error">
          You are not Logged In. <br />
          <br />
          <Button
            size="small"
            color="primary"
            variant="outlined"
            href={"/Login"}
          >
            Login In Now!
          </Button>
        </Alert>
      )}
    </Box>
  );
}
