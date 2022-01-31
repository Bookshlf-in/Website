import { React, useRef } from "react";
import { Helmet } from "react-helmet-async";
import "./About.css";

// Components
import { Box, Stack, Typography, Avatar } from "@mui/material";
import { IconButton, Grow, Button } from "@mui/material";

// Icons
import WebsiteIcon from "@mui/icons-material/Language";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DownIcon from "@mui/icons-material/ArrowDownwardRounded";

// Links
const GITHUB_URL = "https://github.com/Bookshlf-in";
const WEBSITE_URL = "https://bookshlf.in";
const YOUTUBE_URL = "https://www.youtube.com/channel/UCvZJWq7cQ4-cGJFsCWIppGQ";
const FACEBOOK_URL = "https://www.facebook.com/Bookshlf-109479771200918";
const LINKEDIN_URL = "https://www.linkedin.com/in/bookshlf-by-aman-861073223/";
const INSTAGRAM_URL = "https://twitter.com/BookshlfA";

const TEAM_DATA = [
  {
    Name: "Abhishek Singh",
    Location: "Kanpur, India",
    ProfileImg: "https://i.ibb.co/GvxckCq/abhishek-img.jpg",
    About: [
      "Frontend Developer Bookshlf.in",
      "Btech Prefinal Year Student @IIIT Lucknow",
    ],
    Skills: [
      "C",
      "C++",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "JavaScript",
      "ReactJs",
      "Material UI",
      "Firebase",
      "Git",
      "GitHub",
    ],
    profileLink: "https://hblord787.me/",
    Github: "https://github.com/Mrhb787",
    Linkedin: "https://www.linkedin.com/in/abhishek-singh-90a854192/",
  },
  {
    Name: "Rohit Kumar",
    Location: "Kanpur, India",
    ProfileImg: "https://i.ibb.co/m6hvrCB/rohit-img.jpg",
    About: [
      "Backend Developer Bookshlf.in",
      "Btech Prefinal Year Student @IIIT Lucknow",
    ],
    Skills: [
      "C",
      "C++",
      "HTML5",
      "CSS3",
      "JavaScript",
      "NodeJs",
      "ReactJs",
      "React Native",
      "Postman",
      "Firebase",
      "MongoDB",
      "Git",
      "GitHub",
    ],
    profileLink: "https://rohit-kumar.me/",
    Github: "https://github.com/RohitKumar-200",
    Linkedin: "https://www.linkedin.com/in/rohitkumar-200/",
  },
  {
    Name: "Aman Verma",
    Location: "Kanpur, India",
    ProfileImg: "https://i.ibb.co/QKSRdM1/aman-img.jpg",
    About: [
      "Maintainer Bookshlf.in",
      "Btech Prefinal Year Student @IIIT Lucknow",
    ],
    Skills: [
      "Ms Excel",
      "Ms Word",
      "Ms PowerPoint",
      "Video Editing",
      "Sales & Management",
      "Youtube",
      "Designing",
      "Public Speaking",
    ],
    profileLink: "https://www.youtube.com/channel/UCvZJWq7cQ4-cGJFsCWIppGQ",
    Github: "",
    Linkedin: "https://www.linkedin.com/in/bookshlf-by-aman-861073223/",
  },
];

