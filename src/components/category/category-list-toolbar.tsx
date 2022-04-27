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
import CategoryForm from "./CategoryForm";
import { CategoryModal } from "../../model/Category";

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onAddCategory: (categoryData: CategoryModal) => void;
  categoryData: CategoryModal;
};

export const CustomerListToolbar = (props: Props) => {
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
          Category
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button onClick={props.handleOpen} color="primary" variant="contained">
            Add Category
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
                placeholder="Search category"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <CategoryForm
        key={Math.random()}
        open={props.open}
        handleOpen={props.handleOpen}
        handleClose={props.handleClose}
        onAddCategory={props.onAddCategory}
        categoryData={props.categoryData}
      />
    </Box>
  );
};
