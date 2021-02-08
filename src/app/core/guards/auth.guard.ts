import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token === null) {
      this.router.navigate(['login']).then();
      return false;
    } else if (helper.isTokenExpired(token)) {
      this.router.navigate(['login']).then();
      return false;
    } else if (!helper.isTokenExpired(token)) {
      return true;
    }
    return true;
  }
}
