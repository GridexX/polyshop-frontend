import { Button, Grid, Skeleton, Typography } from "@mui/material";
import { useGetCatalog } from "../hooks/useGetCatalog.hook";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard.component";
import { ProductCatalog } from "../hooks/common";

export const CatalogPage = () => {
    const { products: productsFromCatalog, loading, error } = useGetCatalog();

    // Create an array of size 4 with empty items
    const emptyProducts = [undefined, undefined, undefined, undefined];

    const [products, setProducts] = useState<ProductCatalog[] | undefined[]>(
        emptyProducts
    );

    useEffect(() => {
        const appendProducts = (products: ProductCatalog[]) => {
            setProducts(products);
        };

        console.log(JSON.stringify(productsFromCatalog));

        if (!loading && !error && productsFromCatalog) {
            appendProducts(productsFromCatalog);
        }
    }, [productsFromCatalog, loading, error]);

    return (
        <div>
            <Typography variant={"h3"} component={"div"}>
                Catalog
            </Typography>
            <Typography
                variant="subtitle1"
                color="text.secondary"
                maxWidth={100}
                marginTop={2}
            >
                {loading ? <Skeleton /> : products.length + " products"}
            </Typography>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <ProductCard product={product} key={product?.id} />
                ))}
            </Grid>
            {!loading && <Button href="/product/create">
                Créer un produit</Button>}
        </div>
    );
};
