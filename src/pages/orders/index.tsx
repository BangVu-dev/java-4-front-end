import { Box, Grid, Stack, Typography } from "@mui/material";
import { number } from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import HomeLayout from "../../components/home-layout";
import Order from "../../components/home/components/order";
import { UserCreateContext } from "../../context/UserContext";
import { orderController } from "../../controller/OrderController";
import { OrderWithDetail, OrderWithDetailItem } from "../../model/Order";

export default function Orders() {
  const [data, setData] = useState<OrderWithDetail[]>([]);
  const [orderItem, setOrderItem] = useState<OrderWithDetailItem[]>([]);
  const { userInfo, changeUserInfo } = useContext(UserCreateContext);

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
  }, [data]);

  const getOrdersList = () => {
    orderController.getOrderList(userInfo.userId).then((res) => {
      setData(res);
    });
  };

  const setOrderList = () => {
    let listOrders: OrderWithDetailItem[] = [];
    let idOrder: number[] = [];

    data.map((item) => idOrder.push(item.orderId));
    idOrder = Array.from(new Set(idOrder));

    idOrder.map((orderId) => {
      const order: OrderWithDetailItem = {
        orderId: orderId,
        userId: userInfo.userId,
        createdAt: "",
        orderStatus: "",
        fullName: "",
        phoneNumber: "",
        email: "",
        postCode: "",
        address: "",
        message: "",
        cartProduct: [],
      };

      data.map((orderItem) => {
        if (orderItem.orderId == orderId) {
          (order.userId = orderItem.userId),
            (order.createdAt = orderItem.createdAt),
            (order.orderStatus = orderItem.orderStatus),
            (order.fullName = orderItem.fullName),
            (order.phoneNumber = orderItem.phoneNumber),
            (order.email = orderItem.email),
            (order.postCode = orderItem.postCode),
            (order.address = orderItem.address),
            (order.message = orderItem.message),
            order.cartProduct?.push({
              cartId: orderItem.cartId,
              userId: orderItem.userId,
              image: orderItem.image,
              productName: orderItem.productName,
              price: orderItem.price,
              quantity: orderItem.quantity,
            });
        }
      });

      listOrders.push(order);
      setOrderItem(listOrders);
    });
  };

  return (
    <Grid container mb={8} minHeight={"80vh"}>
      <Typography mt={4} color={"#514F4F"} fontSize={22} fontWeight={700}>
        Lịch sử mua hàng
      </Typography>

      {orderItem.length > 0 ? (
        orderItem.map((item, index) => <Order key={index} orderItem={item} />)
      ) : (
        <Grid item container direction={"row"} justifyContent={"center"} alignItems={"flex-start"}>
          <Grid item sx={{ background: "#f8f8f8", width: "100%", p: 24, borderRadius: "10px" }}>
            <Typography textAlign={"center"} fontSize={16}>
              Hiện chưa có đơn hàng nào!
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

Orders.getLayout = (page: any) => <HomeLayout>{page}</HomeLayout>;
