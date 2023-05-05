import { Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import { ProductCartAggregate } from "../hooks/common";

type CartProductProps = {
    cartProduct?: ProductCartAggregate;
};

export const CartProduct = ({ cartProduct }: CartProductProps) => {
    const istProductUndefined = typeof cartProduct === "undefined";

    return (
        <Grid item xs={8}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div" maxWidth={200}>
                        {istProductUndefined ? (
                            <Skeleton />
                        ) : (
                            `${cartProduct?.name}`
                        )}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="span"
                        maxWidth={50}
                        mb={3}
                    >
                        {istProductUndefined ? (
                            <Skeleton />
                        ) : (
                            `#${cartProduct?.id}`
                        )}
                    </Typography>
                    <Grid container spacing={2} direction={"row"} justifyContent="space-between" alignContent={"center"} >
                        <Grid item >
                            <Typography component="div" maxWidth={150}>
                                {istProductUndefined ? (
                                    <Skeleton />
                                ) : (
                                    `Quantité: ${cartProduct?.amount}`
                                )}
                            </Typography>
                        </Grid>

                        <Grid item >
                            <Typography
                                variant="subtitle1"
                                component="span"
                                maxWidth={100}
                            >
                                {istProductUndefined ? (
                                    <Skeleton />
                                ) : (
                                    `Total: ${
                                        cartProduct?.price * cartProduct?.amount
                                    } €`
                                )}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
};
