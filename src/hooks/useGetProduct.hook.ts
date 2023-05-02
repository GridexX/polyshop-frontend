import axios, { AxiosError } from "axios";
import { CATALOG_URL } from "../config/constants";
import { useQuery } from "react-query";
import { ProductAggregate } from "./common";

export const useGetProduct = (idProduct: string) => {
    const getProductAggregate = async (): Promise<ProductAggregate> => {
        const route = CATALOG_URL + "/" + idProduct;
        const content = await axios.get(route).then((res) => {
            return res.data;
        });
        return content;
    };

    const { isLoading, data, error } = useQuery<ProductAggregate, AxiosError>(
        ["catalog", CATALOG_URL, idProduct],
        getProductAggregate,
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchInterval: 900000,
            enabled: idProduct.length > 0,
        }
    );

    return {
        loading: isLoading,
        product: data,
        error,
    };
};
