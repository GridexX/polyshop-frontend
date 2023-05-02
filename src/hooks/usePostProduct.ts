import { useState } from "react";
import { ProductAggregate, PostProductDto } from "./common";
import { CATALOG_URL } from "../config/constants";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { redirect } from "react-router-dom";

export const usePostProduct = () => {
    const [postProductDto, setPostProduct] = useState<
        PostProductDto | undefined
    >(undefined);

    const postProduct = async (): Promise<ProductAggregate> => {
        const route = CATALOG_URL;

        // Put the product to the catalog as a JSON object in the body of the request
        return axios.post(route, postProductDto).then((res) => {
            return res.data;
        });
    };

    const { isLoading, data, error } = useQuery<ProductAggregate, AxiosError>(
        ["post_product", CATALOG_URL, postProductDto?.name],
        postProduct,
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchInterval: 900000,
            enabled: typeof postProductDto !== "undefined",
            onSuccess: (data) => {
                setPostProduct(undefined);
                return redirect(`/product/${data.id}`);
            },
        }
    );

    return {
        loading: isLoading,
        postProduct: data,
        error,
        setPostProduct,
    };
};
