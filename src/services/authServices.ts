import { addDoc, collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import type { AuthUser } from "../types/types";
import { db } from "../lib/firebaseConfig";

const USER_COLLECTION = 'users';

export const authService = {
    getUserById: async (userId: string): Promise<AuthUser | null> => {
        const q = query(collection(db, USER_COLLECTION), where("id", "==", userId));
        const querySnapshot = await getDocs(q);
        const user = querySnapshot.docs[0].data() as AuthUser;
        return user;
    },

    createUser: async (userData: AuthUser): Promise<AuthUser> => {
        await addDoc(collection(db, USER_COLLECTION), userData);
        return userData;
    },

    deleteUser: async (userId: string): Promise<boolean> => {
        const q = query(collection(db, USER_COLLECTION), where("id", "==", userId));
        const querySnapshot = await getDocs(q);
        const userDocRef = querySnapshot.docs[0].ref;
        await deleteDoc(userDocRef);
        
        return true;
    },
};
