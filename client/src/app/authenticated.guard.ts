import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authenticatedGuard: CanActivateFn = (route, state) => {
  if(!window.sessionStorage.getItem('token')) {
    inject(Router).navigate(['/']);
    return false;
  }
  return true;
};