import { Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import Image from "next/image";
import { categoryController } from "../../../../controller/CategoryController";
import { CategoryModal } from "../../../../model/Category";
import Divider from "@mui/material/Divider";

type Props = {
  catList: CategoryModal[];
  getCatId: (id: number) => void;
  catId: number;
};

export default function Slider({ catList, getCatId, catId }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item container xs={2.6}>
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
          <Grid onClick={() => getCatId(0)} sx={{ width: "100%" }}>
            <Typography
              fontSize={14}
              fontWeight={400}
              pt={1}
              pb={1}
              sx={{
                color: catId == 0 ? "#F86666" : "",
                cursor: "pointer",
                "&:hover": { color: "#F86666", transitionDuration: "0.2s" },
              }}
            >
              <li>All</li>
            </Typography>
            <Divider variant="fullWidth" />
          </Grid>

          {catList.map((item, index) => (
            <Grid key={index} onClick={() => getCatId(item.categoryId)} sx={{ width: "100%" }}>
              <Typography
                fontSize={14}
                fontWeight={400}
                pt={1}
                pb={1}
                sx={{
                  color: catId == item.categoryId ? "#F86666" : "",
                  cursor: "pointer",
                  "&:hover": { color: "#F86666", transitionDuration: "0.2s" },
                }}
              >
                <li>{item.categoryName}</li>
              </Typography>
              {index !== catList.length - 1 ? <Divider variant="fullWidth" /> : <></>}
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid mt={1} item container xs={9.4}>
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper" autoplay={true}>
          <SwiperSlide>
            <Image
              src="/img/Laptop_Cate_Homepage-Top-Slide-Banner_936x376px.png"
              alt="Picture of the author"
              width={1000}
              height={400}
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image src="/img/936x376.jpg" alt="Picture of the author" width={1000} height={400} />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="/img/936x376px_1.png"
              alt="Picture of the author"
              width={1000}
              height={400}
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="/img/Home banner_936x376px.png"
              alt="Picture of the author"
              width={1000}
              height={400}
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="/img/Laptop_Cate_Homepage-Top-Slide-Banner_936x376px.png"
              alt="Picture of the author"
              width={1000}
              height={400}
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="/img/lg hut bui_936x376px.png"
              alt="Picture of the author"
              width={1000}
              height={400}
            />
          </SwiperSlide>
        </Swiper>
      </Grid>
    </Grid>
  );
}
