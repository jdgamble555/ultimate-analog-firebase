import {
    type PageServerAction,
    redirect,
    json,
    fail,
} from '@analogjs/router/server/actions';
import { readFormData } from 'h3';

export async function action({ event }: PageServerAction) {
    
    const body = await readFormData(event);
    const email = body.get('email');

    if (email instanceof File) {
        return fail(422, { email: 'Invalid type' });
    }

    if (!email) {
        return fail(422, { email: 'Email is required' });
    }

    if (email.length < 10) {
        return redirect('/');
    }

    return json({ type: 'success' });
}