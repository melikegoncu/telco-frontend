import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppStoreState } from 'src/app/store/app.state';
import { CorporateCustomer } from 'src/app/model/corporateCustomer';
import { CorporateCustomerService } from 'src/app/services/corporate-customer.service';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerToRegisterState } from 'src/app/store/customerToRegister/customerToRegister.state';
import { IndividualCustomer } from 'src/app/model/individualCustomer';
import { IndividualCustomerService } from 'src/app/services/individual-customer.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setCorpoCustomerToRegister } from 'src/app/store/customerToRegister/customerToRegister.actions';
import { setCustomerToRegister } from 'src/app/store/customerToRegister/customerToRegister.actions';
import { setIndivCustomerToRegister } from 'src/app/store/customerToRegister/customerToRegister.actions';

@Component({
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  [x: string]: any;
  customerModel$ !: Observable<Customer | null>;;
  individualCustomerModel$ !: Observable<IndividualCustomer | null>;
  corporateCustomerModel$ !: Observable<CorporateCustomer | null>;
  // createCustomerForm !: FormGroup;
  customer!:Customer;
  individualCustomer!:IndividualCustomer;
  corporateCustomer!:CorporateCustomer;
  createIndividualCustomer!: FormGroup;
  createCorporateCustomer!: FormGroup;
  selectCustomerType !: boolean;
  error : string = '';


  
  
 


  constructor(private customerService : CustomerService,private individualService: IndividualCustomerService,
    private corporateService: CorporateCustomerService, private formBuilder : FormBuilder, private store: Store<AppStoreState> ) {
      this.customerModel$ = this.store.select((s)=> s.customerToRegister.customer),
      this.individualCustomerModel$ = this.store.select((s)=> s.customerToRegister.individualCustomer),
      this.corporateCustomerModel$ = this.store.select((s)=> s.customerToRegister.corporateCustomer)
     }

  ngOnInit(): void {
    // this.customerModel$.subscribe((response) => {
    //   if (response != null) this.customer = response;
    //   this.addCustomer();
    // });
    // this.individualCustomerModel$.subscribe((response) => {
    //   if (response != null) this.individualCustomer = response;
    //   this.createIndividualCustomerForm();
    // });
    // this.corporateCustomerModel$.subscribe((response) => {
    //   if (response != null) this.corporateCustomer = response;
    //   this.createCorporateCustomerForm();
    // });
    
    this.createIndividualCustomerForm();
    this.createCorporateCustomerForm();
  }

  changeCustomerType(type: boolean){
    this.selectCustomerType=type;
  }


  createIndividualCustomerForm(){
    this.createIndividualCustomer = this.formBuilder.group({
      // customerId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationalIdentity: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    });
  }

  createCorporateCustomerForm(){
    this.createCorporateCustomer = this.formBuilder.group({
      // customerId: ['', Validators.required],
      companyName: ['', Validators.required],
      taxNumber: ['', [Validators.required,Validators.minLength(8)]]
    });
  }

  addCustomer():Observable<Customer>| void{
    // const response = this.customerService.add(this.customers).subscribe((response) => { 
    //   this.customers = response;
    // }); 


    const registeredCustomer : Customer={
      id:null,
      customerNumber: Math.floor(10000000 + Math.random() * 99999999)
      // ...this.createIndividualCustomer.value
    };

    this.customerService.add(registeredCustomer).subscribe({
      next:(response) => {
        console.info(response.id);
        return response;
      },
      error: (err) =>{
        console.log(err);
        this.error= err.statusText;
      },
      complete:() =>{
        if(this.error) this.error='';
      },
    });
  }

  addIndivCustomer() { 
    if (!this.createIndividualCustomer.valid) return;
    const responseCustomer=this.addCustomer();

    this.store.dispatch(
      setCustomerToRegister({ customerModel: this.createIndividualCustomer.value })
    );
    
    // const registeredIndividual : IndividualCustomer={
    //   ...this.createIndividualCustomer.value,
    //   customerId : responseCustomer
    // };

    // this.individualService.add(registeredIndividual).subscribe({
    //   next:(response) => {
    //     console.info(response.id);
    //   },
    //   error: (err) =>{
    //     console.log(err);
    //     this.error= err.statusText;
    //   },
    //   complete:() =>{
    //     if(this.error) this.error='';
    //   },
    // });
    
    // const response = this.individualService.add(this.individualCustomers).subscribe((response) => { 
    //   this.individualCustomers = response;
    // }); 
    // this.individualCustomers.customerId == this.customers.id
  }


  addCorpoCustomer() {
    if (!this.createCorporateCustomer.valid) return;
    const responseCustomer=this.addCustomer();

    this.store.dispatch(
      setCustomerToRegister({ customerModel: this.createIndividualCustomer.value })
    );
  //   const response = this.corporateService.add(this.corporateCustomers).subscribe((response) => { 
  //     this.corporateCustomers = response;
  //   }); 
  //   this.corporateCustomers.customerId == this.customers.id
  }


}
