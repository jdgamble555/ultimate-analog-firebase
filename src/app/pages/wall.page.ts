import { Component } from '@angular/core';
import { AboutDataComponent } from '@components/about-data/about-data.component';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [AboutDataComponent],
    template: ` <app-about-data /> `
})
export default class AboutComponent { }