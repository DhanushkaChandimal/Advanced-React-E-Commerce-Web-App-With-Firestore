import { addDoc, collection } from "firebase/firestore";
import type { AuthUser } from "../types/types";
import { db } from "../lib/firebaseConfig";
import { settingService } from "../services/settingService";

type CreateUserData = Omit<AuthUser, 'id'>;

const USER_COLLECTION = 'users';

export const authService = {
    createUser: async (userData: CreateUserData): Promise<AuthUser> => {
        const firestoreConfig = await settingService.getConfigs();
        const newId = firestoreConfig.maxUserId + 1;
        
        const newUser: AuthUser = {
            id: newId,
            ...userData
        };

        await addDoc(collection(db, USER_COLLECTION), newUser);

        await settingService.updateConfigs({
            maxProductId: firestoreConfig.maxProductId,
            maxUserId: newId,
        });
        
        return newUser;
    },
};