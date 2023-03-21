import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthorizationRoutesService } from '../services/authorization-routes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedRoutesGuard implements CanActivate {
  token: any;

  constructor(private router: Router, private authorizationRoutesService: AuthorizationRoutesService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  const usuarioEstaLogado = this.authorizationRoutesService.statusLogin();
  if (usuarioEstaLogado){
    return true
  }else {
    this.router.navigate(['login']);

    return false;
  }
  }
}
