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
  
  
  // createCustomerForm !: FormGroup;
  customer!:Customer | null;
  individualCustomer!:IndividualCustomer | null;
  corporateCustomer!:CorporateCustomer | null;
  createIndividualCustomer!: FormGroup;
  createCorporateCustomer!: FormGroup;
  selectCustomerType !: boolean;
  error : string = '';

  constructor(private customerService : CustomerService,private individualService: IndividualCustomerService,
    private corporateService: CorporateCustomerService, private formBuilder : FormBuilder,  ) {
      
      
      
     }

  ngOnInit(): void {
    // this.customerService.customerModel$.subscribe((response) => {
    //   if (response != null) this.customer = response;
      // this.addCustomer();
    // });
    // this.individualService.individualCustomerModel$.subscribe((response) => {
    //   if (response != null) this.individualCustomer = response;
    //   this.createIndividualCustomerForm();
    // });
    // this.corporateService.corporateCustomerModel$.subscribe((response) => {
    //   if (response != null) this.corporateCustomer = response;
    //   this.createCorporateCustomerForm();
    // });
    
    this.createIndividualCustomerForm();
    this.createCorporateCustomerForm();
  }

  fetchData(){
    this.individualService.individualCustomerModel$.subscribe((response)=>{
      this.individualCustomer = response;
    })
    this.corporateService.corporateCustomerModel$.subscribe((response)=>{
      this.corporateCustomer = response;
    })
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

  
  addIndivCustomer() { 
    this.selectCustomerType = true ;
    if (!this.createIndividualCustomer.valid) return;
    // const responseCustomer=this.addCustomer();

    this.individualService.saveToStore(this.createIndividualCustomer.value)
    
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
    this.selectCustomerType = false ;
    if (!this.createCorporateCustomer.valid) return;
    // const responseCustomer=this.addCustomer();

    this.corporateService.saveToStore(this.createCorporateCustomer.value)
  //   const response = this.corporateService.add(this.corporateCustomers).subscribe((response) => { 
  //     this.corporateCustomers = response;
  //   }); 
  //   this.corporateCustomers.customerId == this.customers.id
  }


}
