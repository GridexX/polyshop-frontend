import axios, { AxiosError } from "axios";
import { CART_URL, CATALOG_URL } from "../config/constants";
import { useQuery } from "react-query";
import { ProductCartAggregate } from "./common";

export const useGetCart = () => {
    const getCart = async (): Promise<ProductCartAggregate[]> => {
        const route = CATALOG_URL + "/cart";
        const content = await axios.get(route).then((res) => {
            return res.data;
        });
        return content;
    };

    const { isLoading, data, error } = useQuery<
        ProductCartAggregate[],
        AxiosError
    >(["get_cart", CART_URL], getCart, {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchInterval: 9000,
        enabled: CART_URL.length > 0,
    });

    return {
        loading: isLoading,
        cartProducts: data,
        error,
    };
};
