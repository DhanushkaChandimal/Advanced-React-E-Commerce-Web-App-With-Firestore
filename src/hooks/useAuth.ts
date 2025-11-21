import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AuthUser } from '../types/types';
import { authService } from '../services/authServices';

type CreateUserData = Omit<AuthUser, 'id'>;

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (userData: CreateUserData) => authService.createUser(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });
};