import { Component, inject } from '@angular/core';
import { LOGOUT, USER } from '@lib/firebase/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  user = inject(USER);
  logout = inject(LOGOUT);
}
