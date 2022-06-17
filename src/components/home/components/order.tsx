import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { OrderWithDetailItem } from "../../../model/Order";

type Props = {
  orderItem: OrderWithDetailItem;
};

export default function Order({ orderItem }: Props) {
  const totalMoney =
    orderItem.cartProduct?.reduce((t, i) => {
      return t + i.price * i.quantity;
    }, 0) || 0;

  const date = new Date(orderItem.createdAt);

  return (
    <Grid
      mt={4}
      mb={4}
      container
      sx={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;", borderRadius: "5px" }}
    >
      <Grid container p={2}>
        <Typography
          sx={{ fontStyle: "italic", textDecoration: "underline" }}
          fontSize={14}
          color={"#4f4f4f"}
        >
          Mã đơn hàng: {orderItem.orderId}
        </Typography>
        <Grid container direction="column" justifyContent="start" alignItems="flex-end">
          <Grid container direction="row" justifyContent="flex-end" alignItems="flex-start" mb={1}>
            <Typography mr={1}>{date.toLocaleString()}</Typography>|
            <Typography ml={1} color={"#42AA47"} fontWeight={700}>
              {orderItem.orderStatus}
            </Typography>
          </Grid>

          <Grid mb={2} justifyContent={"end"}>
            <Typography fontSize={14} fontWeight={400}>
              {orderItem.fullName}, {orderItem.phoneNumber}, {orderItem.email}, {orderItem.address},{" "}
              {orderItem.postCode}
            </Typography>
          </Grid>

          <Grid sx={{ borderTop: "1px solid #ddd", width: "100%" }} />

          {orderItem.cartProduct?.map((item, index) => (
            <Grid
              key={index}
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
            >
              <Grid
                item
                container
                xs={6}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                mt={2}
                mb={2}
              >
                <Box width={100}>
                  <img src={item.image} alt="" width={"100%"} />
                </Box>

                <Box>
                  <Typography>{item.productName}</Typography>
                  <Typography>(x{item.quantity})</Typography>
                </Box>
              </Grid>
              <Grid item container xs={6} justifyContent={"end"}>
                <Typography fontSize={16} color={"#455860"} fontWeight={500}>
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                </Typography>
              </Grid>
            </Grid>
          ))}

          <Grid sx={{ borderTop: "1px solid #ddd", width: "100%" }} />

          <Grid mt={2} container justifyContent={"end"}>
            <Typography>
              Total:{" "}
              <span style={{ color: "#FE0000", fontWeight: 600, fontSize: 20 }}>
                {totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
