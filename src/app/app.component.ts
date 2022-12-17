import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cont_ui';
  menuOpt1 = ""

  constructor(private router: Router) {
  }
  ngOnInit(): void {}

  logout() {

    localStorage.removeItem('user');
    this.router.navigate(['/SignIn']);

  }

  openYourProfile() {
    this.router.navigate(['dashboard']);
  }

  getProfilePic() {
    return JSON.parse(localStorage.getItem('user')).profilePicture;
  }

  isUserLoggedIn = () => localStorage.getItem('user');
  
  getOpt1 = () => `Logged in as ${JSON.parse(localStorage.getItem('user')).userName}`;
}
