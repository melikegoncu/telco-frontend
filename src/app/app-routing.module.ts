import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListViewComponent } from './components/list-view/list-view.component';
import { LoginGuard } from './guards/login.guard';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'services', component: HomepageComponent, canActivate:[LoginGuard]},
  {path:'login', component: LoginComponent},
  {path:'customers', component: CustomerComponent, canActivate:[LoginGuard]},
  {path: 'customerDetail/:id', component: CustomerDetailComponent, canActivate:[LoginGuard]},
  // {path: 'createCustomer', component: CustomerDetailComponent, canActivate:[LoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
