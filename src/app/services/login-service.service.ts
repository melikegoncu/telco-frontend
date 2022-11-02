import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../model/loginModel';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = 'http://localhost:3000/auth/login';

  add(userLogin: LoginModel): Observable<LoginModel> {
    return this.httpClient.post<any>(this.apiUrl,userLogin);
  }
}
