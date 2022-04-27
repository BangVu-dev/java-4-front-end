import { Grid, Typography } from "@mui/material";
import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsCardList, BsBasket } from "react-icons/bs";
import { GrDeliver } from "react-icons/gr";
import { GiBlackBook } from "react-icons/gi";
import { FiTruck } from "react-icons/fi";
import { IoMedalOutline } from "react-icons/io5";

export default function HeaderItem() {
  return (
    <Grid maxWidth={1200} margin={"auto"} container>
      <Grid
        item
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"        
      >
        <Grid sx={{ background: '#413B49', padding: '10px 30px' }}>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <BsCardList color="#ffffff" fontSize={24} />

            <Typography ml={1} fontSize={16} color="#ffffff" fontWeight={700}>
              Danh mục sản phẩm
            </Typography>
          </Grid>
        </Grid>

        <Grid>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <FiTruck color="#ED3224" fontSize={24} />

            <Typography ml={1} fontSize={14} color="#ED3224" fontWeight={600}>
              Miễn phí giao lắp
            </Typography>
          </Grid>
        </Grid>

        <Grid>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <GiBlackBook color="#3F3F3F" fontSize={24} />

            <Typography ml={1} fontSize={14} color="#3F3F3F" fontWeight={600}>
              Cẩm nang khuyến mãi
            </Typography>
          </Grid>
        </Grid>

        <Grid>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <BsBasket color="#3F3F3F" fontSize={24} />

            <Typography ml={1} fontSize={14} color="#3F3F3F" fontWeight={600}>
              Hướng dẫn mua hàng online
            </Typography>
          </Grid>
        </Grid>

        <Grid>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <IoMedalOutline color="#3F3F3F" fontSize={24} />

            <Typography ml={1} fontSize={14} color="#3F3F3F" fontWeight={600}>
              Thương hiệu nổi bật
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
