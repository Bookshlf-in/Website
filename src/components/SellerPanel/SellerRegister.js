import { React, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import { UserContext } from "../../Context/userContext";
import { useHistory } from "react-router-dom";
import axios from "../../axios";

// Components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@mui/material/TextField";
import InputMask from "react-input-mask";
import Button from "@material-ui/core/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";

// icons
import AddPhotoIcon from "@material-ui/icons/AddAPhotoRounded";
import AddIcon from "@material-ui/icons/AddCircleOutlineRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "PT sans !important",
    "& input": {
      fontFamily: "PT sans !important",
    },
    "& textarea": {
      fontFamily: "PT sans !important",
    },
    "& label": {
      fontFamily: "PT sans !important",
    },
    "& p": {
      fontFamily: "PT sans !important",
    },
  },
}));

const Input = styled("input")({
  display: "none",
});

export default function SellerRegister() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);

  // states
  const [Name, setName] = useState("");
  const [Intro, setIntro] = useState("");
  const [load, setload] = useState(false);
  const [Image, setImage] = useState("/images/user.png");
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

  const FilterPhoneNumber = async (num) => {
    num = num.replaceAll("(", "");
    num = num.replaceAll(")", "");
    num = num.replaceAll("-", "");
    num = num.substr(3, 10);
    return Number(num);
  };

  // Image Size Validator
  const validateSize = () => {
    const fileSize = Photo.size / 1024 / 1024; // in MiB
    if (fileSize > 5) return false;
    else return true;
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

  const handelRegister = async () => {
    setload(true);
    const num1 = await FilterPhoneNumber(PhoneNo);
    const num2 = await FilterPhoneNumber(AltPhoneNo);
    if (validateSize()) {
      const imgURL = await uploadSingleImage(Photo);
      axios
        .post("/sellerRegister", {
          name: Name,
          phoneNo: num1,
          altPhoneNo: num2,
          intro: Intro,
          photo: imgURL,
        })
        .then((response) => {
          // console.log(response.data);
          setload(false);
          setalert({
            show: true,
            type: "success",
            msg: "Registration Successfully Completed",
          });
          user.roles.push("seller");
          localStorage.setItem(
            "bookshlf_user",
            JSON.stringify({
              authHeader: user.authHeader,
              roles: user.roles,
              email: user.email,
              wishlist: user.wishlist,
              cartitems: user.cartitems,
            })
          );
          setUser({
            authHeader: user.authHeader,
            roles: user.roles,
            email: user.email,
            wishlist: user.wishlist,
            cartitems: user.cartitems,
          });
          setTimeout(() => {
            history.go(0);
          }, 3000);
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
        msg: "Image File Size Should be Less Than 5 MB.",
      });
      setTimeout(() => {
        setalert({
          show: false,
          type: "info",
          msg: "",
        });
      }, 3000);
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
        <Stack spacing={2} direction="column">
          <Alert severity="error" className={classes.root}>
            <AlertTitle className={classes.root}>Register As Seller</AlertTitle>
            Oops you are not registered. Please Register As Seller.
          </Alert>
          <Stack direction="column" spacing={1} sx={{ padding: "10px" }}>
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
              className={classes.root}
              label="Name"
              variant="standard"
              onChange={(e) => setName(e.target.value)}
              value={Name}
              helperText="Preferred Seller Name"
            />
            <TextField
              variant="standard"
              label="About Yourself"
              helperText="Tell Others about Yourself. A short Insight Intro."
              multiline
              maxRows={2}
              onChange={(e) => setIntro(e.target.value)}
              value={Intro}
              className={classes.root}
            />
            <Stack direction="column" spacing={1}>
              <label
                htmlFor="phone-no"
                id="mobile-label"
                className={classes.root}
              >
                Mobile Phone
                <br />
                <InputMask
                  id="phone-no"
                  mask="+\91-(999)-(999)-(9999)"
                  alwaysShowMask={true}
                  value={PhoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </label>
              <label
                htmlFor="alt-phone-no"
                id="mobile-label"
                className={classes.root}
              >
                Alt Mobile Phone
                <br />
                <InputMask
                  id="alt-phone-no"
                  mask="+\91-(999)-(999)-(9999)"
                  value={AltPhoneNo}
                  alwaysShowMask={true}
                  onChange={(e) => setAltPhoneNo(e.target.value)}
                />
              </label>
            </Stack>
            <LoadingButton
              endIcon={<AddIcon />}
              loading={load}
              loadingPosition="end"
              variant="contained"
              className={classes.root}
              onClick={handelRegister}
            >
              Register
            </LoadingButton>
            {alert.show ? (
              <Alert severity={alert.type} className={classes.root}>
                {alert.msg}
              </Alert>
            ) : null}
          </Stack>
        </Stack>
      ) : (
        <Alert severity="error" className={classes.root}>
          <AlertTitle className={classes.root}> Please Login </AlertTitle>
          You are not Logged In. <br />
          <br />
          <Button
            size="small"
            className={classes.root}
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
