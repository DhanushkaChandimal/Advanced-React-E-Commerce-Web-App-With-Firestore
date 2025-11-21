import { addDoc, collection } from "firebase/firestore";
import type { AuthUser } from "../types/types";
import { db } from "../lib/firebaseConfig";

type CreateUserData = Omit<AuthUser, 'id'>;

const USER_COLLECTION = 'users';

export const authService = {
    createUser: async (userData: CreateUserData): Promise<AuthUser> => {
        const newId = 1;
        
        const newUser: AuthUser = {
            id: newId,
            ...userData
        };

        await addDoc(collection(db, USER_COLLECTION), newUser);
        
        return newUser;
    },
};