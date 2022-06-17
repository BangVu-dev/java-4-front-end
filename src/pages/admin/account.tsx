import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../../components/account/account-profile";
import { AccountProfileDetails } from "../../components/account/account-profile-details";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserModal } from "../../model/User";
import { AccountListToolbar } from "../../components/profile/Account-list-toolbar";
import { AccountListResults } from "../../components/profile/Account-list-results";
import { userController } from "../../controller/UserController";
import { toast } from "react-toastify";
import { UserCreateContext } from "../../context/UserContext";

const Account = () => {
  const router = useRouter();
  const { userInfo, changeUserInfo } = useContext(UserCreateContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setAccountData({
      userId: 0,
      userName: "",
      password: "",
      email: "",
      role: "user",
    });
  };
  const [data, setData] = useState<UserModal[]>([]);
  const [accountData, setAccountData] = useState<UserModal>({
    userId: 0,
    userName: "",
    password: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    getAccountList();
  }, []);

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

  const getAccountList = () => {
    userController.getAccountList().then((res) => {
      setData(res);
    });
  };

  const onAddAccount = (accountData: UserModal) => {
    if (accountData.userId != 0) {
      userController.userUpdate(accountData).then((res) => {
        getAccountList();
      });
      handleClose();
      toast.success("Update successfully!", {
        position: "bottom-left",
        autoClose: 1500,
      });
      changeUserInfo();
    } else {
      userController.onAddAccount(accountData).then((res) => {
        getAccountList();
      });
      handleClose();
      toast.success("Add successfully!", {
        position: "bottom-left",
        autoClose: 1500,
      });
    }

    setAccountData({
      userId: 0,
      userName: "",
      password: "",
      email: "",
      role: "user",
    });
  };

  const onSetAccount = (accountData: UserModal) => {
    setAccountData({ ...accountData });
  };

  const onDeleteAccount = (id: number) => {
    userController.onDeleteAccount(id).then((res) => {
      getAccountList();
    });
    toast.success("Delete successfully!", {
      position: "bottom-left",
      autoClose: 1500,
    });
  };

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
        <Container maxWidth={false}>
          <AccountListToolbar
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            onAddAccount={onAddAccount}
            accountData={accountData}
          />
          <Box sx={{ mt: 3 }}>
            <AccountListResults
              accountList={data}
              handleOpen={handleOpen}
              onSetAccount={onSetAccount}
              onDeleteAccount={onDeleteAccount}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Account.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;
