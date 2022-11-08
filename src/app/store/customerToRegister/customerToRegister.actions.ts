import { createAction, props } from "@ngrx/store";

import { Action } from "rxjs/internal/scheduler/Action";
import { Customer } from "src/app/model/customer";
import { CustomerToRegisterState } from "./customerToRegister.state";
import { PropertyWrite } from "@angular/compiler";
import { TokenUserModel } from "src/app/model/tokenUserModel";

export const setCustomerToRegister = createAction(
    '[CustomerToRegister] Set Customer To Register Model', //: Benzersiz key verdik. Bu action type/id olucak.
    props<{ customerToRegister: CustomerToRegisterState }>() //: inline bir interface yazdık.
//     //: Bu interface'in içindeki property'ler, action'ın içindeki property'ler/payload olucak.
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

