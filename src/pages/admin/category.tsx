import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CategoryListResults } from "../../components/category/category-list-results";
import { CustomerListToolbar } from "../../components/category/category-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import React, { useEffect, useState } from "react";
import { CategoryModal } from "../../model/Category";
import { categoryController } from "../../controller/CategoryController";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Category() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCateData({
      categoryId: 0,
      categoryName: "",
      image: "",
      description: "",
    });
  };
  const [data, setData] = useState<CategoryModal[]>([]);
  const [cateData, setCateData] = useState<CategoryModal>({
    categoryId: 0,
    categoryName: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    getCatList();
  }, []);

  useEffect(() => {
    checkLogin()
  }, [])

  const checkLogin = () => {
    let userInformation;
    let userLocal = localStorage.getItem("userInfo");
    if (userLocal != undefined) {
      userInformation = JSON.parse(userLocal);
    }
    if (userInformation === undefined) {
      window.location.href = "/login";
    } else if (userInformation.role !== "admin") {
      window.location.href = "/";
    }
  };

  const getCatList = () => {
    categoryController.getCategoryList().then((res) => {
      setData(res);
    });
  };

  const onAddCat = (categoryData: CategoryModal) => {
    if (cateData.categoryId != 0) {
      categoryController.onUpdateCategory(categoryData).then((res) => {
        getCatList();
      });
      handleClose();
      toast.success("Update successfully!", {
        position: "bottom-left",
        autoClose: 1500,
      });
    } else {
      categoryController.onAddCategory(categoryData).then((res) => {
        getCatList();
      });
      handleClose();
      toast.success("Add successfully!", {
        position: "bottom-left",
        autoClose: 1500,
      });
    }

    setCateData({
      categoryId: 0,
      categoryName: "",
      image: "",
      description: "",
    });
  };

  const onSetCate = (categoryData: CategoryModal) => {
    setCateData({ ...categoryData });
  };

  const onDeleteCate = (id: number) => {
    categoryController.onDeleteCategory(id).then((res) => {
      getCatList();
    });
    toast.success("Delete successfully!", {
      position: "bottom-left",
      autoClose: 1500,
    });
  };

  return (
    <>
      <Head>
        <title>Category | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            onAddCategory={onAddCat}
            categoryData={cateData}
          />
          <Box sx={{ mt: 3 }}>
            <CategoryListResults
              categoryList={data}
              handleOpen={handleOpen}
              onSetCate={onSetCate}
              onDeleteCate={onDeleteCate}
              customers={[]}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}

Category.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
