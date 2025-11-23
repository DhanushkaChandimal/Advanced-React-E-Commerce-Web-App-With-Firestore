import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/productService';
import type { Item } from '../types/types';

type CreateProductData = Omit<Item, 'id'>;

export const useProducts = () => {
    return useQuery<Item[]>({
        queryKey: ['items'],
        queryFn: productService.getAllProducts
    })
};

export const useCategories = () => {
    return useQuery<string[]>({
        queryKey: ['categories'],
        queryFn: productService.getAllCategories
    });
};

export const useCategory = (category: string) => {
    return useQuery<Item[]>({
        queryKey: ['category', category],
        queryFn: () => productService.getProductsByCategory(category),
        enabled: !!category
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (productData: CreateProductData) => productService.createProduct(productData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        }
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (productData: Item) => productService.updateProduct(productData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        }
    });
};