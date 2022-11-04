import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../model/loginModel';
import { TokenResponseModel } from '../model/tokenModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private httpClient:HttpClient, 
    private localStorage: LocalStorageService, 
    private jwtHelper: JwtHelperService) { }

  private controllerUrl= `${environment.apiUrl}/auth`

  login(userLogin: LoginModel): Observable<TokenResponseModel> {
    return this.httpClient.post<TokenResponseModel>(`${this.controllerUrl}/login`,userLogin);
  }

  logout(){
    this.localStorage.removeData('token');
  }

  // değişken olmasını istiyorsam get set koyarım
  get isAuthenticated(): boolean{
    let token= this.localStorage.getData('token');
    if (!token) return false;
    if(this.jwtHelper.isTokenExpired()) return false;
    return true;
  }
}
