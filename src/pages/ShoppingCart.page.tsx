import { useEffect, useState } from "react";
import { useGetCart } from "../hooks/useGetCart.hook";
import { ProductCartAggregate } from "../hooks/common";
import { Box, Button, CircularProgress, Grid, Skeleton, Typography } from "@mui/material";
import { CartProduct } from "../components/CartProduct.component";
import { useClearCart } from "../hooks/useClearCart";
import { useCheckoutCart } from "../hooks/useCheckoutCart.hook";

export const ShoppingCartPage = () => {
    const { cartProducts, error, loading } = useGetCart();

    const emptyCart = [undefined, undefined, undefined, undefined];

    const [cart, setCart] = useState<ProductCartAggregate[] | undefined[]>(
        emptyCart
    );

    const { loading: loadingClear, error: clearCartError, setShouldClearCart } = useClearCart();

    const { loading: loadingCheckout, error: checkoutCartError, setShouldCheckoutCart } = useCheckoutCart();

    useEffect(() => {
        const appendCart = (cart: ProductCartAggregate[]) => {
            setCart(cart);
        };

        if (!loading && !error && cartProducts) {
            appendCart(cartProducts);
        }
    }, [cartProducts, loading, error]);

    const handleClickCheckout = () => {
      setShouldCheckoutCart(true);
    }

    const handleClickClear = () => {
      setShouldClearCart(true);
    }

    return (
        <Box>
            <Typography variant={"h3"} component={"div"}>
                Shopping Cart
            </Typography>
            {
              error && <Typography variant={"caption"} component={"div"} color="error">
                {error.message} {error.name}
                </Typography>
            }
            {
              clearCartError && <Typography variant={"caption"} component={"div"} color="error">
                {clearCartError.message} {clearCartError.name}
                </Typography>
            }
            {
              checkoutCartError && <Typography variant={"caption"} component={"div"} color="error">
                {checkoutCartError.message} {checkoutCartError.name}
                </Typography>
            }
            <Typography
                variant="subtitle1"
                color="text.secondary"
                maxWidth={200}
                marginTop={2}
            >
                {loading ? <Skeleton /> : cartProducts?.length + " products"}
            </Typography>
            <Grid container spacing={2} my={2} direction={"column"}>
                {cart?.map((product) => (
                    <CartProduct cartProduct={product} key={product?.id} />
                ))}
            </Grid>
            <Grid container spacing={2}>

            <Grid item>

            <Button variant="contained" disabled={cart.length < 1 || loading || loadingCheckout} onClick={handleClickCheckout}>
              {
                (loading || loadingCheckout) ? <CircularProgress color={"secondary"} /> : "Checkout"
              }
            </Button>
              </Grid>
              <Grid item>

            <Button color="error" disabled={cart.length < 1 || loading || loadingClear} onClick={handleClickClear}>
            {
              (loading || loadingCheckout) ? <CircularProgress color={"error"} /> : "Clear Cart"
            }
            </Button>
            </Grid>
            </Grid>
        </Box>
    );
};
