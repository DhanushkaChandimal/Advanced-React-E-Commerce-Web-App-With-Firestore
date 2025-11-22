import { doc, getDoc, updateDoc } from "firebase/firestore";
import type { FirestoreConfig } from "../types/types";
import { db } from "../lib/firebaseConfig";

const SETTINGS = 'settings';
const CONFIG = 'config';

export const settingService = {
    getConfigs: async (): Promise<FirestoreConfig> => {
        const docSnapshot = await getDoc(doc(db, SETTINGS, CONFIG));
        const configs = docSnapshot.data();
        return configs as FirestoreConfig;
    },

    updateConfigs: async (configData: FirestoreConfig): Promise<boolean> => {
        const docRef = doc(db, SETTINGS, CONFIG);
        await updateDoc(docRef, {
            maxProductId: configData.maxProductId,
        });
        return true;
    },
};