import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Item, CartItem } from '../types/types';

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

const loadCartFromSessionStorage = (): CartItem[] => {
    try {
        const cartData = sessionStorage.getItem('shopping_cart');
        if (cartData) {
            return JSON.parse(cartData);
        }
    } catch (error) {
        console.error('Error loading cart from sessionStorage:', error);
    }
    return [];
};

const saveCartToSessionStorage = (items: CartItem[]): void => {
    try {
        sessionStorage.setItem('shopping_cart', JSON.stringify(items));
    } catch (error) {
        console.error('Error saving cart to sessionStorage:', error);
    }
};

const calculateTotals = (items: CartItem[]) => {
    let totalItems = 0;
    let totalPrice = 0;
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        totalItems += item.quantity;
        totalPrice += (item.price * item.quantity);
    }
    
    return { totalItems, totalPrice };
};

const savedItems = loadCartFromSessionStorage();
const { totalItems, totalPrice } = calculateTotals(savedItems);

const initialState: CartState = {
    items: savedItems,
    totalItems,
    totalPrice,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Item>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }

            const { totalItems, totalPrice } = calculateTotals(state.items);
            state.totalItems = totalItems;
            state.totalPrice = totalPrice;
            
            saveCartToSessionStorage(state.items);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item && action.payload.quantity > 0) {
                item.quantity = action.payload.quantity;
                
                const { totalItems, totalPrice } = calculateTotals(state.items);
                state.totalItems = totalItems;
                state.totalPrice = totalPrice;
                
                saveCartToSessionStorage(state.items);
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            
            const { totalItems, totalPrice } = calculateTotals(state.items);
            state.totalItems = totalItems;
            state.totalPrice = totalPrice;
            
            saveCartToSessionStorage(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
            
            saveCartToSessionStorage([]);
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;