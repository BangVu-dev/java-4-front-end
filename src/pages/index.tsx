import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import HomeLayout from "../components/home-layout";
import ProductList from "../components/home/components/product-list/ProductList";
import Slider from "../components/home/components/slider/Slider";
import { categoryController } from "../controller/CategoryController";
import { CategoryModal } from "../model/Category";

export default function Home() {
  const [data, setData] = useState<CategoryModal[]>([]);
  const [catId, setCatId] = useState(0);

  useEffect(() => {
    getCatList();
  }, []);

  const getCatList = () => {
    categoryController.getCategoryList().then((res) => {
      setData(res);
    });
  };

  const getCatId = (id: number) => {
    setCatId(id);    
  }

  return (
    <>
      <Slider catList={data} getCatId={getCatId} catId={catId} />
      <ProductList catId={catId} />
    </>
  );
}

Home.getLayout = (page: any) => <HomeLayout>{page}</HomeLayout>;
