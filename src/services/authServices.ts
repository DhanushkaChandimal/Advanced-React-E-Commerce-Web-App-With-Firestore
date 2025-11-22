import { addDoc, collection } from "firebase/firestore";
import type { AuthUser } from "../types/types";
import { db } from "../lib/firebaseConfig";

const USER_COLLECTION = 'users';

export const authService = {
    createUser: async (userData: AuthUser): Promise<AuthUser> => {
        await addDoc(collection(db, USER_COLLECTION), userData);
        return userData;
    },
};