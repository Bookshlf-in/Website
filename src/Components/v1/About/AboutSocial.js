import React from "react";

// Mui Components
import { Stack, IconButton } from "@mui/material";

// Mui Icons
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
const INSTAGRAM_URL = "https://instagram.com/_bookshlf";

const AboutSocial = () => {
  // Opening Links
  const OpenLink = (link) => {
    window.open(link, "_blank").focus();
  };

  // Custom Icon Button Component
  const SocialLink = (props) => {
    return (
      <IconButton
        aria-label={props.label}
        onClick={() => OpenLink(props.url)}
        sx={{ color: "white" }}
        size="small"
      >
        {props.Icon}
      </IconButton>
    );
  };

  return (
    <Stack
      spacing={1}
      direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
    >
      <Stack spacing={1} direction="row">
        <SocialLink url={GITHUB_URL} Icon={<GitHubIcon />} />
        <SocialLink url={WEBSITE_URL} Icon={<WebsiteIcon />} />
        <SocialLink url={YOUTUBE_URL} Icon={<YouTubeIcon />} />
      </Stack>
      <Stack spacing={1} direction="row">
        <SocialLink url={INSTAGRAM_URL} Icon={<InstagramIcon />} />
        <SocialLink url={FACEBOOK_URL} Icon={<FacebookIcon />} />
        <SocialLink url={LINKEDIN_URL} Icon={<LinkedInIcon />} />
      </Stack>
    </Stack>
  );
};
export default AboutSocial;
