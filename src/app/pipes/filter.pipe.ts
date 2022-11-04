import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../model/customer';
import { IndividualCustomer } from '../model/individualCustomer';
import { CorporateCustomer } from 'src/app/model/corporateCustomer';



@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }
  // transform(value: IndividualCustomer[]| CorporateCustomer[], filterText: string):IndividualCustomer[] | CorporateCustomer[] {
  //   {
  //     filterText = filterText?filterText.toLocaleLowerCase():"";
  //     return filterText?value
  //     .filter((p:IndividualCustomer, c:CorporateCustomer)=>p.firstName.toLocaleLowerCase.indexOf(filterText)!==-1)
  //     :value;
  // }
  // }
}