const About = () => {
  const Scroll = useRef(null);
  const Year = new Date().getFullYear();
  // Opening Links
  const OpenLink = (link) => {
    window.open(link, "_blank").focus();
  };

  // custom component that appears on scroll
  const Appear = (props) => {
    return (
      <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
        {props.content}
      </Grow>
    );
  };

  // custom component that appears on scroll
  const ProfileCard = (props) => {
    return (
      <div className="card-container">
        <span className="pro">ADMIN</span>
        <img className="round" src={props.imgURL} alt={props.Name} />
        <h3>{props.Name}</h3>
        <h6>{props.Location}</h6>
        <p>
          {props?.About?.map((about, i) => (
            <>
              <span key={i}>{about}</span>
              <br />
            </>
          ))}
        </p>
        <Stack
          sx={{ padding: "10px" }}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            className="primary ghost"
            href={props.profileLink}
            target="_blank"
            size="small"
          >
            View Full Profile
          </Button>
        </Stack>
        <h6>Follow</h6>
        <Stack direction="row" spacing={1} justifyContent="center">
          <IconButton
            aria-label="github"
            onClick={() => OpenLink(props.Github)}
            size="small"
          >
            <GitHubIcon sx={{ color: "white", height: 16, width: 16 }} />
          </IconButton>
          <IconButton
            aria-label="linkedin"
            onClick={() => OpenLink(props.Linkedin)}
            size="small"
          >
            <LinkedInIcon sx={{ color: "white", height: 16, width: 16 }} />
          </IconButton>
        </Stack>
        <div className="skills">
          <h6>Skills</h6>
          <ul>
            {props?.skills?.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    );
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
      <Box className="about-bg">
        <Stack
          sx={{
            width: "100%",
            padding: "10px",
            minHeight: "calc(100vh - 56px)",
          }}
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Appear
            content={
              <Avatar
                src="/images/smallLogo.svg"
                alt="bookhlf.in"
                variant="rounded"
                sx={{ height: 67, width: 80 }}
              />
            }
          />
          <Appear
            content={
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "PT sans",
                  color: "rgba(255,255,255,0.9)",
                  letterSpacing: "2px",
                  fontWeight: "bolder",
                  "@media screen and (max-width:600px)": { fontSize: "3em " },
                }}
              >
                BOOKSHLF
              </Typography>
            }
          />
          <Appear
            content={
              <div>
                <Typography
                  variant="body1"
                  align="center"
                  sx={{ color: "rgba(255,255,255,0.9)" }}
                >
                  E-commerce platform to buy and sell used books
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    maxWidth: 600,
                    padding: "20px",
                    textAlign: "justify",
                    backgroundColor: "rgba(255,255,255,0.6)",
                    borderRadius: "10px",
                  }}
                >
                  We are a small team of students who are enthusiastic
                  developers. We are trying to create a better viable platform
                  for students who want to learn but due to financial issues
                  can't afford new books. We also want to help those who want to
                  sell thier books which they don't need. We hope that you will
                  find this platform usefull. We are always trying to make this
                  platform better.
                </Typography>
              </div>
            }
          />
          <Appear
            content={
              <div>
                <Typography
                  variant="h4"
                  align="center"
                  sx={{ color: "rgba(255,255,255,0.9)" }}
                >
                  Reach Us
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
              </div>
            }
          />

          <Typography
            variant="h4"
            sx={{
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "5px",
              cursor: "pointer",
              padding: "10px 16px",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
            }}
            onClick={() => {
              if (Scroll && Scroll.current) {
                Scroll.current.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                  inline: "nearest",
                });
              }
            }}
          >
            TEAM&nbsp;
            <DownIcon className="updown" />
          </Typography>
        </Stack>
        <Stack spacing={2} sx={{ padding: "16px 10px" }} ref={Scroll}>
          <Stack
            direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
            spacing={2}
            justifyContent="space-evenly"
            alignItems="center"
          >
            {TEAM_DATA.map((person) => (
              <ProfileCard
                imgURL={person.ProfileImg}
                Name={person.Name}
                Location={person.Location}
                About={person.About}
                skills={person.Skills}
                profileLink={person.profileLink}
                Github={person.Github}
                Linkedin={person.Linkedin}
              />
            ))}
          </Stack>

          <Typography
            variant="h4"
            sx={{ color: "rgba(255,255,255,0.4)", letterSpacing: "5px" }}
            align="center"
          >
            {Year}
          </Typography>
        </Stack>
      </Box>
    </>
  );
};
export default About;
