import React from "react";

// Mui Components
import { Stack, Button, IconButton } from "@mui/material";

// Mui Icons
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const TEAM_DATA = [
  {
    Name: "Abhishek Singh",
    Location: "Kanpur, India",
    ProfileImg: "https://i.ibb.co/GvxckCq/abhishek-img.jpg",
    About: [
      "Frontend Developer Bookshlf.in",
      "Btech Final Year Student @IIIT Lucknow",
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
    Linkedin: "https://www.linkedin.com/in/abhishekworks787/",
  },
  {
    Name: "Rohit Kumar",
    Location: "Kanpur, India",
    ProfileImg: "https://i.ibb.co/m6hvrCB/rohit-img.jpg",
    About: [
      "Backend Developer Bookshlf.in",
      "Btech Final Year Student @IIIT Lucknow",
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
    ProfileImg:
      "https://lh3.googleusercontent.com/drive-viewer/AJc5JmT6h8EBxlVT7EP02n97IxyOUYDTmfd2jd4xRNSFS9zIadUMwuNPY4Sjn65KRJxbB3NBtxyfwAQ=w1366-h768",
    About: ["Maintainer Bookshlf.in", "Btech Final Year Student @IIIT Lucknow"],
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

const AboutTeam = () => {
  const OpenLink = (link) => {
    window.open(link, "_blank").focus();
  };

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
  );
};

export default AboutTeam;
