import { collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import type { Item } from '../types/types';
import { settingService } from './settingService';

const PRODUCTS_COLLECTION = 'products';
const CATEGORIES_COLLECTION = 'categories';

type CreateProductData = Omit<Item, 'id'>;

export const productService = {
    getAllProducts: async (): Promise<Item[]> => {
        const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
        const productList = querySnapshot.docs.map(doc => ({
            id: doc.data().id || doc.id,
            ...doc.data()
        })) as Item[];
        return productList;
    },

    getAllCategories: async (): Promise<string[]> => {
        const querySnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
        const categoryList = querySnapshot.docs.map(doc => doc.id);
        return categoryList;
    },

    getProductsByCategory: async (category: string): Promise<Item[]> => {
        const q = query(collection(db, PRODUCTS_COLLECTION), where("category", "==", category));
        const querySnapshot = await getDocs(q);
        const productList = querySnapshot.docs.map(doc => ({
            id: doc.data().id || doc.id,
            ...doc.data()
        })) as Item[];
        return productList;
    },

    createProduct: async (productData: CreateProductData): Promise<Item> => {
        const firestoreConfig = await settingService.getConfigs();
        const newId = firestoreConfig.maxProductId + 1;
        
        const newProduct: Item = {
            id: newId,
            ...productData
        };

        await addDoc(collection(db, PRODUCTS_COLLECTION), newProduct);

        await settingService.updateConfigs({
            maxProductId: newId,
        });
        
        return newProduct;
    },

    updateProduct: async (productData: Item): Promise<Item> => {
        const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
        const productDoc = querySnapshot.docs.find(doc => doc.data().id === productData.id);

        if (!productDoc) {
            throw new Error('Product not found');
        }

        await updateDoc(doc(db, PRODUCTS_COLLECTION, productDoc.id), { ...productData });
        
        return productData;
    },

    deleteProduct: async (id: number): Promise<boolean> => {
        const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
        const productDoc = querySnapshot.docs.find(doc => doc.data().id === id);
        
        if (!productDoc) {
            throw new Error('Product not found');
        }

        await deleteDoc(doc(db, PRODUCTS_COLLECTION, productDoc.id));

        return true;
    }
};