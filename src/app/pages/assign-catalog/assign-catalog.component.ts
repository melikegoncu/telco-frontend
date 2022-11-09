import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AppStoreState } from 'src/app/store/app.state';
import { Catalog } from 'src/app/model/catalog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setCatalogToRegister } from 'src/app/store/customerToRegister/customerToRegister.actions';

@Component({
  templateUrl: './assign-catalog.component.html',
  styleUrls: ['./assign-catalog.component.css']
})
export class AssignCatalogComponent implements OnInit {
  catalogRegisterModel$ !:Observable<Catalog | null>
  catalog !: Catalog;
  // catalogForm !: FormGroup
  
  constructor(private store : Store<AppStoreState>) {
    this.catalogRegisterModel$ = this.store.select((s)=> s.customerToRegister.catalog )
   }

  ngOnInit(): void {

  }

  checkboxForm(){
    // this.catalogForm = this.formGroup;
    this.saveState();
  }

  saveState() {
    this.store.dispatch(
      setCatalogToRegister({ catalogRegisterModel: this.catalog })
    );
  }

}
