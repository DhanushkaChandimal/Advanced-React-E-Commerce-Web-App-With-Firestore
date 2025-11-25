import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import type { Order } from '../types/types';

const ORDER_COLLECTION = 'orders';

export const orderService = {

    getAllOrdersByUserId: async (userId: string): Promise<Order[]> => {
        const q = query(collection(db, ORDER_COLLECTION), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const orders = querySnapshot.docs.map(doc => doc.data() as Order);
        return orders;
    },

    createOrder: async (orderData: Order): Promise<Order> => {
        await addDoc(collection(db, ORDER_COLLECTION), orderData);
        return orderData;
    },
};
