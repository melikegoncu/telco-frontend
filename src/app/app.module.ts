import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreState } from './store/app.state';
import { AssignCatalogComponent } from './pages/assign-catalog/assign-catalog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { CreateFakeArrayPipe } from './pipes/create-fake-array.pipe';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail.component';
// import { CustomerToregisterReducer } from './store/customerToRegister'
import { FilterPipe } from './pipes/filter.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { JwtModule } from "@auth0/angular-jwt";
import { ListViewComponent } from './components/list-view/list-view.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { SplitPipe } from './pipes/split.pipe';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { SummaryComponent } from './pages/summary/summary.component';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { appReducers } from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    CreateFakeArrayPipe,
    SplitPipe,
    LoginComponent,
    HomepageComponent,
    LoadingOverlayComponent,
    NavbarComponent,
    FooterComponent,
    CustomerComponent,
    FilterPipe,
    CustomerDetailComponent,
    CreateCustomerComponent,
    AssignCatalogComponent,
    SummaryComponent,
  ],
  
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,//ekledik
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {return localStorage.getItem('token');}
      },
    }),
    StoreModule.forRoot<AppStoreState>(appReducers),
    StoreDevtoolsModule.instrument({
      autoPause: false,
    }),
  ],

  // Injectable classlar??m?? providers 'ta tan??mlar??m
  providers: [{provide: HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},{provide: HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
