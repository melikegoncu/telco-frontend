import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { CreateFakeArrayPipe } from './pipes/create-fake-array.pipe';
import { SplitPipe } from './pipes/split.pipe';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from "@auth0/angular-jwt";

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
  ],
  
  imports: [
    BrowserModule,
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
    })
  ],

  // Injectable classlarımı providers 'ta tanımlarım
  providers: [{provide: HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},{provide: HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
