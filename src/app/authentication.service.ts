import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated = false;

  setIsAuthenticated(authenticated: boolean): void {
    this.isAuthenticated = authenticated;

    // set a copy in session storage so we don't get Unauthorized on a page refresh
    sessionStorage.setItem('authenticated', authenticated ? 'true' : 'false');
  }

  getIsAuthenticated(): boolean {
    const authenticated = sessionStorage.getItem('authenticated');

    return this.isAuthenticated || authenticated === 'true';
  }
}
