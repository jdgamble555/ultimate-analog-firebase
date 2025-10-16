import { Component, inject } from '@angular/core';
import { USER } from '@lib/firebase/auth.service';
import { FIRESTORE_GET_DOC } from '@lib/firebase/firebase.service';

@Component({
  selector: 'app-about-data',
  standalone: true,
  imports: [],
  templateUrl: './about-data.component.html'
})
export class AboutDataComponent {
  user = inject(USER);
  getDoc = inject(FIRESTORE_GET_DOC);

  async getAboutPage() {
    return await this.getDoc('/about/ZlNJrKd6LcATycPRmBPA');
  }
}
