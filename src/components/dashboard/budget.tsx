import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import React, { useEffect, useState } from "react";
import { orderController } from "../../controller/OrderController";

export default function Budget() {
  const [totalOrder, setTotalOrder] = useState(0);

  useEffect(() => {
    getOrderList();
  }, []);

  const getOrderList = () => {
    orderController.getOrdersList().then((res) => {
      setTotalOrder(res.length);
    });
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL ORDER
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {totalOrder}
            </Typography>
          </Grid>

          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
