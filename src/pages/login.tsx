import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";
import { useContext, useEffect, useState } from "react";
import { UserModal } from "../model/User";
import { userController } from "../controller/UserController";
import { toast } from "react-toastify";
import { UserCreateContext } from "../context/UserContext";

const Login = () => {
  const { userInfo, changeUserInfo } = useContext(UserCreateContext);
  const router = useRouter();

  const [userState, setUserState] = useState<UserModal>({
    userId: 0,
    userName: "",
    password: "",
    email: "",
    role: "",
  });

  const onLogin = (user: UserModal) => {
    userController
      .isLogin(user)
      .then((res) => {
        localStorage.setItem("userInfo", JSON.stringify(res));
        changeUserInfo();
        if (res.role === "admin") {
          toast.success("Login successfully!", {
            position: "bottom-left",
            autoClose: 1500,
          });
          router.push("/admin");
        } else {
          toast.success("Login successfully!", {
            position: "bottom-left",
            autoClose: 1500,
          });
          router.push("/");
        }
      })
      .catch((err) => {
        alert('Username or password is incorrect!')
      });
  };

  const formik = useFormik({
    initialValues: {
      ...userState,
    },
    validationSchema: Yup.object({
      userName: Yup.string().max(20).required("User name is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: () => {
      onLogin(formik.values);
    },
  });

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    let userInformation;
    let userLocal = localStorage.getItem("userInfo");
    if (userLocal != undefined) {
      userInformation = JSON.parse(userLocal);
    }
    if (userInformation !== undefined) {
      window.location.href = '/'
    }
  };

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Sign in
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Sign in on the internal platform
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Button
                color="info"
                fullWidth
                startIcon={<FacebookIcon />}
                // onClick={formik.handleSubmit}
                size="large"
                variant="contained"
              >
                Login with Facebook
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                color="error"
                startIcon={<GoogleIcon />}
                // onClick={formik.handleSubmit}
                size="large"
                variant="contained"
              >
                Login with Google
              </Button>
            </Grid>
          </Grid>
          <Box
            sx={{
              pb: 1,
              pt: 3,
            }}
          >
            <Typography align="center" color="textSecondary" variant="body1">
              or login with email address
            </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              error={Boolean(formik.touched.userName && formik.errors.userName)}
              fullWidth
              helperText={formik.touched.userName && formik.errors.userName}
              label="userName"
              margin="normal"
              name="userName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.userName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                // disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"                
              >
                Sign In Now
              </Button>
            </Box>
          </form>
          <Typography color="textSecondary" variant="body2">
            Don&apos;t have an account?{" "}
            <NextLink href="/register">
              <Link
                href="/register"
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: "pointer",
                }}
              >
                Sign Up
              </Link>
            </NextLink>
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Login;
