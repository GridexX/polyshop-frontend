import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Skeleton } from "@mui/material";
import { ProductCatalog } from "../hooks/common";
import { Link } from "react-router-dom";

type ProductCardProps = {
    product: ProductCatalog | undefined;
};

export const ProductCard = ({ product }: ProductCardProps) => {
    const isProductUndefined = typeof product === "undefined";

    return (
        <Grid item xs={4}>
            <Card>
                <CardContent>
                    <Link to={"/product/" + product?.id}>
                        <Typography color="black" variant="h5" component="div" maxWidth={200}>
                            {isProductUndefined ? <Skeleton /> : product?.name}
                        </Typography>
                    </Link>
                    <Typography
                        sx={{ mb: 1.5 }}
                        color="text.secondary"
                        maxWidth={100}
                    >
                        {isProductUndefined ? (
                            <Skeleton />
                        ) : (
                            product?.price + "€"
                        )}
                    </Typography>
                    <Typography variant="body2">
                        {isProductUndefined ? (
                            <Skeleton />
                        ) : (
                            product?.description
                        )}
                    </Typography>
                </CardContent>
                <CardActions>
                    {isProductUndefined && <Skeleton width={100} height={30} />}
                    {!isProductUndefined && (
                        <>
                            <Button size="small"
                                href={`/product/${product?.id}`}
                            >Voir plus</Button>
                            <Button
                                size="small"
                                color="secondary"
                                sx={{ marginLeft: 2 }}
                                href={`/product/edit/${product.id}`}
                            >
                                Edit
                            </Button>
                        </>
                    )}
                </CardActions>
            </Card>
        </Grid>
    );
};
