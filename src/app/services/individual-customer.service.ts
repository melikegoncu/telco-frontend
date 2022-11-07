import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IndividualCustomer } from '../model/individualCustomer';

@Injectable({
  providedIn: 'root'
})
export class IndividualCustomerService {

  private controllerUrl = `${environment.apiUrl}/individualCustomers`;

  constructor(private httpClient:HttpClient) {
  }

  getIndvCustomer(): Observable<IndividualCustomer[]> {
    return this.httpClient.get<IndividualCustomer[]>(this.controllerUrl);
  }

  getByIdIndvCustomer(customerId: number): Observable<IndividualCustomer[]> {
    return this.httpClient.get<IndividualCustomer[]>(`${this.controllerUrl}?customerId=${customerId}`);
  }
}