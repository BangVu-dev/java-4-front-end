import { Grid, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useContext, useEffect, useState } from "react";
import HomeLayout from "../components/home-layout";
import Button from "@mui/material/Button";
import CartItem from "../components/home/components/cart-item";
import Divider from "@mui/material/Divider";
import { CartModal } from "../model/Cart";
import { UserModal } from "../model/User";
import { toast } from "react-toastify";
import { CartCreateContext } from "../context/CartContext";
import { MdAddShoppingCart } from "react-icons/md";
import { OrderModal } from "../model/Order";
import { OrderProductModal } from "../model/OrderProduct";
import { UserCreateContext } from "../context/UserContext";
import { orderController } from "../controller/OrderController";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Cart() {
  const router = useRouter();
  const { onLoadCart, cartList } = useContext(CartCreateContext);
  const { userInfo } = useContext(UserCreateContext);
  const date = new Date();
  const [orders, setOrders] = useState<OrderModal>({
    orderId: Date.now(),
    userId: userInfo.userId,
    createdAt: "2022-04-11T10:08:16.000+00:00",
    orderStatus: "Pending",
    fullName: "",
    phoneNumber: "",
    email: "",
    postCode: "",
    address: "",
    message: "",
  });

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    let userInformation;
    let userLocal = localStorage.getItem("userInfo");
    if (userLocal != undefined) {
      userInformation = JSON.parse(userLocal);
    }
    setOrders({ ...orders, userId: userInformation.userId });

    if (userInformation === undefined) {
      window.location.href = "/login";
    }
  };

  const onRemoveCartItem = (id: any) => {
    let userInformation;
    let cartInfo: any;
    let userLocal = localStorage.getItem("userInfo");
    if (userLocal != undefined) {
      userInformation = JSON.parse(userLocal);
      let cartLocal = localStorage.getItem(`cart-${userInformation.userId}`);
      if (cartLocal != undefined) {
        cartInfo = JSON.parse(cartLocal);
      }
    }
    cartInfo.map((item: CartModal, index: number) => {
      if (id === item.id) {
        cartInfo.splice(index, 1);
        toast.success("Product removed from cart successfully!", {
          position: "bottom-left",
          autoClose: 1500,
        });
      }
    });
    localStorage.setItem(`cart-${userInformation.userId}`, JSON.stringify(cartInfo));
    onLoadCart();
  };

  const provisional = cartList.reduce((t, c) => {
    return t + c.price * c.quantity;
  }, 0);

  const payment = (ordersItem: OrderModal) => {
    orderController.checkOut(ordersItem).then((res) => {
      cartList.map((item, index) => {
        let orderProduct: OrderProductModal = {
          cartId: 1,
          orderId: res.orderId,
          productId: item.id,
          image: item.image,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
        };
        orderController.addToCart(orderProduct);
      });
    });
    localStorage.setItem(`cart-${userInfo.userId}`, JSON.stringify([]));
    onLoadCart();
    setOrders({
      orderId: Date.now(),
      userId: userInfo.userId,
      createdAt: "2022-04-11T10:08:16.000+00:00",
      orderStatus: "Pending",
      fullName: "",
      phoneNumber: "",
      email: "",
      postCode: "",
      address: "",
      message: "",
    });

    toast.success("Payment success! Order information will be sent to your email", {
      position: "bottom-left",
      autoClose: 3500,
    });
  };

  const formik = useFormik({
    initialValues: {
      ...orders,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      phoneNumber: Yup.string()
        .min(10, "Phone number must enter 10 numbers!")
        .max(10, "Phone number must enter 10 numbers!")
        .required("Phone number is required"),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      address: Yup.string().required("Address is required"),
      postCode: Yup.string(),
      message: Yup.string(),
    }),
    onSubmit: () => {
      payment(formik.values);
    },
  });

  return (
    <Grid container mt={4} mb={8} minHeight={540}>
      <Grid container direction="row" justifyContent="space-between" spacing={5}>
        <Grid item xs={7}>
          <Typography fontSize={20} fontWeight={500}>
            Địa chỉ nhận hàng
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Grid mt={1} container direction="row" justifyContent="space-between" spacing={2}>
              <Grid item container xs={6}>
                <TextField
                  value={formik.values.fullName}
                  error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                  sx={{ borderRadius: "none" }}
                  fullWidth
                  id="outlined-basic"
                  label="Họ và tên"
                  variant="outlined"
                  name="fullName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item container xs={6}>
                <TextField
                  value={formik.values.phoneNumber}
                  error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  type={"number"}
                  fullWidth
                  id="outlined-basic"
                  label="Số điện thoại"
                  variant="outlined"
                  name="phoneNumber"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>

            <Grid mt={0} container direction="row" justifyContent="space-between" spacing={2}>
              <Grid item container xs={6}>
                <TextField
                  value={formik.values.email}
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{ borderRadius: "none" }}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item container xs={6}>
                <TextField
                  value={formik.values.postCode}
                  onChange={formik.handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Mã bưu điện"
                  name="postCode"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Grid mt={2}>
              <TextField
                value={formik.values.address}
                error={Boolean(formik.touched.address && formik.errors.address)}
                fullWidth
                helperText={formik.touched.address && formik.errors.address}
                id="outlined-basic"
                label="Địa chỉ"
                variant="outlined"
                name="address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid mt={2}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Để lại lời nhắn cho Nguyễn Kim"
                multiline
                minRows={4}
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid mt={2}>
              <Button
                disabled={cartList.length != 0 ? false : true}
                sx={{
                  padding: "10px 0",
                  background: "#ED3324",
                  "&:hover": { background: "#F15F53" },
                }}
                fullWidth
                variant="contained"
                type="submit"
              >
                <Typography fontSize={24} fontWeight={700}>
                  THANH TOÁN
                </Typography>
              </Button>
            </Grid>
          </form>
        </Grid>

        <Grid item xs={5} mb={8}>
          <Typography fontSize={20} fontWeight={500}>
            Giỏ hàng của bạn
          </Typography>

          {cartList.length > 0 ? (
            <Grid mt={1.5} container>
              <Grid
                container
                sx={{
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 1px 4px 0px",
                  padding: "0px 10px 20px 10px",
                }}
              >
                {cartList.map((item, index) => (
                  <>
                    <CartItem key={index} cartItem={item} onRemoveCartItem={onRemoveCartItem} />
                  </>
                ))}

                <Grid mt={2} container sx={{ background: "#F3F5F7" }}>
                  <Grid container sx={{ padding: "10px 20px" }}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid>
                        <Typography fontSize={14} fontWeight={400} color={"#464646"}>
                          Tạm tính
                        </Typography>
                        <Typography mt={1} fontSize={14} fontWeight={400} color={"#ED3324"}>
                          Khuyến mãi
                        </Typography>
                        <Typography mt={1} fontSize={14} fontWeight={400} color={"#464646"}>
                          Phí vận chuyển
                        </Typography>
                      </Grid>

                      <Grid textAlign={"right"}>
                        <Typography fontSize={16} fontWeight={400} color={"#212529"}>
                          {provisional.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                        </Typography>
                        <Typography mt={1} fontSize={16} fontWeight={400} color={"#ED3324"}>
                          0đ
                        </Typography>
                        <Typography mt={1} fontSize={16} fontWeight={400} color={"#212529"}>
                          0đ
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  margin={"auto"}
                  xs={10}
                  mt={1}
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontSize={16} fontWeight={700} color={"#3F3F3F"}>
                    Tổng tiền
                  </Typography>
                  <Typography fontSize={20} fontWeight={700} color={"#ED3324"}>
                    {provisional.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid mt={1.5} container>
              <Grid
                container
                sx={{
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 1px 4px 0px",
                  padding: "20px 0",
                }}
              >
                <Grid container justifyContent={"center"}>
                  <MdAddShoppingCart fontSize={40} color="rgb(114,114,114)" />
                </Grid>
                <Grid mt={1} container justifyContent={"center"}>
                  <Typography fontSize={18} fontWeight={400} color={"rgb(114,114,114)"}>
                    Giỏ hàng của bạn đang trống
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

Cart.getLayout = (page: any) => <HomeLayout>{page}</HomeLayout>;
