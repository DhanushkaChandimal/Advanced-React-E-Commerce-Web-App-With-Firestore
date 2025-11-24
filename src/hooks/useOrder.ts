import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Order } from '../types/types';
import { orderService } from '../services/orderService';

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (orderData: Order) => orderService.createOrder(orderData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
    });
};
