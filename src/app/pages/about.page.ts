import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import AboutDataComponent from '@components/about-data/about-data.component';
import { aboutDataResolver } from '@components/about-data/about-data.resolver';

export const routeMeta: RouteMeta = {
  resolve: { data: aboutDataResolver }
};

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [AboutDataComponent],
    template: ` <app-about-data /> `
})
export default class AboutComponent { }