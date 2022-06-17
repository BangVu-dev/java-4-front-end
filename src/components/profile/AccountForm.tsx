import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CategoryModal } from "../../model/Category";
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserModal } from "../../model/User";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  backgroundColor: "background.paper",
  border: "1px solid #666666",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  outline: 'none'
};

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onAddAccount: (accountData: UserModal) => void;
  accountData: UserModal;
};

export default function AccountForm(props: Props) {
  const [accountData, setAccountData] = useState<UserModal>({
    userId: props.accountData.userId,
    userName: props.accountData.userName,
    password: props.accountData.password,
    email: props.accountData.email,
    role: props.accountData.role,
  });

  const formik = useFormik({
    initialValues: {
      ...accountData,
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
    }),
    onSubmit: () => {
      props.onAddAccount(formik.values);
    },
  });

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight={500}>
            {accountData.userId != 0 ? "Update Account" : "Add Account"}
          </Typography>

          <CloseIcon
            onClick={props.handleClose}
            sx={{ fontSize: 30, color: "#808080", cursor: "pointer", "&:hover": { color: "#333" } }}
          />
        </Grid>

        <Box mt={4}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container xs={12}>
              <TextField
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Username"
                name="userName"
                variant="outlined"
                helperText={formik.touched.userName && formik.errors.userName}
                error={Boolean(formik.touched.userName && formik.errors.userName)}
              />
            </Grid>

            <Grid container xs={12} mt={2}>
              <TextField
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Password"
                name="password"
                variant="outlined"
                helperText={formik.touched.password && formik.errors.password}
                error={Boolean(formik.touched.password && formik.errors.password)}
              />
            </Grid>

            <Grid container xs={12} mt={2}>
              <TextField
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                helperText={formik.touched.email && formik.errors.email}
                error={Boolean(formik.touched.email && formik.errors.email)}
              />
            </Grid>

            <Grid container xs={12} mt={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={accountData.role}
                  label="Role"
                >
                  <MenuItem value={"user"}>User</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid container xs={12} mt={2}>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                sx={{ width: "100%" }}
                variant="contained"
              >
                {accountData.userId != 0 ? "Update account" : "Add account"}
              </Button>
            </Grid>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}
