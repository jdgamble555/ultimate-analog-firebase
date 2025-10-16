import { isPlatformBrowser } from "@angular/common";
import { inject, InjectionToken, PLATFORM_ID } from "@angular/core";
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { getFirestore as getFirestoreLite } from 'firebase/firestore/lite'

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
                return app ? getAuth(app) : null;
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