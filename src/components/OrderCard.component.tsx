import { Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import { Order } from "../hooks/common";
import OrderProgressComponent from "./OrderProgress.component";

type OrderCardProps = {
    order?: Order;
};

export const OrderCard = ({ order }: OrderCardProps) => {
    const istOrderUndefined = typeof order === "undefined";

    return (
        <Grid item xs={10}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div" maxWidth={200}>
                        {istOrderUndefined ? <Skeleton /> : `Order n°${order?.id}` }
                    </Typography>
                    <Typography variant="subtitle1" component="div" maxWidth={200}>
                        {istOrderUndefined ? <Skeleton /> : `Date: ${order?.date.toLocaleDateString()}` }
                    </Typography>
                    {istOrderUndefined ? (
                      <Skeleton width={400} height={50}/>  
                    ) : (  
                      <OrderProgressComponent orderStatus={order?.status}/>
                    )
                    }
                </CardContent>
            </Card>
        </Grid>
    );
};
