import { React, useState, useEffect } from "react";
import axios from "../../../api/axios";

// MUI Components
import { Stack, Box, TextField, Button } from "@mui/material";
import { CircularProgress, Grid, Pagination } from "@mui/material";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { Chip, InputAdornment, Divider } from "@mui/material";

// Icons
import ReplayIcon from "@mui/icons-material/Replay";

// Micro components
import CopyableText from "../MicroComponents/customCopyText";

// custom components
import UserProfile from "./UserProfile";

const Users = () => {
  // States
  const [users, setUsers] = useState([]);
  const [usersPerPage, setUsersPerPage] = useState(8);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [Loading, setLoading] = useState(false);

  const [userProfile, setUserProfile] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");

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

  const getUserProfile = (param) => {
    axios
      .get("/admin-getUserProfile", {
        params: param,
      })
      .then((res) => {
        setUserProfile(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <Stack spacing={2} sx={{ paddingTop: "24px" }}>
      <Stack spacing={2} sx={{ padding: "15px 24px" }} direction="row">
        <TextField
          value={userEmail}
          label="Email"
          onChange={(e) => setUserEmail(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={() => getUserProfile({ email: userEmail })}
                  size="small"
                  variant="outlined"
                >
                  Find User
                </Button>
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 400 }}
        />
        <TextField
          value={userId}
          label="User ID"
          onChange={(e) => setUserId(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={() => getUserProfile({ userId: userId })}
                  size="small"
                  variant="outlined"
                >
                  Find User
                </Button>
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 400 }}
        />
      </Stack>
      <Stack spacing={2} sx={{ padding: "0px 24px" }} direction="row">
        {userProfile && <UserProfile data={userProfile} />}
      </Stack>
      <Divider orientation="horizontal" flexItem />
      <Stack
        spacing={2}
        direction="row"
        sx={{ padding: "0px 24px" }}
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
          size="small"
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
        <FormControl
          sx={{ minWidth: 200 }}
          color="success"
          size="small"
          variant="standard"
        >
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
      <Stack sx={{ padding: "0px 24px 15px 24px" }}>
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
                <Stack spacing={2}>
                  <Stack spacing={2} direction="row">
                    {user.roles.map((role) => (
                      <div key={role}>
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
                      </div>
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
    </Stack>
  );
};

export default Users;
