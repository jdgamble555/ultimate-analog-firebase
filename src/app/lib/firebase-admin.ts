import { getApps, initializeApp, cert, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';


const firebase_admin_config = JSON.parse(import.meta.env['PRIVATE_FIREBASE_ADMIN_CONFIG']);

export const COOKIE_NAME = '__session';

export const useFirebaseAdmin = () => {

    const app = getApps().length
        ? getApp()
        : initializeApp({
            credential: cert(firebase_admin_config)
        });

    const adminAuth = getAuth(app);
    const adminDB = getFirestore(app);

    return {
        adminAuth,
        adminDB
    };
}



