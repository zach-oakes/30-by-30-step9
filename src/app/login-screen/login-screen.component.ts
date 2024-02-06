import { Component } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent {
  hidePassword = true;
  username = '';
  password = '';
  loginFailed = false;

  constructor(private userService: UserService,
              private authService: AuthenticationService,
              private router: Router) {}

  login() {
    this.loginFailed = false;

    const user = this.userService.findUserAccount({
      username: this.username,
      password: this.password,
    });

    // If user does not exist that means they haven't created their Account yet. Fail the login.
    if (!user) {
      this.loginFailed = true
      return;
    }

    this.authService.setIsAuthenticated(true);
    this.userService.setLoggedInUser(user);
    this.router.navigate(['/dashboard'])
  }

  get isDisabled(): boolean {
    return this.username === '' ||
        this.username === undefined ||
        this.password === '' ||
        this.password === undefined;
  }
}

