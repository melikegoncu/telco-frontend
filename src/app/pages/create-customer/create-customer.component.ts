import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CorporateCustomer } from 'src/app/model/corporateCustomer';
import { CorporateCustomerService } from 'src/app/services/corporate-customer.service';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { IndividualCustomer } from 'src/app/model/individualCustomer';
import { IndividualCustomerService } from 'src/app/services/individual-customer.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  [x: string]: any;
  customers !: Customer;
  individualCustomers !: IndividualCustomer;
  corporateCustomers !: CorporateCustomer;
  // createCustomerForm !: FormGroup;
  createIndividualCustomer!: FormGroup;
  createCorporateCustomer!: FormGroup;
  selectCustomerType !: boolean;
  error : string = '';
  
  
 


  constructor(private customerService : CustomerService,private individualService: IndividualCustomerService,
    private corporateService: CorporateCustomerService, private formBuilder : FormBuilder ) { }

  ngOnInit(): void {
    this.createIndividualCustomerForm();
    this.createCorporateCustomerForm();
  }

  changeCustomerType(type: boolean){
    this.selectCustomerType=type;
  }


  createIndividualCustomerForm(){
    this.createIndividualCustomer = this.formBuilder.group({
      customerId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationalIdentity: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    });
  }

  createCorporateCustomerForm(){
    this.createCorporateCustomer = this.formBuilder.group({
      customerId: ['', Validators.required],
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
    const responseCustomer=this.addCustomer();
    
    const registeredIndividual : IndividualCustomer={
      ...this.createIndividualCustomer.value,
      customerId : responseCustomer
    };

    this.individualService.add(registeredIndividual).subscribe({
      next:(response) => {
        console.info(response.id);
      },
      error: (err) =>{
        console.log(err);
        this.error= err.statusText;
      },
      complete:() =>{
        if(this.error) this.error='';
      },
    });
    
    // const response = this.individualService.add(this.individualCustomers).subscribe((response) => { 
    //   this.individualCustomers = response;
    // }); 
    // this.individualCustomers.customerId == this.customers.id
  }


  addCorpoCustomer() {
    const response = this.corporateService.add(this.corporateCustomers).subscribe((response) => { 
      this.corporateCustomers = response;
    }); 
    this.corporateCustomers.customerId == this.customers.id
  }


}
