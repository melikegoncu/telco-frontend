import { Component, OnInit } from '@angular/core';

import { AppStoreState } from 'src/app/store/app.state';
import { Catalog } from 'src/app/model/catalog';
import { CatalogService } from 'src/app/services/catalog.service';
import { CorporateCustomer } from 'src/app/model/corporateCustomer';
import { CorporateCustomerService } from 'src/app/services/corporate-customer.service';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { IndividualCustomer } from 'src/app/model/individualCustomer';
import { IndividualCustomerService } from 'src/app/services/individual-customer.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  customerType!:boolean;
  customer!:Customer | null;
  individualCustomer!:any;
  corporateCustomer!:any;
  catalog!:any;
  state!: Observable<AppStoreState>;
  error:string='';  

  constructor(private customerService : CustomerService,
    private individualService:IndividualCustomerService,
    private corporateService:CorporateCustomerService,
    private catalogService:CatalogService,
    private invoiceService:InvoicesService,
    private router:Router,
    private store: Store<AppStoreState>) {
      this.corporateService.corporateCustomerModel$ = this.store.select((s)=> s.customerToRegister.corporateCustomer),
      this.individualService.individualCustomerModel$ = this.store.select((s)=> s.customerToRegister.individualCustomer),
      this.catalogService.catalogRegisterModel$ = this.store.select((s)=> s.customerToRegister.catalog)  
     }

  ngOnInit(): void {
    this.getDataFromStore();
    this.individualService.individualCustomerModel$.subscribe(response=>{
       console.log("Statedeki customer: " , response );
    })
  }

  getDataFromStore(){
    this.individualService.individualCustomerModel$.subscribe((response)=>{
      if(response){
        this.individualCustomer = response;
        this.customerType = true;
      }
    }) 
    this.corporateService.corporateCustomerModel$.subscribe((response)=>{
      if(response){
        this.corporateCustomer = response;
        this.customerType = false;
      }
    })
    this.catalogService.catalogRegisterModel$.subscribe((response)=>{
      this.catalog = response;
    })
    console.log(this.customerType + "burası çalıştı")
  }
  
 // addCustomer():Observable<Customer>| void{
    // const response = this.customerService.add(this.customers).subscribe((response) => { 
    //   this.customers = response;
    // }); 

    // const registeredCustomer : Customer={
    //   id:null,
    //   customerNumber: Math.floor((Math.random() * 99999999) + 10000000),
      // ...this.createIndividualCustomer.value
  //   };
  //   this.customerService.add(registeredCustomer).subscribe({
  //     next:(response) => {
  //       console.info(response.id);
  //       return response;
  //     },
  //     error: (err) =>{
  //       console.log(err);
  //       this.error= err.statusText;
  //     },
  //     complete:() =>{
  //       if(this.error) this.error='';
  //     },
  //   });
  // }


  //---------v
  addIndivCustomer() { 
    this.customerType = true;
    const newCustomer: Customer = {
      id : null,
      customerNumber: Math.floor(10000000 + Math.random() * 90000000)
    }
    this.customerService.add(newCustomer).subscribe({  
      next: (response) => {
          const addToIndividual = {
            id:response.id,
            customerId:response.id,
            ...this.individualCustomer,
          };
          console.log(addToIndividual);

          this.individualService.add(addToIndividual).subscribe({
            next:() => {
              this.catalogService.add(this.catalog)
            },
            complete:() =>{
              this.router.navigateByUrl('/customers')
            }
          });
  }
    });
      }
//----------vn
  addCorpoCustomer() {
    this.customerType = false;
    const newCustomer: Customer = {
      id : null,
      customerNumber: Math.floor(10000000 + Math.random() * 90000000)
    }
    this.customerService.add(newCustomer).subscribe({  
      next: (response) => {
          const addToCorporate = {
            id:response.id,
            customerId:response.id,
            ...this.corporateCustomer,
          };
          console.log(addToCorporate);

          this.corporateService.add(addToCorporate).subscribe({
            next:() => {
              this.catalogService.add(this.catalog)
            },
            complete:() =>{
              this.customerService.getCustomer();
              this.router.navigateByUrl('/customers')
              
            }
          });
  }
    });
    
//////-------n
    
    // const responseCustomer=this.addCustomer();
  //   const response = this.corporateService.add(this.corporateCustomers).subscribe((response) => { 
  //     this.corporateCustomers = response;
  //   }); 
  //   this.corporateCustomers.customerId == this.customers.id
 
  //--------v
}
//------n

 addCatalog(){
  // const catalog : Catalog={
  //   ...this.categoryAddForm.value
  // };

  this.catalogService.add(this.catalog).subscribe({
    next:(response) => {
      console.info(response);
    },
    complete:() =>{
      if(this.error) this.error='';
    },
  });
 }

}
