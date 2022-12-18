import { AppStoreState } from '../store/app.state';
import { HttpClient } from '@angular/common/http';
import { IndividualCustomer } from '../model/individualCustomer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { setIndivCustomerToRegister } from '../store/customerToRegister/customerToRegister.actions';

@Injectable({
  providedIn: 'root'
})
export class IndividualCustomerService {
  individualCustomerModel$ !: Observable<IndividualCustomer | null>;

  private controllerUrl = `${environment.apiUrl}/individualCustomers`;

  constructor(private httpClient:HttpClient,private store: Store<AppStoreState>) {
    this.individualCustomerModel$ = this.store.select((s)=> s.customerToRegister.individualCustomer)
  }

  getIndvCustomer(): Observable<IndividualCustomer[]> {
    return this.httpClient.get<IndividualCustomer[]>(this.controllerUrl);
  }

  getByIdIndvCustomer(customerId: number): Observable<IndividualCustomer[]> {
    return this.httpClient.get<IndividualCustomer[]>(`${this.controllerUrl}?customerId=${customerId}`);
  }

  add(indivCustomer : IndividualCustomer): Observable<IndividualCustomer> {
    return this.httpClient.post<IndividualCustomer>(this.controllerUrl, indivCustomer);
  }

  saveToStore(indivCustomer:IndividualCustomer){
    this.store.dispatch(
      setIndivCustomerToRegister({ individualCustomerModel: indivCustomer })
    );
  }
}