import { React, useState, useEffect } from "react";
import axios from "../../axios";

// MUI Components
import { Stack, Box, TextField, Button } from "@mui/material";
import { CircularProgress, Grid, Pagination } from "@mui/material";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { Typography, Tooltip, Chip } from "@mui/material";

// Icons
import ReplayIcon from "@mui/icons-material/Replay";
import CopyIcon from "@mui/icons-material/ContentCopy";
import CopiedIcon from "@mui/icons-material/FileCopy";

const Users = () => {
  // States
  const [users, setUsers] = useState([]);
  const [usersPerPage, setUsersPerPage] = useState(8);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [Loading, setLoading] = useState(false);

  const getUserList = (pageNo, UsersPerPage) => {
    setLoading(true);
    axios
      .get("/admin-getUserList", {
        params: {
          page: pageNo,
          noOfUsersInOnePage: UsersPerPage,
        },
      })
      .then((response) => {
        setLoading(false);
        setTotalPages(response.data.totalPages);
        setUsers(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    axios
      .get("/admin-getUserList", {
        params: {
          page: 1,
          noOfUsersInOnePage: 50000,
        },
      })
      .then((response) => {
        setTotalUsers(response.data.data.length);
      })
      .catch((error) => {});
  }, []);

  // Custom Copy Component
  const CopyableText = (props) => {
    const [copied, setcopied] = useState(false);

    const CopyText = () => {
      navigator.clipboard.writeText(props.text);
      setcopied(true);
      setTimeout(() => {
        setcopied(false);
      }, 3000);
    };

    return (
      <Stack
        direction="row"
        spacing={1}
        sx={{
          cursor: "pointer",
          padding: "5px",
          borderRadius: "5px",
          border: "1px solid rgba(0,0,0,0.2)",
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          color={copied ? "primary" : "default"}
          sx={{ fontSize: "9px" }}
        >
          {props.text}
        </Typography>
        <Tooltip
          arrow
          title="Click to Copy"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" onClick={CopyText}>
            {!copied ? (
              <CopyIcon color="inhert" sx={{ height: 12, width: 12 }} />
            ) : (
              <CopiedIcon color="inhert" sx={{ height: 12, width: 12 }} />
            )}
          </Typography>
        </Tooltip>

        {copied ? (
          <Typography sx={{ fontSize: "8px" }} color="primary">
            Copied!
          </Typography>
        ) : null}
      </Stack>
    );
  };

  return (
    <Stack spacing={2} sx={{ width: "100%", paddingTop: "24px" }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: "100%" }}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Button
          variant="outlined"
          color="success"
          size="small"
          startIcon={<ReplayIcon />}
          disabled={Loading}
          endIcon={
            Loading ? <CircularProgress size={15} color="inherit" /> : null
          }
          onClick={() => getUserList(page, usersPerPage)}
        >
          Get User List
        </Button>
        <Pagination
          count={totalPages}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(e, newPage) => {
            setPage(newPage);
            getUserList(newPage, usersPerPage);
          }}
          showFirstButton
          showLastButton
          color="success"
        />
        <FormControl sx={{ minWidth: 200 }} color="success">
          <InputLabel id="usersPerPage">Users Per Page</InputLabel>
          <Select
            labelId="usersPerPage"
            value={usersPerPage}
            label="User Per Page"
            onChange={(e) => {
              setUsersPerPage(e.target.value);
              getUserList(page, e.target.value);
            }}
          >
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={40}>40</MenuItem>
          </Select>
        </FormControl>
        <Button>Total Users : {totalUsers}</Button>
      </Stack>
      <Grid container spacing={1} justifyContent="center" sx={{ padding: 0 }}>
        {users.map((user) => (
          <Grid key={user._id} item xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
                padding: "10px",
                border: "2px solid rgba(0,0,0,0.3)",
                borderRadius: "5px",
                height: 200,
              }}
            >
              <Stack sx={{ width: "100%", height: "100%" }} spacing={2}>
                <Stack spacing={2} direction="row">
                  {user.roles.map((role) => (
                    <Chip
                      variant="filled"
                      color={
                        role === "seller"
                          ? "warning"
                          : role === "admin"
                          ? "error"
                          : "success"
                      }
                      label={role}
                      size="small"
                    />
                  ))}
                </Stack>
                <CopyableText text={user._id} />
                <CopyableText text={user.email} />
                <CopyableText text={user.name} />
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Users;
