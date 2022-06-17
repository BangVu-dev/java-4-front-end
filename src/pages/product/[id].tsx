import React, { useContext, useEffect } from "react";
import HomeLayout from "../../components/home-layout";
import { useRouter } from "next/router";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import { productController } from "../../controller/ProductController";
import { ProductModal, ProductWithDetail } from "../../model/Product";
import { UserModal } from "../../model/User";
import { CartModal } from "../../model/Cart";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { CartCreateContext } from "../../context/CartContext";

export default function ProductId() {
  const { onLoadCart } = useContext(CartCreateContext);

  const [value, setValue] = React.useState<number | null>(4);
  const [productItem, setProductItem] = React.useState<ProductModal>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id != undefined) {
      productController.getProductDetail(id).then((res) => {
        setProductItem(res);
      });
    }
  }, [id]);

  const onAddToCart = () => {
    let userInformation;
    let userLocal = localStorage.getItem("userInfo");
    if (userLocal != undefined) {
      userInformation = JSON.parse(userLocal);
    }

    if (userInformation === undefined) {
      router.push("/login");
    } else {
      let cartItem: CartModal = {
        cartId: productItem?.productId,
        userId: userInformation.userId,
        image: productItem?.image,
        productName: productItem?.productName,
        price: productItem?.price,
        quantity: 1,
      };

      let cartInformation;
      let arrCart = [];
      let cartInfo = localStorage.getItem(`cart-${userInformation.userId}`);

      if (cartInfo != undefined) {
        cartInformation = JSON.parse(cartInfo);
        let check = false;
        cartInformation.map((item: CartModal, index: number) => {
          if (cartItem.cartId === item.cartId) {
            item.quantity += 1;
            toast.success("Add to cart successfully!", {
              position: "bottom-left",
              autoClose: 1500,
            });

            check = true;
          }
        });

        if (check == false) {
          cartInformation.push(cartItem);
          toast.success("Add to cart successfully!", {
            position: "bottom-left",
            autoClose: 1500,
          });
        }
        localStorage.setItem(`cart-${userInformation.userId}`, JSON.stringify(cartInformation));
        onLoadCart();
      } else {
        arrCart.push(cartItem);
        localStorage.setItem(`cart-${userInformation.userId}`, JSON.stringify(arrCart));
        onLoadCart();
      }
    }
  };

  return (
    <Grid container mt={0} spacing={4} minHeight={540}>
      <Grid item container xs={6.5}>
        <Grid width={350} margin={"auto"}>
          <img src={productItem?.image} alt="" width={"100%"} />
        </Grid>

        <Grid
          mt={4}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography fontSize={16} fontWeight={700} color={"#3F3F3F"}>
            Đặc điểm nổi bật
          </Typography>

          <Grid mt={1}>
            <Typography fontSize={14} fontWeight={400} color={"#3F3F3F"}>
              {productItem?.description}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={5.5}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography fontSize={16} fontWeight={700} color={"#3F3F3F"}>
            {productItem?.productName}
          </Typography>

          <Box mt={2}>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>

          <Grid mt={1} container xs={12} borderTop={"1px solid #ddd"} />

          <Typography mt={1} fontSize={28} fontWeight={700} color={"#3F3F3F"}>
            {productItem?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </Typography>

          <Stack direction="row" justifyContent="center" alignItems="center">
            <Box
              mt={1}
              mr={1}
              padding={"2px 8px"}
              sx={{ background: "#EE1E25" }}
              borderRadius={"5px"}
            >
              <Typography color={"#ffffff"} fontSize={14} fontWeight={400}>
                Bán chạy #4
              </Typography>
            </Box>

            <Box mt={1} padding={"2px 6px"} sx={{ background: "#1FB349" }} borderRadius={"5px"}>
              <Typography color={"#ffffff"} fontSize={14} fontWeight={400}>
                Mới
              </Typography>
            </Box>
          </Stack>

          <Grid container mt={4}>
            <Button
              sx={{
                background: "#ED3324",
                "&:hover": { background: "#F15F53" },
                borderRadius: "5px",
              }}
              fullWidth
              variant="contained"
            >
              <Typography fontSize={18} fontWeight={700} lineHeight={1.2}>
                MUA NGAY <br />
                <span style={{ fontSize: 14, fontWeight: 400 }}>Giao hàng tận nơi</span>
              </Typography>
            </Button>
          </Grid>

          <Grid
            mt={0}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Grid item container xs={6}>
              <Button
                onClick={() => onAddToCart()}
                sx={{
                  border: "1px solid #ED3324",
                  "&:hover": {
                    background: "#ED3324",
                    border: "1px solid #ED3324",
                    "#title-add-to-cart": { color: "#ffffff" },
                  },
                  borderRadius: "5px",
                  padding: "14px 0",
                }}
                fullWidth
                variant="outlined"
              >
                <Typography id="title-add-to-cart" fontSize={18} fontWeight={700} color={"#ED3324"}>
                  THÊM VÀO GIỎ HÀNG
                </Typography>
              </Button>
            </Grid>

            <Grid item container xs={6}>
              <Button
                sx={{
                  border: "1px solid #ED3324",
                  "&:hover": {
                    background: "#ED3324",
                    border: "1px solid #ED3324",
                    "#title-add-to-cart": { color: "#ffffff" },
                  },
                  borderRadius: "5px",
                  padding: "10px 0",
                }}
                fullWidth
                variant="outlined"
              >
                <Typography
                  id="title-add-to-cart"
                  fontSize={18}
                  fontWeight={700}
                  color={"#ED3324"}
                  lineHeight={1}
                >
                  MUA TRẢ GÓP <br />
                  <span style={{ fontSize: 14, fontWeight: 400 }}>
                    Thủ tục đơn giản, lãi xuất thấp
                  </span>
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Typography pt={2} margin={"auto"}>
            Gọi đặt mua{" "}
            <a style={{ textDecoration: "none", color: "#2F80ED" }} href="">
              1800.6800 {""}
            </a>
            (08h - 21h)
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

ProductId.getLayout = (page: any) => <HomeLayout>{page}</HomeLayout>;
