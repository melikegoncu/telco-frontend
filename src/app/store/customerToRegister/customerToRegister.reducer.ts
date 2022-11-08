
// import * as UserActions from './customerToRegister.actions';
// function userReducer(state = AppState, action: UserActions) {
//   switch (action.type) {
//     case ADD_USER:
//       return [
//         ...state,
//         {
//           text: action.text
//         }
//       ]
//     default:
//       return state
//   }
// }

import { CustomerToRegisterState, initialCustomerToRegisterState } from "./customerToRegister.state";
import { createReducer, on } from "@ngrx/store";

import { setCustomerToRegister } from "./customerToRegister.actions";

export const customerToRegisterReducer = createReducer<CustomerToRegisterState>(
    initialCustomerToRegisterState,
    on(
        setCustomerToRegister, //: yakalamak istediğim action
      (currentState, action) => {
        //: yakaladığım action ile ne yapacağımı belirliyorum. store'taki ilgili state'i güncelliyorum
        //: store'daki state'i güncellemek için referansının değişmesi gerekir.
        //! currentState.tokenUserModel = action.tokenUserModel;
        //: Çünkü componentler state'lerin stack adreslerini izliyorlar. Referans değişmediği sürece, componentler state'i günellenmiş olarak görmeyecektir.
        return {
          ...currentState,
          customerToRegister: action.customerToRegister,
        };
      }
    ),
    
    // on(deleteTokenUserModel, (currentState) => {
    //   return {
    //     ...currentState,
    //     tokenUserModel: null, // 0x1234 (hexadecimal) -> 0
    //   };
    // })

    
    // on(addRole, (state, action) => {
    //! currentState.roles.push(action.role);
    // return { ...currentState, roles: [...currentState.roles, action.role] };
    // }),
  );
