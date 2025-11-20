import axios from 'axios';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import type { Item } from '../types/types';

const API_BASE_URL = 'https://fakestoreapi.com';
const PRODUCTS_COLLECTION = 'products';

type CreateProductData = Omit<Item, 'id'>;

export const productService = {
    getAllProducts: async (): Promise<Item[]> => {
        const response = await axios.get<Item[]>(`${API_BASE_URL}/products`);
        return response.data;
    },

    getAllCategories: async (): Promise<string[]> => {
        const response = await axios.get<string[]>(`${API_BASE_URL}/products/categories`);
        return response.data;
    },

    getProductsByCategory: async (category: string): Promise<Item[]> => {
        const response = await axios.get<Item[]>(`${API_BASE_URL}/products/category/${category}`);
        return response.data;
    },

    createProduct: async (productData: CreateProductData): Promise<Item> => {
        try {
            const allProducts = await productService.getAllProducts();
            const newId = Math.max(...allProducts.map(p => p.id), 0) + 1;
            
            const newProduct: Item = {
                id: newId,
                ...productData
            };

            await addDoc(collection(db, PRODUCTS_COLLECTION), newProduct);
            
            return newProduct;
        } catch (error) {
            console.error('Error creating product:', error);
            throw new Error('Failed to create product');
        }
    },
};