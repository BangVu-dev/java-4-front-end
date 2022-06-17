import React, { useContext, useState } from "react";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { MdOutlineClose } from "react-icons/md";
import { CartModal } from "../../../model/Cart";
import { CartCreateContext } from "../../../context/CartContext";
import { UserCreateContext } from "../../../context/UserContext";

type Props = {
  cartItem: CartModal;
  onRemoveCartItem: (id: any) => void;
};

export default function CartItem(props: Props) {
  const { onLoadCart, cartList } = useContext(CartCreateContext);
  const { userInfo, changeUserInfo } = useContext(UserCreateContext);
  const [quantity, setQuantity] = useState(props.cartItem.quantity);

  const onIncrease = (id: any) => {
    setQuantity(quantity + 1);
    let cartInfo;

    let cartLocal = localStorage.getItem(`cart-${userInfo.userId}`);
    if (cartLocal != undefined) {
      cartInfo = JSON.parse(cartLocal);
    }
    cartInfo.map((item: CartModal) => {
      if (id === item.cartId) {
        item.quantity += 1;
      }
    });
    localStorage.setItem(`cart-${userInfo.userId}`, JSON.stringify(cartInfo));
    onLoadCart();
  };

  const onReduction = (id: any) => {
    if (quantity <= 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
    let cartInfo;
    let cartLocal = localStorage.getItem(`cart-${userInfo.userId}`);
    if (cartLocal != undefined) {
      cartInfo = JSON.parse(cartLocal);
    }
    cartInfo.map((item: CartModal) => {
      if (id === item.cartId) {
        item.quantity -= 1;
        if (item.quantity <= 1) {
          item.quantity = 1;
        }
      }
    });
    localStorage.setItem(`cart-${userInfo.userId}`, JSON.stringify(cartInfo));
    onLoadCart();
  };

  return (
    <Grid mt={2}>
      <Grid textAlign={"right"}>
        <MdOutlineClose
          onClick={() => props.onRemoveCartItem(props.cartItem.cartId)}
          fontSize={18}
          style={{ cursor: "pointer" }}
        />
      </Grid>

      <Stack mt={0} direction="row" justifyContent="space-between" spacing={2}>
        <Grid width={80}>
          <img src={props.cartItem.image} alt="" width={"100%"} />
        </Grid>

        <Grid>
          <Typography fontSize={14} fontWeight={400} color={"#3F3F3F"}>
            {props.cartItem.productName}
          </Typography>
        </Grid>

        <Grid textAlign={"right"}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: "#A6A6A6",
              textDecorationLine: "line-through",
            }}
          >
            4.690.000đ
          </span>

          <Typography fontSize={16} fontWeight={500} color={"#ED3324"}>
            {props.cartItem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </Typography>

          <Stack mt={1} direction={"row"}>
            <button
              onClick={() => onReduction(props.cartItem.cartId)}
              style={{
                width: "30px",
                padding: "5px 0",
                border: "1px solid #E0E0E0",
                cursor: "pointer",
              }}
            >
              -
            </button>
            <button
              style={{
                width: "30px",
                border: "1px solid #E0E0E0",
                background: "#ffffff",
                color: "red",
                borderRight: 0,
                borderLeft: 0,
              }}
            >
              {quantity}
            </button>
            <button
              onClick={() => onIncrease(props.cartItem.cartId)}
              style={{ width: "30px", border: "1px solid #E0E0E0", cursor: "pointer" }}
            >
              +
            </button>
          </Stack>
        </Grid>
      </Stack>

      <Grid mt={2} container xs={12} borderTop={"1px solid #ddd"} />
    </Grid>
  );
}
