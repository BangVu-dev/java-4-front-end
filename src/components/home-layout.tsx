import { Grid } from "@mui/material";
import React from "react";
import Footer from "./footer";
import Header from "./header";
import HeaderItem from "./header-item";

export default function HomeLayout(props: any) {
  const { children } = props;
  return (
    <Grid container sx={{background: '#ffffff'}}>
      <Grid container sx={{ background: "#FE0000" }}>
        <Header />
      </Grid>
      <Grid container sx={{ borderBottom: '1px solid #ddd' }}>
        <HeaderItem />
      </Grid>
      <Grid item container maxWidth={1200} margin={"auto"}>
        {children}
      </Grid>
      <Grid container sx={{ background: "#333333" }}>
        <Footer />
      </Grid>
    </Grid>
  );
}
