import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private loginService: LoginServiceService, private router: Router, private toastr: ToastrService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.loginService.isAuthenticated)
        return true;
      this.toastr.error('Bu sayfaya erişmek için giriş yapmalısınız.');
      this.router.navigateByUrl('/login');
      return false;
  }
  
}
