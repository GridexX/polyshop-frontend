import { Box, Grid, Skeleton, Typography } from "@mui/material";
import OrderProgressComponent from "../components/OrderProgress.component";
import { useGetOrders } from "../hooks/useGetOrders";
import { Order } from "../hooks/common";
import { useEffect, useState } from "react";
import { OrderCard } from "../components/OrderCard.component";

export const OrdersPage = () => {

  const { orders: useOrders, error, loading } = useGetOrders();

  // Create an array of size 4 with empty items
  const emptyOrders = [undefined, undefined, undefined, undefined];

  const [orders, setOrders] = useState<Order[]|undefined[]>(emptyOrders);

  useEffect(() => {
      const appendOrders = (orders: Order[]) => {
        setOrders(orders);
      }

      console.log(JSON.stringify(useOrders))

      if(!loading && !error && useOrders) {
        appendOrders(useOrders);
      }
  }, [useOrders, loading, error, setOrders])

    return (
        <Box>
            <Typography variant={"h3"} component={"div"}>
                Orders
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" maxWidth={100} marginTop={2}>{loading ? <Skeleton /> : orders?.length + " orders"}</Typography>
            
            <Grid container spacing={2} direction={"column"}>
              {
                orders.map(order => <OrderCard order={order}/>)
              }
            </Grid>
            
        </Box>
    );
};
