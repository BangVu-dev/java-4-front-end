import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { ProductListToolbar } from "../../components/product/product-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useEffect, useState } from "react";
import { ProductModal, ProductWithDetail } from "../../model/Product";
import { productController } from "../../controller/ProductController";
import { ProductListResults } from "../../components/product/product-list-results";
import { categoryController } from "../../controller/CategoryController";
import { CategoryModal } from "../../model/Category";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Products = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setProData({
      productId: 0,
      image: "",
      productName: "",
      price: 0,
      categoryId: 0,
      description: "",
    });
  };
  const [data, setData] = useState<ProductWithDetail[]>([]);
  const [cateData, setCateData] = useState<CategoryModal[]>([]);
  const [proData, setProData] = useState<ProductModal>({
    productId: 0,
    image: "",
    productName: "",
    price: 0,
    categoryId: 0,
    description: "",
  });

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

  useEffect(() => {
    getProList();
    getCatList();
  }, []);

  const getProList = () => {
    productController.getProductList().then((res) => {
      setData(res);
    });
  };

  const getCatList = () => {
    categoryController.getCategoryList().then((res) => {
      setCateData(res);
    });
  };

  const onAddPro = (productData: ProductModal) => {
    if (proData.productId != 0) {
      productController.onUpdateProduct(productData).then((res) => {
        getProList();
      });
      handleClose()
      toast.success("Update successfully!", {
        position: "bottom-left",
        autoClose: 1500,
      });

    } else {
      productController.onAddProduct(productData).then((res) => {
        getProList();
      });
      handleClose()
      toast.success("Add successfully!", {
        position: "bottom-left",
        autoClose: 1500,
      });
    }
    setProData({
      productId: 0,
      image: "",
      productName: "",
      price: 0,
      categoryId: 0,
      description: "",
    });
  };

  const onSetPro = (productData: ProductModal) => {
    console.log(productData);
    
    setProData(productData);
  };

  const onDeletePro = (id: number) => {
    productController.onDeleteProduct(id).then((res) => {
      getProList();
    });
    toast.success("Delete successfully!", {
      position: "bottom-left",
      autoClose: 1500,
    });
  };

  return (
    <>
      <Head>
        <title>Products | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            onAddProduct={onAddPro}
            productData={proData}
            categoryData={cateData}
          />

          <Box sx={{ mt: 3 }}>
            <ProductListResults
              productList={data}
              handleOpen={handleOpen}
              onSetPro={onSetPro}
              onDeletePro={onDeletePro}
              customers={[]}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Products.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Products;
