import { readFormData, setCookie, deleteCookie } from 'h3';
import { redirect, fail, type PageServerAction } from '@analogjs/router/server/actions';
import { createFirebaseSession } from '@lib/firebase-session';
import { COOKIE_NAME } from '@lib/firebase-admin';


export async function action({ event }: PageServerAction) {

    const body = await readFormData(event);
    const action = body.get('action') as string;

    if (action === 'logout') {
        deleteCookie(event, COOKIE_NAME, { path: '/' });
        return redirect('/');
    }

    if (action === 'loginWithGoogle') {
        const idToken = body.get('idToken') as string;
        if (!idToken) {
            return fail(401, { message: 'Unauthorized request!' });
        }

        const {
            sessionCookie,
            options,
            error: firebase_error
        } = await createFirebaseSession(idToken);

        if (firebase_error) {
            return fail(firebase_error.status, { message: firebase_error.message });
        }

        setCookie(event, COOKIE_NAME, sessionCookie, options);
        return redirect('/');
    }

    return fail(400, { message: 'Unknown action' });
}
