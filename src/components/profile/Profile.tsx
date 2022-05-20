import { Box, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserCreateContext } from "../../context/UserContext";

export default function Profile() {
  const { userInfo } = useContext(UserCreateContext);

  return (
    <Grid minHeight={"500px"}>
      <Box mt={4}>
        <Typography>Name: {userInfo !== undefined && userInfo.userName}</Typography>
        <Typography>Email: {userInfo !== undefined && userInfo.email}</Typography>
      </Box>
    </Grid>
  );
}
