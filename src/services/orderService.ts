import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import type { Order } from '../types/types';

const ORDER_COLLECTION = 'orders';

export const orderService = {
    createOrder: async (orderData: Order): Promise<Order> => {
        await addDoc(collection(db, ORDER_COLLECTION), orderData);
        return orderData;
    },
};
