import { Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import { Order } from "../hooks/common";
import OrderProgressComponent from "./OrderProgress.component";

type OrderCardProps = {
    order?: Order;
};

export const OrderCard = ({ order }: OrderCardProps) => {
    const istOrderUndefined = typeof order === "undefined";

    //Use the reduce function to calculate the total quantity of the order by adding the quantity of each product
    const totalQuantity = order?.products.reduce(
        (acc, product) => acc + product.amount,
        0
    );

    return (
        <Grid item xs={10}>
            <Card>
                <CardContent>
                    <Grid
                        container
                        spacing={2}
                        direction={"row"}
                        justifyContent="space-between"
                        alignContent={"center"}
                    >
                        <Grid item>
                            <Typography
                                variant="h5"
                                component="div"
                                maxWidth={200}
                            >
                                {istOrderUndefined ? (
                                    <Skeleton />
                                ) : (
                                    `Order n°${order?.id}`
                                )}
                            </Typography>
                        
                            <Typography
                                variant="subtitle1"
                                component="div"
                                maxWidth={200}
                                minWidth={200}
                            >
                                {istOrderUndefined ? (
                                    <Skeleton />
                                ) : (
                                    `Date: ${order?.date.toLocaleDateString()}`
                                )}
                            </Typography>
                            </Grid>
                            <Grid item>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                maxWidth={200}
                            >
                                {istOrderUndefined ? (
                                    <Skeleton />
                                ) : (
                                    `Total produits: ${totalQuantity}`
                                )}
                            </Typography>
                            
                        </Grid>
                    </Grid>
                    {istOrderUndefined ? (
                        <Skeleton width={400} height={50} />
                    ) : (
                        <OrderProgressComponent orderStatus={order?.status} />
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
};
