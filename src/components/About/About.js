import { React } from "react";
import { Helmet } from "react-helmet";
import { makeStyles } from "@mui/styles";

// Components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

// Icons
import WebsiteIcon from "@mui/icons-material/Language";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Links
const GITHUB_URL = "https://github.com/Bookshlf-in";
const WEBSITE_URL = "https://bookshlf.in";
const YOUTUBE_URL = "https://www.youtube.com/channel/UCvZJWq7cQ4-cGJFsCWIppGQ";
const FACEBOOK_URL = "https://www.facebook.com/Bookshlf-109479771200918";
const LINKEDIN_URL = "https://www.linkedin.com/in/bookshlf-by-aman-861073223/";
const INSTAGRAM_URL = "https://twitter.com/BookshlfA";

const IMR_URL = "/images/AboutBG/aboutbg_1.jpg";
const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "10px",
    minHeight: "calc(100vh - 56px)",
    backgroundImage: `url(${IMR_URL})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "norepeat",
  },
});

const About = () => {
  const classes = useStyles();
  const Year = new Date().getFullYear();
  // Opening Links
  const OpenLink = (link) => {
    window.open(link, "_blank").focus();
  };
  return (
    <>
      <Helmet>
        <title>About | Bookshlf</title>
        <meta
          name="description"
          content="We are a team of students who are enthusiastic developers. We are trying to create a platform for students who cannot afford to buy books due to financial problems."
        />
      </Helmet>
      <Box className={classes.root}>
        <Stack
          sx={{ width: "100%", padding: "10px" }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            src="/images/smallLogo.svg"
            alt="bookhlf.in"
            variant="rounded"
            sx={{ height: 67, width: 80 }}
          />
          <Typography
            variant="h1"
            sx={{
              fontFamily: "PT sans",
              color: "rgba(0,0,0,0.6)",
              "@media screen and (max-width:600px)": { fontSize: "3em " },
            }}
          >
            BOOKSHLF
          </Typography>
          <Typography variant="body1" align="center">
            <strong>E-commerce platform to buy and sell used books</strong>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              maxWidth: 600,
              padding: "20px",
              textAlign: "justify",
              backgroundColor: "rgba(255,255,255,0.4)",
              borderRadius: "10px",
            }}
          >
            <strong>
              We are a small team of students who are enthusiastic developers.
              We are trying to create a better viable platform for students who
              want to learn but due to financial issues can't afford new books.
              We also want to help those who want to sell thier books which they
              don't need. We hope that you will find this platform usefull. We
              are always trying to make this platform better.
            </strong>
          </Typography>
          <Typography variant="h4" align="center">
            <strong>Reach Us</strong>
          </Typography>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
          >
            <Stack spacing={2} direction="row">
              <IconButton
                aria-label="github"
                onClick={() => OpenLink(GITHUB_URL)}
              >
                <GitHubIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton
                aria-label="website"
                onClick={() => OpenLink(WEBSITE_URL)}
              >
                <WebsiteIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton
                aria-label="website"
                onClick={() => OpenLink(YOUTUBE_URL)}
              >
                <YouTubeIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
            <Stack spacing={2} direction="row">
              <IconButton
                aria-label="website"
                onClick={() => OpenLink(INSTAGRAM_URL)}
              >
                <InstagramIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton
                aria-label="website"
                onClick={() => OpenLink(FACEBOOK_URL)}
              >
                <FacebookIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton
                aria-label="website"
                onClick={() => OpenLink(LINKEDIN_URL)}
              >
                <LinkedInIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
          </Stack>
          <Typography
            variant="h3"
            sx={{ color: "rgba(255,255,255,0.4)", letterSpacing: "5px" }}
          >
            <strong>{Year}</strong>
          </Typography>
        </Stack>
      </Box>
    </>
  );
};
export default About;
