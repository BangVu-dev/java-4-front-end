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
import { Download as DownloadIcon } from "../../icons/download";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { CategoryModal } from "../../model/Category";
import { ProductModal } from "../../model/Product";
import CategoryForm from "../category/CategoryForm";
import ProductForm from "./ProductForm";

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onAddProduct: (productData: ProductModal) => void;
  productData: ProductModal;
  categoryData: CategoryModal[];
};

export const ProductListToolbar = (props: Props) => (
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
        Products
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button onClick={props.handleOpen} color="primary" variant="contained">
          Add products
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
                    <SvgIcon fontSize="small" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder="Search product"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>

    <ProductForm
      key={Math.random()}
      open={props.open}
      handleOpen={props.handleOpen}
      handleClose={props.handleClose}
      onAddProduct={props.onAddProduct}
      productData={props.productData}
      categoryData={props.categoryData}
    />
  </Box>
);
