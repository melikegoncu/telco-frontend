import { CorporateCustomer } from '../model/corporateCustomer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorporateCustomerService {

  private controllerUrl = `${environment.apiUrl}/corporateCustomers`;

  constructor(private httpClient:HttpClient) {
    // this.httpClient=httpClient;
   }

  getCorporateCustomer(): Observable<CorporateCustomer[]> {
    //get metodu Get Http istediğini hazırlıyor.
    return this.httpClient.get<CorporateCustomer[]>(this.controllerUrl);
  }

  getByIdCorporateCustomer(customerId: number): Observable<CorporateCustomer[]> {
    return this.httpClient.get<CorporateCustomer[]>(`${this.controllerUrl}?customerId=${customerId}`);
  }

  add(corpoCustomer: CorporateCustomer): Observable<CorporateCustomer> {
    return this.httpClient.post<CorporateCustomer>(this.controllerUrl, corpoCustomer);
  }
}
