import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllOrders, getMyOrders, paymentSuccess, updateOrderStatus } from "../Services/orderAPI";
import toast from "react-hot-toast";

export function useOrders() {
    const { data: orders, isLoading, error } = useQuery({
        queryKey: ['orders'],
        queryFn: getAllOrders,
    });

    return { orders, isLoading, error };
}


interface IorderStatus {
    orderId: number;
    newStatus: string;
}

export function useUpdateOrderStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderId, newStatus }: IorderStatus) =>
            updateOrderStatus(orderId, newStatus),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['NewNineProducts'] });
        },

        onError: (error) => {
            console.log(error);
        },
    });



}

export function useMyOrders() {
    const { data: myOrders, isLoading, error } = useQuery({
        queryKey: ['myOrders'],
        queryFn: () => getMyOrders(),
        // staleTime: 1000 * 60 * 120, 
    });
    return { myOrders, isLoading, error };
}

interface IorderSuccess {
    orderId: string;
    sessionId: string;
}

export function useOrderSuccess() {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: ({ orderId, sessionId }: IorderSuccess) =>
            paymentSuccess(orderId, sessionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },

        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    return { mutate };
}

