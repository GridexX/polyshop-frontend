import axios, { AxiosError } from "axios";
import { CART_URL } from "../config/constants";
import { useQuery } from "react-query";
import { ExceptionMessage } from "./common";
import { useState } from "react";

export const useCheckoutCart = () => {
    const [shouldCheckoutCart, setShouldCheckoutCart] =
        useState<boolean>(false);

    const checkoutCart = async (): Promise<void> => {
        const route = CART_URL + "/checkout";
        const content = await axios.post(route).then((res) => {
            return res.data;
        });
        return content;
    };

    const [errorException, setErrorException] =
        useState<ExceptionMessage | null>(null);

    const { isLoading, data, error } = useQuery<void, AxiosError>(
        ["checkout_cart", CART_URL],
        checkoutCart,
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchInterval: 9000000,
            enabled: CART_URL.length > 0 && shouldCheckoutCart,
            // If there is an error, we want to retrieve the JSON data from the response
            // and log the error to the console.
            onSuccess: () => setShouldCheckoutCart(false),
            onError: (error) => {
                if (error.message.startsWith("4")) {
                    if (error.response?.data) {
                        setErrorException(
                            error.response.data as ExceptionMessage
                        );
                    }
                } else {
                    console.log(error.message);
                }
            },
        }
    );

    return {
        loading: isLoading,
        data,
        error,
        errorException,
        setShouldCheckoutCart,
    };
};
