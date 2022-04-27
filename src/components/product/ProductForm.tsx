import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { FormHelperText, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CategoryModal } from "../../model/Category";
import { ProductModal } from "../../model/Product";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";

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
};

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onAddProduct: (productData: ProductModal) => void;
  productData: ProductModal;
  categoryData: CategoryModal[];
};

interface IFormInputs {
  image: string;
}

const useStyles = makeStyles({
  hideButtonUpAndDown: {
    "& .MuiOutlinedInput-input": {
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
      },
    },
  },
});

export default function ProductForm(props: Props) {
  const classes = useStyles();
  const [productData, setProductData] = useState<ProductModal>({
    productId: props.productData.productId,
    image: props.productData.image,
    productName: props.productData.productName,
    price: props.productData.price,
    categoryId: props.productData.categoryId,
    description: props.productData.description,
  });

  const formik = useFormik({
    initialValues: {
      ...productData      
    },
    validationSchema: Yup.object({
      image: Yup.string().required("Image is required"),
      productName: Yup.string().required("Product'name is required"),
      price: Yup.number().min(1).required("Price is required"),
      categoryId: Yup.number().min(1).required("Brand is required"),      
      description: Yup.string()
    }),
    onSubmit: () => {
      props.onAddProduct(formik.values);
    },
  });

  const [categoryData, setCategoryData] = useState<CategoryModal[]>(props.categoryData);  

  console.log(formik.values);  

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
            {productData.productId != 0 ? "Update Product" : "Add Product"}
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
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Image*"
                name="image"
                helperText={formik.touched.image && formik.errors.image}
                error={Boolean(formik.touched.image && formik.errors.image)}
                variant="outlined"
              />
            </Grid>

            <Grid container xs={12} mt={2}>
              <TextField
                value={formik.values.productName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Name*"
                variant="outlined"
                name="productName"
                helperText={formik.touched.productName && formik.errors.productName}
                error={Boolean(formik.touched.productName && formik.errors.productName)}
              />
            </Grid>

            <Grid container xs={12} mt={2}>
              <TextField
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Price*"
                variant="outlined"
                type={"number"}
                className={classes.hideButtonUpAndDown}
                name="price"
                helperText={formik.touched.price && formik.errors.price}
                error={Boolean(formik.touched.price && formik.errors.price)}
              />
            </Grid>

            <Grid container xs={12} mt={2}>
              <FormControl fullWidth error={Boolean(formik.touched.categoryId && formik.errors.categoryId)}>
                <InputLabel id="demo-simple-select-label">Brand*</InputLabel>
                <Select
                  name="categoryId"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"                  
                  defaultValue={formik.values.categoryId || ""}
                  label="Brand"
                  onChange={formik.handleChange}                  
                >
                  {categoryData.map((item, index) => (
                    <MenuItem key={index} value={item.categoryId}>
                      {item.categoryName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: '#d14343' }}>{formik.touched.categoryId && formik.errors.categoryId}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid container xs={12} mt={2}>
              <TextField
                value={formik.values.description}
                onChange={formik.handleChange}
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="description"
              />
            </Grid>

            <Grid container xs={12} mt={2}>
              <Button
                type="submit"                
                disabled={formik.isSubmitting}
                sx={{ width: "100%" }}
                variant="contained"
              >
                {productData.productId != 0 ? "Update product" : "Add product"}
              </Button>
            </Grid>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}
