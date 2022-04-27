import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { BsYoutube } from "react-icons/bs";
import { ImFacebook } from "react-icons/im";
import { SiZalo } from "react-icons/si";
import { CgMail } from "react-icons/cg";

export default function Footer() {
  return (
    <Grid maxWidth={1200} margin={"auto"} container>
      <Grid
        padding={"10px 0"}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={3}>
          <ImFacebook
            color="#ffffff"
            style={{ border: "1px solid #ffffff", padding: "5px", borderRadius: "50%" }}
            fontSize={30}
          />

          <BsYoutube
            color="#ffffff"
            style={{ border: "1px solid #ffffff", padding: "5px", borderRadius: "50%" }}
            fontSize={30}
          />

          <SiZalo
            color="#ffffff"
            style={{ border: "1px solid #ffffff", padding: "5px", borderRadius: "50%" }}
            fontSize={30}
          />
        </Stack>

        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <CgMail
            color="#ffffff"
            style={{ border: "1px solid #ffffff", padding: "5px", borderRadius: "50%" }}
            fontSize={30}
          />

          <Typography fontSize={14} fontWeight={400} color={'#ffffff'}>
            Bạn muốn là người sớm nhất nhận khuyến mãi đặc biệt? <br /> Đăng ký ngay.
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
          <input style={{ padding: '10px 10px', outline: 'none', width: '300px', borderRadius: '5px', border: 0 }} type="text" placeholder="Thả email nhận ưu đãi" />
          <button style={{ padding: '10px 5px', outline: 'none', width: '100px', borderRadius: '5px', border: 0, background: '#41B948', color: '#ffffff', cursor: 'pointer' }}>Đăng ký</button>          
        </Stack>
      </Grid>
    </Grid>
  );
}
