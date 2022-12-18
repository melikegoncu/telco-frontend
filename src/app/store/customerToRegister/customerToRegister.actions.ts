import { createAction, props } from "@ngrx/store";

import { Action } from "rxjs/internal/scheduler/Action";
import { Catalog } from "src/app/model/catalog";
import { CorporateCustomer } from "src/app/model/corporateCustomer";
import { Customer } from "src/app/model/customer";
import { CustomerToRegisterState } from "./customerToRegister.state";
import { IndividualCustomer } from "src/app/model/individualCustomer";
import { PropertyWrite } from "@angular/compiler";
import { TokenUserModel } from "src/app/model/tokenUserModel";

export const setCustomerToRegister = createAction(
    '[CustomerToRegister] Set Customer To Register Model', //: Benzersiz key verdik. Bu action type/id olucak.
    props<{ customerModel : Customer }>() //: inline bir interface yazdık.
//     //: Bu interface'in içindeki property'ler, action'ın içindeki property'ler/payload olucak.
  );

  export const setIndivCustomerToRegister = createAction(
    '[IndividualCustomerToRegister] Set Individual Customer To Register Model',
    props<{ individualCustomerModel : IndividualCustomer }>() 
  );

  export const setCorpoCustomerToRegister = createAction(
    '[CorporateCustomerToRegister] Set Corporate Customer To Register Model',
    props<{ corporateCustomerModel : CorporateCustomer }>() 
  );

  export const setCatalogToRegister = createAction(
    '[CatalogToRegister] Set Corporate Customer To Register Model',
    props<{ catalogRegisterModel : Catalog }>() 
  );
  
  
// //   export const deleteTokenUserModel = createAction(
// //     '[Auth] Delete Token User Model'
// //   );

// import { Action } from '@ngrx/store';
// export const ADD_USER= '[User] Add_User';
// export class AddUserAction implements Action{
//   readonly type = ADD_USER;
//   constructor( public payload: string) { }
// }export type actions = AddUserAction

