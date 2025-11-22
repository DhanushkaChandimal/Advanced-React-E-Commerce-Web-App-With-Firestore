import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AuthUser } from '../types/types';
import { authService } from '../services/authServices';

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (userData: AuthUser) => authService.createUser(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });
};