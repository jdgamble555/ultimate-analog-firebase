import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class Schema {
    constructor(@Inject(DOCUMENT) private document: Document) { }

    /**
     * Adds or updates a JSON-LD script tag in <head>, similar to Title/Meta.
     */
    setSchema(data: Record<string, unknown>, id = 'jsonld-schema'): void {
        const json = JSON.stringify(data).replace(/</g, '\\u003c');

        // Avoid duplicates
        let script = this.document.head.querySelector<HTMLScriptElement>(
            `script#${id}[type="application/ld+json"]`
        );

        if (!script) {
            script = this.document.createElement('script');
            script.id = id;
            script.type = 'application/ld+json';
            this.document.head.appendChild(script);
        }

        script.textContent = json;
    }

    /** Optional cleanup */
    removeSchema(id = 'jsonld-schema'): void {
        const existing = this.document.getElementById(id);
        if (existing) {
            this.document.head.removeChild(existing);
        }
    }
}


