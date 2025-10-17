import { isPlatformBrowser } from "@angular/common";
import { inject, InjectionToken, PLATFORM_ID } from "@angular/core";
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { doc, Firestore, getDoc, getFirestore } from "firebase/firestore";
import {
    getFirestore as getFirestoreLite,
    getDoc as getDocLite,
    doc as docLite
} from 'firebase/firestore/lite'

const firebase_config = JSON.parse(import.meta.env['PUBLIC_FIREBASE_CONFIG']);


export const FIREBASE_APP = new InjectionToken<FirebaseApp>(
    'firebase-app',
    {
        providedIn: 'root',
        factory() {
            return getApps().length
                ? getApp()
                : initializeApp(firebase_config);

        }
    }
);

export const FIREBASE_AUTH = new InjectionToken<Auth | null>(
    'firebase-auth',
    {
        providedIn: 'root',
        factory() {
            const platformID = inject(PLATFORM_ID);
            if (isPlatformBrowser(platformID)) {
                const app = inject(FIREBASE_APP);
                return getAuth(app);
            }
            return null;
        }
    }
);


export const FIREBASE_FIRESTORE = new InjectionToken<Firestore>(
    'firebase-firestore',
    {
        providedIn: 'root',
        factory() {
            const platformID = inject(PLATFORM_ID);
            const app = inject(FIREBASE_APP);
            if (isPlatformBrowser(platformID)) {
                return getFirestore(app);
            }
            return getFirestoreLite(app);
        }
    }
);


export const FIRESTORE_GET_DOC = new InjectionToken(
    'firestore-get-doc',
    {
        providedIn: 'root',
        factory() {
            const db = inject(FIREBASE_FIRESTORE);
            const platformID = inject(PLATFORM_ID);
            return async <T>(path: string) => {

                try {

                    const snap = isPlatformBrowser(platformID)
                        ? await getDoc(doc(db, path))
                        : await getDocLite(docLite(db, path));
                    if (!snap.exists()) {
                        throw new Error(`Document at path "${path}" does not exist.`);
                    }
                    return {
                        data: snap.data() as T,
                        error: null
                    };

                } catch (e) {
                    
                    return {
                        data: null,
                        error: e
                    };
                }
            }
        }
    }
);