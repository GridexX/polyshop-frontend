import axios, { AxiosError } from "axios";
import { CART_URL } from "../config/constants";
import { useQuery } from "react-query";

export const useDeleteProductFromCart = (idProduct: string) => {
    const deleteProductFromCart = async (): Promise<void> => {
        const route = CART_URL + "/" + idProduct;
        return await axios.delete(route).then((res) => {
            return res.data;
        });
    };

    const { isLoading, data, error } = useQuery<void, AxiosError>(
        ["delete_product_cart", CART_URL, idProduct],
        deleteProductFromCart,
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchInterval: 900000,
            enabled: idProduct.length > 0,
        }
    );

    return {
        loading: isLoading,
        data,
        error,
    };
};
