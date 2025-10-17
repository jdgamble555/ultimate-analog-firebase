import { DOCUMENT, Inject, Injectable, Renderer2 } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class Schema {
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  setSchema(data: Record<string, unknown>) {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.renderer.appendChild(this.document.head, script);
  }
}
