import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class Schema {
  constructor(private sanitizer: DomSanitizer) {}

  // Build a SafeHtml JSON string for binding in a <script> tag
  setSchema(data: Record<string, unknown>): SafeHtml {
    // Escape "<" so the JSON can’t prematurely close the <script> tag
    const json = JSON.stringify(data).replace(/</g, '\\u003c');
    return this.sanitizer.bypassSecurityTrustHtml(json);
  }
}
