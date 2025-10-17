import { Component } from '@angular/core';
import AboutDataComponent from '@components/wall-data/wall-data.component';


@Component({
    selector: 'app-wall',
    standalone: true,
    imports: [AboutDataComponent],
    template: ` <app-wall-data /> `
})
export default class WallComponent { }