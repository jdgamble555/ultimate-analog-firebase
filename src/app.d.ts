// Tell TS that this is a module, not a script
export { };

import type { DecodedIdToken } from 'firebase-admin/auth';

type Optional<T> = T | undefined | null;

type UserType = {
    displayName: Optional<string>;
    photoURL: Optional<string>;
    uid: string;
    email: Optional<string>;
};

declare module 'h3' {

    interface H3EventContext {
        /**
         * Returns the current user's decoded Firebase ID token claims,
         * or null if unauthenticated/invalid.
         */
        getSession: () => Promise<DecodedIdToken | null>;
    }

}