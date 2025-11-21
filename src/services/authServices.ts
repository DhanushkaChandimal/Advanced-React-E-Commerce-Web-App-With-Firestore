import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import type { AuthUser, FirestoreConfig } from "../types/types";
import { db } from "../lib/firebaseConfig";

type CreateUserData = Omit<AuthUser, 'id'>;

const USER_COLLECTION = 'users';
const SETTINGS = 'settings';
const CONFIG = 'config';

export const authService = {
    getConfigs: async (): Promise<FirestoreConfig> => {
        const docSnapshot = await getDoc(doc(db, SETTINGS, CONFIG));
        const configs = docSnapshot.data();
        console.log(configs)
        return configs as FirestoreConfig;
    },

    updateConfigs: async (configData: FirestoreConfig): Promise<boolean> => {
        const docRef = doc(db, SETTINGS, CONFIG);
        await updateDoc(docRef, {
            maxProductId: configData.maxProductId,
            maxUserId: configData.maxUserId
        });
        console.log("Hey UYpdated " + configData)
        return true;
    },

    createUser: async (userData: CreateUserData): Promise<AuthUser> => {
        const firestoreConfig = await authService.getConfigs();
        const newId = firestoreConfig.maxUserId + 1;
        
        const newUser: AuthUser = {
            id: newId,
            ...userData
        };

        await addDoc(collection(db, USER_COLLECTION), newUser);

        await authService.updateConfigs({
            maxProductId: firestoreConfig.maxProductId,
            maxUserId: newId,
        });
        console.log("nrewID  " + newId)
        
        return newUser;
    },
};