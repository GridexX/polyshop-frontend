import axios, { AxiosError } from "axios";
import { ORDERS_URL } from "../config/constants";
import { useQuery } from "react-query";
import { Order, OrderDto } from "./common";
import { useState } from "react";

type ReturnObject = {
    loading: boolean;
    orders?: Order[];
    error: AxiosError | null;
};

export const useGetOrders = (): ReturnObject => {
    const getOrders = async (): Promise<OrderDto[]> => {
        const route = ORDERS_URL;
        const content = await axios.get(route).then((res) => {
            return res.data;
        });
        return content;
    };

    const [orders, setOrders] = useState<Order[] | undefined>(undefined);

    const { isLoading, error } = useQuery<OrderDto[], AxiosError>(
        ["get_orders", ORDERS_URL],
        getOrders,
        {
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchInterval: 900000,
            enabled: ORDERS_URL.length > 0,
            onSuccess: (data) => {
                setOrders(
                    data.map((order) => {
                        return {
                            ...order,
                            date: new Date(order.date),
                        };
                    })
                );
            },
        }
    );

    return {
        loading: isLoading,
        orders: orders,
        error,
    };
};
