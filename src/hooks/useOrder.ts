import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Order } from '../types/types';
import { orderService } from '../services/orderService';

export const useGetOrdersById = (userId: string) => {
    return useQuery<Order[]>({
        queryKey: ['orders', userId],
        queryFn: () => orderService.getAllOrdersByUserId(userId),
        enabled: !!userId
    });
};

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (orderData: Order) => orderService.createOrder(orderData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
    });
};
