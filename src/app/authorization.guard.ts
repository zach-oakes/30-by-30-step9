import {inject} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";

export const authorizationGuard = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.getIsAuthenticated()) {
    return true;
  }

  // If we have not successfully logged in, then redirect to the unauthorized page.
  return router.parseUrl('/unauthorized');
};