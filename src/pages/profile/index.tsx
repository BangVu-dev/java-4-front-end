import HomeLayout from '../../components/home-layout';
import Profile from '../../components/profile/Profile'
import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../../components/account/account-profile";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AccountProfileDetails } from '../../components/account/account-profile-details';

export default function index() {
  return (
    <>
      <Head>
        <title>Account | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

index.getLayout = (page: any) => <HomeLayout>{page}</HomeLayout>;