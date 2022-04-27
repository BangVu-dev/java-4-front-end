import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CartModal } from "../model/Cart";
import { UserModal } from "../model/User";
import { UserCreateContext } from "./UserContext";

interface ContextProvider {
  children: ReactNode;
}

interface cartContextDefault {
  cartList: CartModal[];
  onLoadCart: () => void;
}

const cartDefault = {
  cartList: [],
  onLoadCart: () => {},
};

export const CartCreateContext = createContext<cartContextDefault>(cartDefault);

export default function CartContext({ children }: ContextProvider) {
  const { userInfo } = useContext(UserCreateContext);
  const [cartList, setCartList] = useState<CartModal[]>([]);

  useEffect(() => {
    onLoadCart();
  }, [userInfo.userId]);

  const onLoadCart = () => {
    let cartInfo: CartModal[];
    let cartLocal;
    if (userInfo.userId != 0) {
      cartLocal = localStorage.getItem(`cart-${userInfo.userId}`);
    }
    if (cartLocal != undefined) {
      cartInfo = JSON.parse(cartLocal);
      setCartList(cartInfo);
    } else {
      setCartList([]);
    }
  };

  const data = { cartList, onLoadCart };

  return <CartCreateContext.Provider value={data}>{children}</CartCreateContext.Provider>;
}
