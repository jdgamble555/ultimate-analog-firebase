import { Component, inject } from '@angular/core';
import { LOGOUT, USER } from '@lib/firebase/auth.service';

@Component({
  selector: 'app-about-data',
  standalone: true,
  imports: [],
  templateUrl: './about-data.component.html'
})
export class AboutDataComponent {
  user = inject(USER);
  logout = inject(LOGOUT);
}
