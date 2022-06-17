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
    role: userInfo.role,
    userId: userInfo.userId,
  });

  useEffect(() => {
    setValues({
      ...values,
      userName: userInfo.userName,
      email: userInfo.email,
      userId: userInfo.userId,
      role: userInfo.role,
    });
  }, [userInfo]);

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
                disabled
                fullWidth
                label="UserName"
                name="userName"
                required
                value={values.userName}
                variant="outlined"
                sx={{ "& .Mui-disabled": { color: "#333" } }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label="Email Address"
                name="email"
                required
                value={values.email}
                variant="outlined"
                sx={{ "& .Mui-disabled": { color: "#333" } }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button onClick={() => onUpdateUser()} color="primary" variant="contained">
            Save details
          </Button>
        </Box> */}
      </Card>
    </form>
  );
};
