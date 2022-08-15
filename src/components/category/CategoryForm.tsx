import CloseIcon from "@mui/icons-material/Close";
import { Grid, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { storage } from "../../config/firebase";
import { CategoryModal } from "../../model/Category";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Skeleton from "@mui/material/Skeleton";

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
  onAddCategory: (categoryData: CategoryModal) => void;
  categoryData: CategoryModal;
};

export default function CategoryForm(props: Props) {
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [categoryData, setCategoryData] = useState<CategoryModal>({
    categoryId: props.categoryData.categoryId,
    categoryName: props.categoryData.categoryName,
    image: props.categoryData.image,
    description: props.categoryData.description,
  });

  const handleImageChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const imageRef = ref(storage, "images/");
    setLoading(true);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setLoading(false);
            formik.setFieldValue("image", url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      ...categoryData,
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Category'name is required"),
      image: Yup.string().required("Image is required"),
      description: Yup.string(),
    }),
    onSubmit: () => {
      props.onAddCategory(formik.values);
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
            {categoryData.categoryId != 0 ? "Update Category" : "Add Category"}
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
                value={formik.values.categoryName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Name"
                name="categoryName"
                variant="outlined"
                helperText={formik.touched.categoryName && formik.errors.categoryName}
                error={Boolean(formik.touched.categoryName && formik.errors.categoryName)}
              />
            </Grid>

            <Grid container xs={12} mt={2}>
              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                spacing={1}
              >
                <TextField
                  type="file"
                  onChange={handleImageChange}
                  helperText={formik.touched.image && formik.errors.image}
                  error={Boolean(formik.touched.image && formik.errors.image)}
                  // value={formik.values.image}
                />
                <LoadingButton
                  sx={{ p: "4px 16px" }}
                  onClick={handleSubmit}
                  variant="contained"
                  component="label"
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                >
                  Upload
                </LoadingButton>
              </Stack>

              {/* <TextField
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Image"
                name="image"
                variant="outlined"
                helperText={formik.touched.image && formik.errors.image}
                error={Boolean(formik.touched.image && formik.errors.image)}
              /> */}
            </Grid>

            <Grid container xs={12} mt={2}>
              <Box sx={{ width: 100 }}>
                {!loading ? (
                  <img src={formik.values.image} width={"100%"} height={"100%"} />
                ) : (
                  <Skeleton variant="rectangular" sx={{ width: 150, height: 150 }} />
                )}
              </Box>
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
                {categoryData.categoryId != 0 ? "Update category" : "Add category"}
              </Button>
            </Grid>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}
