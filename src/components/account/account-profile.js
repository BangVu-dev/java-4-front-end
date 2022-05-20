import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { UserCreateContext } from "../../context/UserContext";

const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  city: "Bmt",
  country: "VietNam",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
  timezone: "GMT+7",
};

export const AccountProfile = (props) => {
  const { userInfo } = useContext(UserCreateContext);
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {userInfo.userName}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {`${user.country}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};
