import { Customer } from '../model/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

    getByIdCustomer(id: number): Observable<void> {
      return this.httpClient.get<void>(`${this.controllerUrl}?id${id}`);
    }

    add(customer : Customer): Observable<Customer> {
      return this.httpClient.post<Customer>(this.controllerUrl, customer);
    }
}
