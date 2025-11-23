import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AuthUser } from '../types/types';
import { authService } from '../services/authServices';

export const useUser = (userId: string) => {
    return useQuery<AuthUser| null>({
        queryKey: ['user', userId],
        queryFn: () => authService.getUserById(userId),
        enabled: !!userId
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (userData: AuthUser) => authService.createUser(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (userId: string) => authService.deleteUser(userId),
        onSuccess: (userId) => {
            queryClient.removeQueries({ queryKey: ['user', userId] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });
};
