import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { UserCreateContext } from "../../context/UserContext";
import { userController } from "../../controller/UserController";
import { UserModal } from "../../model/User";
import { toast } from "react-toastify";

export const AccountProfileDetails = (props: any) => {
  const { userInfo, changeUserInfo } = useContext(UserCreateContext);
  const [values, setValues] = useState<UserModal>({
    userName: userInfo.userName as string,
    email: userInfo.email as string,
    password: "",
    role: "user",
    userId: userInfo.userId,
  });

  useEffect(() => {
    setValues({
      ...values,
      userName: userInfo.userName,
      email: userInfo.email,
      userId: userInfo.userId,
    });
  }, [userInfo]);

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onUpdateUser = () => {
    userController.userUpdate(values).then((res) => {
      localStorage.setItem("userInfo", JSON.stringify(res));
      changeUserInfo();
    });
    toast.success("The account has been updated successfully!", {
      position: "bottom-left",
      autoClose: 1500,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="UserName"
                name="userName"
                onChange={handleChange}
                required
                value={values.userName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button onClick={() => onUpdateUser()} color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
