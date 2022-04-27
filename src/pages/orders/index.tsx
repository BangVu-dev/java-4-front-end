import { Box, Grid, Stack, Typography } from "@mui/material";
import { number } from "prop-types";
import React, { useState, useEffect } from "react";
import HomeLayout from "../../components/home-layout";
import Order from "../../components/home/components/order";
import { orderController } from "../../controller/OrderController";
import { OrderWithDetail, OrderWithDetailItem } from "../../model/Order";

export default function Orders() {
  const [data, setData] = useState<OrderWithDetail[]>([]);
  const [orderItem, setOrderItem] = useState<OrderWithDetailItem>();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    let userInformation;
    let userLocal = localStorage.getItem("userInfo");
    if (userLocal != undefined) {
      userInformation = JSON.parse(userLocal);
    }
    
    if (userInformation === undefined) {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    getOrdersList();
    setOrderList();
  }, [data.length]);

  const getOrdersList = () => {
    orderController.getOrderList().then((res) => {
      setData(res);
    });
  };

  const setOrderList = () => {
    data.map((item) => {      
      setOrderItem({
        orderId: item.orderId,
        userId: item.userId,
        createdAt: item.createdAt,
        orderStatus: item.orderStatus,
        fullName: item.fullName,
        phoneNumber: item.phoneNumber,
        email: item.email,
        postCode: item.postCode,
        address: item.address,
        message: item.message,
        cartProduct: [{
          id: item.id,
          userId: item.userId,
          image: item.image,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
        }]
      });
    });
  };

  return (
    <Grid container mb={8}>
      <Typography mt={4} color={"#514F4F"} fontSize={22} fontWeight={700}>
        Lịch sử mua hàng
      </Typography>

      {data.map((item, index) => (
        <Order key={index} orders={data} orderItem={item} />
      ))}
    </Grid>
  );
}

Orders.getLayout = (page: any) => <HomeLayout>{page}</HomeLayout>;
