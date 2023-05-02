import { useState } from "react";
import { ProductAggregate, PutProductDto } from "./common";
import { CATALOG_URL } from "../config/constants";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { redirect } from "react-router-dom";

export const usePutProduct = () => {
    const [productAggregate, setProductAggregate] = useState<
        ProductAggregate | undefined
    >(undefined);

    const putProduct = async (): Promise<ProductAggregate> => {
        const id = productAggregate?.id;
        const route = CATALOG_URL + "/" + id;

        // Extract the fields from the productAgregate object and put them in a PutProductDto object
        const putProductDto: PutProductDto = {
            name: productAggregate?.name ?? "",
            description: productAggregate?.description ?? "",
            price: productAggregate?.price ?? 0,
            quantity: productAggregate?.quantity ?? 0,
        };

        // Put the product to the catalog as a JSON object in the body of the request
        return axios.put(route, putProductDto).then((res) => {
            return res.data;
        });
    };

    const { isLoading, data, error } = useQuery<ProductAggregate, AxiosError>(
        ["put_product", CATALOG_URL, productAggregate?.id],
        putProduct,
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchInterval: 900000,
            enabled: typeof productAggregate !== "undefined",
            onSuccess: (data) => {
                setProductAggregate(undefined);
                return redirect(`/product/${data.id}`);
            },
        }
    );

    return {
        loading: isLoading,
        putProduct: data,
        error,
        setProductAggregate,
    };
};
