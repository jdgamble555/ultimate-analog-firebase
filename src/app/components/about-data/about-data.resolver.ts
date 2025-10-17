import { inject, isDevMode } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ResolveFn } from '@angular/router';
import { FIRESTORE_GET_DOC } from '@lib/firebase/firebase.service';
import { useAsyncTransferState } from '@lib/utils';
import { Schema } from './schema.service';

export type AboutDoc = {
    name: string;
    description: string;
};

export const aboutDataResolver: ResolveFn<AboutDoc> = async () => {

    return useAsyncTransferState('about', async () => {

        const getDoc = inject(FIRESTORE_GET_DOC);

        const meta = inject(Meta);
        const title = inject(Title);
        const schema = inject(Schema);

        const {
            data,
            error
        } = await getDoc<AboutDoc>('/about/ZlNJrKd6LcATycPRmBPA');

        if (error) {
            throw error;
        }

        if (!data) {
            throw new Error('No data found');
        }

        title.setTitle(data.name);
        meta.updateTag({
            name: 'description',
            content: data.description
        });
        schema.setSchema({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: data.name,
            description: data.description
        });

        if (isDevMode()) {
            console.log(data);
        }

        return data;
    });

};