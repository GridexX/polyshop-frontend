import axios, { AxiosError } from "axios";
import { CART_URL } from "../config/constants";
import { useQuery } from "react-query";
import { AddToCartDto } from "./common";
import { useState } from "react";

export const useAddToCart = () => {
    const [addToCartDto, setAddToCartDto] = useState<AddToCartDto | undefined>(
        undefined
    );

    const addToCart = async (): Promise<AddToCartDto> => {
        const route = CART_URL + "/product";
        // Post the product to the cart as a JSON object in the body of the request

        const content = await axios.post(route, addToCartDto).then((res) => {
            return res.data;
        });
        return content;
    };

    const { isLoading, data, error } = useQuery<AddToCartDto, AxiosError>(
        ["add_to_cart", CART_URL, addToCartDto?.id],
        addToCart,
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchInterval: 900000,
            enabled: typeof addToCartDto !== "undefined",
        }
    );

    return {
        loading: isLoading,
        data,
        error,
        setAddToCartDto,
    };
};
