import { CorporateCustomer } from "src/app/model/corporateCustomer";
import { Customer } from "src/app/model/customer";
import { IndividualCustomer } from "src/app/model/individualCustomer";

export interface CustomerToRegisterState {
    customer:Customer | null;
    individualCustomer:IndividualCustomer | null;
    corporateCustomer:CorporateCustomer | null;

}

export const initialCustomerToRegisterState: CustomerToRegisterState = {
    customer: null,
    individualCustomer:null,
    corporateCustomer: null,
  };