import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AppStoreState } from 'src/app/store/app.state';
import { Catalog } from 'src/app/model/catalog';
import { CatalogService } from 'src/app/services/catalog.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Services } from 'src/app/model/services';
import { ServicesService } from 'src/app/services/services.service';
import { Store } from '@ngrx/store';
import { setCatalogToRegister } from 'src/app/store/customerToRegister/customerToRegister.actions';

@Component({
  templateUrl: './assign-catalog.component.html',
  styleUrls: ['./assign-catalog.component.css']
})
export class AssignCatalogComponent implements OnInit {
  
  catalog !: Catalog[];
  selectedCatalog !: Catalog;
  // service !: Services[]
  
  // catalogForm !: FormGroup
  
  constructor(private catalogService : CatalogService, private serviceService:ServicesService, private router:Router) {
    
   }

  ngOnInit(): void {
    this.getAllCatalog()
  }

  // fetchData(){
  //   this.catalogService.catalogRegisterModel$.subscribe((response)=>{
  //     this.selectedCatalog = response;
  //   })
  // }

  selectCatalog(catalog:Catalog){
     this.selectedCatalog = catalog
     this.saveState();
  }

  getAllCatalog() {
    // const response = this.serviceService.get().subscribe((response)=>{
    //   this.service = response;
    // })
    const response = this.catalogService.get().subscribe((response) => { 
      this.catalog = response;
      console.log(response)
    }); 
  }


  checkboxForm(){
    // this.catalogForm = this.formGroup;
    this.saveState();
  }

  saveState() {
    this.catalogService.saveToStore(this.selectedCatalog)
    // this.store.dispatch(
    //   setCatalogToRegister({ catalogRegisterModel: this.selectedCatalog })
    // );
  }

  goNext(){
    this.router.navigateByUrl('/summary')
  }

}
