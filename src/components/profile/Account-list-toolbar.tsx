import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { useState } from "react";
import { UserModal } from "../../model/User";
import AccountForm from "./AccountForm";

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onAddAccount: (accountData: UserModal) => void;
  accountData: UserModal;
};

export const AccountListToolbar = (props: Props) => {
  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Account
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button onClick={props.handleOpen} color="primary" variant="contained">
            Add Account
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search account"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <AccountForm
        key={Math.random()}
        open={props.open}
        handleOpen={props.handleOpen}
        handleClose={props.handleClose}
        onAddAccount={props.onAddAccount}
        accountData={props.accountData}
      />
    </Box>
  );
};
