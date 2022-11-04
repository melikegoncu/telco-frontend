import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
    // private httpClient:HttpClient;
    private controllerUrl = `${environment.apiUrl}/customers`;

    constructor(private httpClient:HttpClient) {
      // this.httpClient=httpClient;
     }
  
    getCustomer(): Observable<Customer[]> {
      //get metodu Get Http istediğini hazırlıyor.
      return this.httpClient.get<Customer[]>(this.controllerUrl);
    }
}
