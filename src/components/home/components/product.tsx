import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ProductModal } from "../../../model/Product";
import Link from "next/link";

type Props = {
  product: ProductModal;
};

export default function Product(props: Props) {
  return (
    <Grid      
      sx={{
        "&:hover": {
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          borderRadius: "4px",
          transitionDuration: "0.2s",
        },
      }}
    >
      <Grid position={"relative"} container sx={{ padding: "15px 10px 20px 10px" }}>
        <Box
          position={"absolute"}
          padding={"0 10px"}
          sx={{ background: "#ED3324", right: 10 }}
          borderRadius={"20px"}
        >
          <Typography fontSize={16} fontWeight={700} color="#ffffff">
            -12%
          </Typography>
        </Box>

        <Grid width={200} margin={"auto"}>
          <Link href={`/product/${props.product.productId}`}>
            <a>
              <img src={props.product.image} alt="image of product" width={"100%"} />
            </a>
          </Link>
        </Grid>

        <Grid mt={3} container direction="column" justifyContent="center" alignItems="flex-start">
          <Box
            padding={"0 20px"}
            borderRadius={"3px"}
            boxShadow={"rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"}
          >
            <Typography fontSize={12} color="#ED3324">
              Trả góp 0%
            </Typography>
          </Box>

          <Link href={`/product/${props.product.productId}`}>
            <Typography
              sx={{ cursor: "pointer", "&:hover": { color: "#ED3324" } }}
              mt={2}
              fontSize={16}
              fontWeight={500}
              color="#3F3F3F"
            >
              {props.product.productName}
            </Typography>
          </Link>

          <Typography mt={1} fontSize={18} fontWeight={500} color="#ED3324">
            {props.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ{" "}
            <span
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#A6A6A6",
                textDecorationLine: "line-through",
              }}
            >
              33.990.000đ
            </span>
          </Typography>

          <Typography mt={1} fontSize={12} fontWeight={400} color="#3F3F3F">
            Tiết kiệm <span style={{ fontWeight: 500 }}>4.000.000đ</span>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
