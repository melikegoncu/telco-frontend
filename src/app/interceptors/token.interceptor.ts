import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private localStorageService:LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>, 
    next: HttpHandler): 
    Observable<HttpEvent<unknown>> {
      let token = this.localStorageService.getData("token");
      let newRequest = request;
      if (token!=null) {
        newRequest = request.clone({
        // headers: request.headers.set("Authorization","Bearer " + token)
        setHeaders : {"Authorization": `Bearer ${token}`}
      })
      console.log(JSON.stringify(newRequest.headers));
      }else{
        console.log('bu çalışmıyo');
      }
      
      return next.handle(newRequest);
    }
}
