import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { SettingsNotifications } from "../../components/settings/settings-notifications";
import { SettingsPassword } from "../../components/settings/settings-password";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Settings = () => {
  const router = useRouter();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    let userInformation;
    let userLocal = localStorage.getItem("userInfo");
    if (userLocal != undefined) {
      userInformation = JSON.parse(userLocal);
    }
    if (userInformation === undefined) {
      window.location.href = "/login";
    } else if (userInformation.role !== "admin") {
      window.location.href = "/";
    }
  };

  return (
    <>
      <Head>
        <title>Settings | Material Kit</title>
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
            Settings
          </Typography>
          <SettingsNotifications />
          <Box sx={{ pt: 3 }}>
            <SettingsPassword />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Settings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Settings;
