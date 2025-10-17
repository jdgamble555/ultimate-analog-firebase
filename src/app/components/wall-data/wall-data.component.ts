import { Component, inject, isDevMode, resource } from '@angular/core';
import { FIRESTORE_GET_DOC } from '@lib/firebase/firebase.service';
import { FirebaseError } from 'firebase/app';


export type WallDoc = {
    name: string;
    description: string;
};


@Component({
    selector: 'app-wall-data',
    standalone: true,
    imports: [],
    template: `
    @if (wall.isLoading()) {
    <div class="flex items-center justify-center my-5">
        <h1 class="text-3xl font-semibold">Loading...</h1>
    </div>
    } @else if (wall.status() === 'resolved') {
    <div class="flex items-center justify-center my-5">
        <div class="border w-[400px] p-5 flex flex-col gap-3">
            <h1 class="text-3xl font-semibold">{{ wall.value()?.name }}</h1>
            <p>{{ wall.value()?.description }}</p>
        </div>
    </div>
    } @else if (wall.status() === 'error') {
    <div class="flex items-center justify-center my-5">
        @if (wall.error()?.message === 'permission-denied') {
            <h1 class="text-3xl font-semibold">You must be logged in to view this!</h1>
        } @else {
            <h1 class="text-3xl font-semibold">An error occurred: {{ wall.error()?.message }}</h1>
        }
    </div>
    } @else {
    <div class="flex items-center justify-center my-5">
        <h1 class="text-3xl font-semibold">You must be logged in to view this!</h1>
    </div>
    }
    `
})
export default class WallDataComponent {

    getDoc = inject(FIRESTORE_GET_DOC);

    wall = resource({
        
        loader: async () => {

            try {
                const data = await this.getDoc<WallDoc>('/secret/tJKWxu0ls6R0RyH1Atpb');

                if (isDevMode()) {
                    console.log(data);
                }

                return data;

            } catch (error) {

                if (error instanceof FirebaseError) {

                    if (error.code === 'permission-denied') {
                        throw new Error(error.code);
                    }
                }

                throw error;
            }
        }
    });
}
