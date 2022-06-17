import { Box, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserCreateContext } from "../../../../context/UserContext";
import { productController } from "../../../../controller/ProductController";
import { ProductModal } from "../../../../model/Product";
import Product from "../product";

type Props = {
  catId: number;
};

export default function ProductList({ catId }: Props) {
  const [data, setData] = useState<ProductModal[]>([]);
  const { userInfo, changeUserInfo } = useContext(UserCreateContext);

  // useEffect(() => {
  //   getProductList();
  // }, []);

  useEffect(() => {
    if (catId != 0) {
      getProductWithCatId();
    } else {
      getProductList();
    }
  }, [catId]);

  const getProductList = () => {
    productController.getProductList().then((res) => {
      setData(res);
    });
  };

  const getProductWithCatId = () => {
    productController.getProductWithCategory(catId).then((res) => {
      setData(res);
    });
  };

  return (
    <Grid container mt={8}>
      <Box sx={{ borderBottom: "2px solid #ED3324" }}>
        <Typography fontSize={24} fontWeight={500}>
          Sản phẩm nổi bật
        </Typography>
      </Box>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        // alignItems="center"
        spacing={4}
        mb={8}
        mt={0}
      >
        {data.map((item, index) => (
          <Grid key={index} item container xs={3}>
            <Product product={item} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
