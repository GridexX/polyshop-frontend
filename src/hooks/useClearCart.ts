import axios, { AxiosError } from "axios";
import { CART_URL } from "../config/constants";
import { useQuery } from "react-query";
import { useState } from "react";

export const useClearCart = () => {
    const [shouldClearCart, setShouldClearCart] = useState<boolean>(false);

    const clearCart = async (): Promise<void> => {
        const route = CART_URL;
        return await axios.delete(route).then((res) => {
            return res.data;
        });
    };

    const { isLoading, data, error } = useQuery<void, AxiosError>(
        ["clear_cart", CART_URL],
        clearCart,
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchInterval: 900000,
            enabled: CART_URL.length > 0 && shouldClearCart,
            onSuccess: () => setShouldClearCart(false),
        }
    );

    return {
        loading: isLoading,
        data,
        error,
        setShouldClearCart,
    };
};
