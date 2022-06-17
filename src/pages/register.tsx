import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useContext, useEffect, useState } from "react";
import { UserModal } from "../model/User";
import { userController } from "../controller/UserController";
import { UserCreateContext } from "../context/UserContext";
import { resolveHref } from "next/dist/shared/lib/router/router";
import { toast } from "react-toastify";

const Register = () => {
  const { userInfo, changeUserInfo } = useContext(UserCreateContext);
  const router = useRouter();

  const [userState, setUserState] = useState<UserModal>({
    userId: 0,
    userName: "",
    password: "",
    email: "",
    role: "",
  });

  const onRegister = (user: UserModal) => {
    userController
      .isRegister(user)
      .then((res) => {
        if (res) {
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
        } else {
          alert("Tài khoản hoặc email đã tồn tại rồi bạn êy!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formik = useFormik({
    initialValues: {
      ...userState,
      policy: false,
    },
    validationSchema: Yup.object({
      userName: Yup.string().max(20).required("User name is required"),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: () => {
      onRegister(formik.values);
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

  return (
    <>
      <Head>
        <title>Register | Material Kit</title>
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
              Create a new account
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Use your email to create a new account
            </Typography>
          </Box>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              value={formik.values.userName}
              error={Boolean(formik.touched.userName && formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
              fullWidth
              label="UserName"
              margin="normal"
              name="userName"
              variant="outlined"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <TextField
              value={formik.values.email}
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              variant="outlined"
            />
            <TextField
              value={formik.values.password}
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              variant="outlined"
            />
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography color="textSecondary" variant="body2">
                I have read the{" "}
                <NextLink href="#" passHref>
                  <Link color="primary" underline="always" variant="subtitle2">
                    Terms and Conditions
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                // disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
          </form>
          <Typography color="textSecondary" variant="body2">
            Have an account?{" "}
            <NextLink href="/login" passHref>
              <Link variant="subtitle2" underline="hover">
                Sign In
              </Link>
            </NextLink>
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Register;
