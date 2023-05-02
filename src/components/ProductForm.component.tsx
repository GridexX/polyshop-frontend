import { useEffect, useState } from "react";
import { ProductAggregate } from "../hooks/common";
import {
    Box,
    Button,
    Grid,
    InputAdornment,
    Skeleton,
    TextField,
    Typography,
} from "@mui/material";
import { usePostProduct } from "../hooks/usePostProduct";
import { usePutProduct } from "../hooks/usePutProduct";
import { useGetProduct } from "../hooks/useGetProduct.hook";
import { NotFoundError } from "./NotFoundError.component";
import {
    BadgeRounded,
    Description,
    Euro,
    Inventory,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

type ProductEditProps = {
    productId?: string;
};

// If the productId is undefined, we are creating a new product
export const ProductForm = ({ productId }: ProductEditProps) => {
    const [productAggregate, setProductAggregate] = useState<
        ProductAggregate | undefined
    >(undefined);

    const {
        postProduct,
        error: errorPost,
        loading: loadingPost,
        setPostProduct,
    } = usePostProduct();

    const {
        putProduct,
        error: errorPut,
        loading: loadingPut,
        setProductAggregate: setPutProduct,
    } = usePutProduct();

    const emptyProductForm = {
        name: "",
        description: "",
        price: 0,
        quantity: 0,
    };

    const [productForm, setProductForm] = useState(emptyProductForm);

    const {
        product: productGet,
        error: errorGet,
        loading: loadingGet,
    } = useGetProduct(productId ?? "");

    // If the product exists, we set the ProductAggregate to display the product
    useEffect(() => {
        const setProduct = (product: ProductAggregate) => {
            setProductAggregate(product);
        };

        if (productGet) {
            setProduct(productGet);
            setProductForm(productGet);
        }
    }, [productGet, setProductAggregate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProductForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(productForm);
    };

    const defaultErrorsForm = {
        name: "",
        description: "",
        price: "",
        quantity: "",
    };

    const [errorsForm, setErrorsForm] = useState(defaultErrorsForm);

    const [isFormValid, setIsFormValid] = useState<boolean>(
        productAggregate ? true : false
    );

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let error = "";
        if (name === "name") {
            if (value.length < 3) {
                error = "Le nom doit contenir au moins 3 caractères";
            }
        } else if (name === "description") {
            if (value.length < 10) {
                error = "La description doit contenir au moins 10 caractères";
            }
        } else if (name === "price") {
            if (Number(value) <= 0) {
                error = "Le prix doit être supérieur à 0";
            }
            if (isNaN(Number(value))) {
                error = "Le prix doit être un nombre";
            }
        } else if (name === "quantity") {
            if (Number(value) <= 0) {
                error = "La quantité doit être supérieure à 0";
            }
            if (isNaN(Number(value))) {
                error = "La quantité doit être un nombre";
            }
        }

        setErrorsForm((prevState) => ({
            ...prevState,
            [name]: error,
        }));
        const isOneFieldEmpty = Object.values(productForm).some(
            (value) => value === "" || value === 0
        );
        console.log(Object.values(productForm));
        console.log(isOneFieldEmpty);
        setIsFormValid(error.length < 1 && !isOneFieldEmpty);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const setNavigation = (product: ProductAggregate) => {
            navigate(`/product/${product.id}`);
        };

        if (
            typeof postProduct !== "undefined" ||
            typeof putProduct !== "undefined"
        ) {
            if (postProduct) {
                setNavigation(postProduct);
            }
            if (putProduct) {
                setNavigation(putProduct);
            }
        }
    }, [postProduct, putProduct, navigate]);

    const handleSubmit = () => {
        // Convert the number in the form to a number
        productForm.price = Number(productForm.price);
        productForm.quantity = Number(productForm.quantity);

        // Construct a Product

        if (productId) {
            // Create a ProductAggregate from the productForm
            const productAggregate: ProductAggregate = {
                id: productId,
                name: productForm.name,
                description: productForm.description,
                price: productForm.price,
                quantity: productForm.quantity,
            };
            console.log("PUT");
            setPutProduct(productAggregate);
        } else {
            console.log("POST");
            setPostProduct(productForm);
        }
    };

    if (
        typeof postProduct !== "undefined" ||
        typeof putProduct !== "undefined"
    ) {
        console.log("redirect");
        const product = postProduct || putProduct;
    }

    return (
        <Box>
            {errorGet && <NotFoundError kind="product" />}
            {(errorPost || errorPut) && (
                <Typography
                    variant="subtitle1"
                    color="error"
                    component="div"
                    maxWidth={200}
                >
                    {JSON.stringify(errorPost?.toJSON()) ||
                        JSON.stringify(errorPut?.toJSON())}
                </Typography>
            )}
            <Typography variant="h5" component="div" maxWidth={200}>
                {(loadingGet || typeof productId === "undefined") &&
                    productId && <Skeleton />}
                {!loadingGet && productGet && productId && `Edition du produit`}
                {!loadingGet && !productGet && !productId && "Nouveau produit"}
            </Typography>

            <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                maxWidth={200}
            >
                {loadingGet && <Skeleton />}
                {!loadingGet &&
                    productGet &&
                    productAggregate &&
                    productId &&
                    `#${productAggregate.id}`}
            </Typography>

            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                    display: "flex",
                    flexDirection: "column",
                    spacing: 2,
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="product_name"
                    label="Nom"
                    size="small"
                    name="name"
                    value={productForm.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errorsForm.name.length > 0}
                    helperText={errorsForm.name}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BadgeRounded />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="product_description"
                    label="Description"
                    size="small"
                    multiline
                    rows={4}
                    name="description"
                    value={productForm.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errorsForm.description.length > 0}
                    helperText={errorsForm.description}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Description />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    id="product_price"
                    label="Prix"
                    size="small"
                    name="price"
                    value={productForm.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errorsForm.price.length > 0}
                    helperText={errorsForm.price}
                    InputProps={{
                        inputMode: "numeric",
                        type: "number",
                        startAdornment: (
                            <InputAdornment position="start">
                                <Euro />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="product_quantity"
                    label="Quantité"
                    size="small"
                    name="quantity"
                    value={productForm.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errorsForm.quantity.length > 0}
                    helperText={errorsForm.quantity}
                    InputProps={{
                        inputMode: "numeric",
                        type: "number",
                        startAdornment: (
                            <InputAdornment position="start">
                                <Inventory />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Grid container spacing={2}>
                <Grid item>
                    <Button
                        variant="outlined"
                        disabled={!isFormValid}
                        onClick={handleSubmit}
                    >
                        Enregister
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        color="error"
                        onClick={() => {
                            setProductForm(emptyProductForm);
                        }}
                    >
                        Effacer
                    </Button>
                </Grid>
            </Grid>
            {(putProduct || postProduct) && (
                <Link to={`/product/${putProduct?.id || postProduct?.id}`}>
                    <Button variant="outlined" color="success">
                        Voir le produit
                    </Button>
                </Link>
            )}
        </Box>
    );
};
