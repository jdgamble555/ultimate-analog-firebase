import { inject, isDevMode } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { FIRESTORE_GET_DOC } from '@lib/firebase/firebase.service';
import { useAsyncTransferState } from '@lib/utils';

export type AboutDoc = {
    name: string;
    description: string;
};

export const aboutDataResolver: ResolveFn<AboutDoc> = async () => {

    return useAsyncTransferState('about', async () => {

        const getDoc = inject(FIRESTORE_GET_DOC);

        const data = await getDoc<AboutDoc>('/about/ZlNJrKd6LcATycPRmBPA');

        if (isDevMode()) {
            console.log(data);
        }

        return data;
    });

};