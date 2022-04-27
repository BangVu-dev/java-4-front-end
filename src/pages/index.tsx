import { Grid } from "@mui/material";
import React from "react";
import HomeLayout from "../components/home-layout";
import ProductList from "../components/home/components/product-list/ProductList";
import Slider from "../components/home/components/slider/Slider";

export default function Home() {
  return (
    <>
      <Slider />
      <ProductList />
    </>
  );
}

Home.getLayout = (page: any) => <HomeLayout>{page}</HomeLayout>;
