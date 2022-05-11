import { React, useState, useContext } from "react";
import { styled } from "@mui/styles";
import { UserContext } from "../../Context/userContext";
import { useHistory } from "react-router-dom";
import axios from "../../axios";

// Components
import { Box, Stack, Typography, Alert } from "@mui/material";
import { Avatar, TextField, Button, IconButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// icons
import AddPhotoIcon from "@mui/icons-material/AddAPhotoRounded";
import AddIcon from "@mui/icons-material/AddCircleOutlineRounded";
import BackIcon from "@mui/icons-material/ArrowBackRounded";

const Input = styled("input")({
  display: "none",
});

export default function SellerRegister() {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);

  // states
  const [step, setStep] = useState(0);
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
          .then(() => {
            Showalert(true, "success", "Registration Successfully Completed");
            Redirect();
          })
          .catch(() => {
            Showalert(true, "error", "Registration Failed. Try Again");
            setTimeout(() => {
              Showalert(false, "info", "");
            }, 3000);
          });
      } else {
        Showalert(true, "error", "Phone Number Invalid!");
        setTimeout(() => {
          Showalert(false, "info", "");
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
          .then(() => {
            Showalert(true, "success", "Registration Successfully Completed");
            Redirect();
          })
          .catch(() => {
            Showalert(true, "error", "Registration Failed. Try Again");
            setTimeout(() => {
              Showalert(false, "info", "");
            }, 3000);
          });
      } else {
        Showalert(true, "error", "Phone Number Invalid!");
        setTimeout(() => {
          Showalert(false, "info", "");
        }, 3000);
      }
    }
  };

  // Alert Show
  const Showalert = (show, type, msg) => {
    setload(false);
    setalert({
      show: show,
      type: type,
      msg: msg,
    });
  };

  const RegisterBanner = () => {
    return (
      <Stack
        className="seller-register-banner"
        direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <img
          src="/images/partner.svg"
          alt="Bookshlf Partnership Program"
          className="seller-register-banner-img"
        />
        <Stack spacing={2}>
          <Typography variant="h2" align="center">
            Bookshlf Partnership Program
          </Typography>
          <Typography variant="caption" align="justify">
            Bookshlf takes responsibility of picking up of your books and
            delivering it safely to the buyer based in any corner of India.
          </Typography>
          <Typography variant="caption" align="justify">
            As a Bookshlf Partner you will be eligible for upto 60% of the
            profit earned by selling your books.
          </Typography>
          <Button variant="outlined" color="warning" onClick={() => setStep(1)}>
            Register Now
          </Button>
          <div className="iframe-container">
            <iframe
              className="responsive-iframe"
              src="https://www.youtube.com/embed/yXejJDG8nrk"
              title="How to Sell Books on Bookshlf"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </Stack>
      </Stack>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 48px)",
      }}
    >
      {user ? (
        step === 0 ? (
          <RegisterBanner />
        ) : (
          <Stack
            spacing={1}
            direction="column"
            justifyContent="center"
            alignItems="center"
            className="seller-register-form"
          >
            <IconButton
              className="seller-register-form-back"
              onClick={() => setStep(0)}
              color="warning"
            >
              <BackIcon />
            </IconButton>
            <Avatar
              alt="Profile"
              src={Image}
              sx={{ height: 100, width: 100 }}
            />
            <label>
              <Input
                accept="image/*"
                type="file"
                onChange={(e) => handelUpload(e)}
              />
              <IconButton
                color="warning"
                aria-label="upload picture"
                component="span"
              >
                <AddPhotoIcon />
              </IconButton>
            </label>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              onChange={(e) => setName(e.target.value)}
              value={Name}
              helperText="Preferred Seller Name"
              sx={{ maxWidth: 350 }}
              color="warning"
            />
            <TextField
              variant="outlined"
              fullWidth
              label="About Yourself"
              helperText="Tell Others about Yourself. A short Insight Intro."
              multiline
              maxRows={2}
              onChange={(e) => setIntro(e.target.value)}
              value={Intro}
              sx={{ maxWidth: 350 }}
              color="warning"
            />
            <TextField
              label="Contact Number"
              variant="outlined"
              fullWidth
              value={PhoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              type="number"
              sx={{ maxWidth: 350 }}
              color="warning"
              helperText="Preferred 10 Digit Contact Number"
            />
            <TextField
              label="Alternate Contact Number"
              variant="outlined"
              fullWidth
              value={AltPhoneNo}
              onChange={(e) => setAltPhoneNo(e.target.value)}
              type="number"
              sx={{ maxWidth: 350 }}
              color="warning"
            />
            {alert.show ? (
              <Alert severity={alert.type} variant="outlined">
                {alert.msg}
              </Alert>
            ) : null}
            <LoadingButton
              endIcon={<AddIcon />}
              loading={load}
              loadingPosition="end"
              variant="outlined"
              onClick={handelRegister}
              fullWidth
              sx={{ maxWidth: 350 }}
              color="warning"
            >
              Register
            </LoadingButton>
          </Stack>
        )
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
