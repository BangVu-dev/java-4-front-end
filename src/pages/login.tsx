import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";
import { useContext, useEffect, useState } from "react";
import { UserModal } from "../model/User";
import { userController } from "../controller/UserController";
import { toast } from "react-toastify";
import { UserCreateContext } from "../context/UserContext";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  outline: "none",
};

const style2 = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  outline: "none",
};

const Login = () => {
  const { userInfo, changeUserInfo } = useContext(UserCreateContext);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [userState, setUserState] = useState<UserModal>({
    userId: 0,
    userName: "",
    password: "",
    email: "",
    role: "",
  });

  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        alert("Username or password is incorrect!");
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
      window.location.href = "/";
    }
  };

  useEffect(() => {
    if (!open2) {
      setUserEmail("");
    }
  }, [open2]);

  const resetPassword = () => {
    userController.onSendPassword(userEmail).then((res) => {
      if (res != 0) {
        setIsLoading(false);
        toast.success("Mật khẩu mới đã được gửi đến email của bạn rồi á!");
      } else {
        setIsLoading(false);
        toast.error("Hình như email bạn vừa nhập không có trong hệ thống á!");
      }
    });
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
              <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                Sign In Now
              </Button>
            </Box>
          </form>

          <Box mb={1}>
            <Typography
              onClick={handleOpen}
              fontSize={14}
              sx={{ cursor: "pointer", "&:hover": { color: "#2196F3" } }}
            >
              Quên mật khẩu?
            </Typography>
          </Box>

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

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography textAlign={"center"} id="modal-modal-title" variant="h6" component="h2">
                Chọn phương thức lấy lại mật khẩu
              </Typography>

              <Stack
                mt={4}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={3}
              >
                <Button
                  onClick={() => {
                    handleClose();
                    handleOpen2();
                  }}
                  fullWidth
                  variant="outlined"
                >
                  Gửi mật khẩu về email
                </Button>
              </Stack>
            </Box>
          </Modal>

          <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style2}>
              <Typography textAlign={"center"} id="modal-modal-title" variant="h6" component="h2">
                Nhập email của bạn dưới đây nek
              </Typography>

              <Stack mt={2}>
                <TextField
                  fullWidth
                  label="Email Address"
                  margin="normal"
                  type="email"
                  variant="outlined"
                  onChange={(e) => setUserEmail(e.target.value)}
                  value={userEmail}
                />

                <LoadingButton
                  loadingPosition="end"
                  loading={isLoading}
                  endIcon={<SendIcon />}
                  sx={{
                    mt: 2,
                    background: (theme) => theme.palette.info.light,
                    "&:hover": { background: "#2196F3" },
                  }}
                  onClick={() => {
                    resetPassword();
                    setIsLoading(true);
                  }}
                  fullWidth
                  variant="contained"
                  disabled={!Boolean(userEmail != "")}
                >
                  Gửi
                </LoadingButton>
              </Stack>
            </Box>
          </Modal>
        </Container>
      </Box>
    </>
  );
};

export default Login;
