import { defineEventHandler, getCookie } from 'h3';
import { COOKIE_NAME } from '@lib/firebase-admin';
import { getFirebaseSession } from '@lib/firebase-session';


export default defineEventHandler(async (event) => {


  event.context.getSession = async () => {

    const sessionCookie = getCookie(event, COOKIE_NAME);

    if (!sessionCookie) {
      return null;
    }

    const {
      error,
      decodedClaims
    } = await getFirebaseSession(sessionCookie);

    if (error) {
      console.error(error);
      return null;
    }

    return decodedClaims;
  };


});

