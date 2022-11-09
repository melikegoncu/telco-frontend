import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AppStoreState } from 'src/app/store/app.state';
import { Catalog } from 'src/app/model/catalog';
import { CatalogService } from 'src/app/services/catalog.service';
import { Observable } from 'rxjs';
import { Services } from 'src/app/model/services';
import { ServicesService } from 'src/app/services/services.service';
import { Store } from '@ngrx/store';
import { setCatalogToRegister } from 'src/app/store/customerToRegister/customerToRegister.actions';

@Component({
  templateUrl: './assign-catalog.component.html',
  styleUrls: ['./assign-catalog.component.css']
})
export class AssignCatalogComponent implements OnInit {
  catalogRegisterModel$ !:Observable<Catalog | null>
  catalog !: Catalog[];
  selectedCatalog !: Catalog;
  // service !: Services[]
  
  // catalogForm !: FormGroup
  
  constructor(private store : Store<AppStoreState>, private catalogService : CatalogService, private serviceService:ServicesService) {
    this.catalogRegisterModel$ = this.store.select((s)=> s.customerToRegister.catalog )
   }

  ngOnInit(): void {
    this.getAllCatalog()
  }

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
    this.store.dispatch(
      setCatalogToRegister({ catalogRegisterModel: this.selectedCatalog })
    );
  }

}
