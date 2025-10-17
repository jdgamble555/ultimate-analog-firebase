import { Component } from '@angular/core';
import { AboutDoc } from './about-data.resolver';
import { injectResolver } from '@lib/utils';
import { AsyncPipe } from '@angular/common';


@Component({
    selector: 'app-about-data',
    standalone: true,
    imports: [AsyncPipe],
    template: `
    @if (about | async; as data) {
    <div class="flex items-center justify-center my-5">
        <div class="border w-[400px] p-5 flex flex-col gap-3">
            <h1 class="text-3xl font-semibold">{{ data.name }}</h1>
            <p>{{ data.description }}</p>
        </div>
    </div>
    <p class="text-center">
        <a href="https://validator.schema.org/#url=https%3A%2F%2Fultimate-analog-firebase.vercel.app%2Fabout" target="_blank" class="text-blue-600 underline">Validate Schema.org Metadata</a>
    </p>
    }
    `
})
export default class AboutDataComponent {
    about = injectResolver<AboutDoc>('data');
}
