import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/model/loginModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  error: string='';
  constructor(private router:Router,private formBuilder:FormBuilder, private loginServiceService:LoginServiceService, private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      userName:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value); //form datasını login nesnesine bağlıyoruz(object.assing).javascript herşey fonksiyondur, class yoktur class gibi davranna fonksiyonlar vardır.boş bir obje oluşturup virgülden sonrasını onun içine assing etmiş oluyoruz.

      const loginModel : LoginModel={
        ...this.loginForm.value
      };
      this.loginServiceService.add(loginModel).subscribe({
        next:(response) => {
          //this.localStorageService.saveData(response);
          console.log(JSON.stringify(response).split('"')[5]);
          this.localStorageService.saveData("token",JSON.stringify(JSON.stringify(response).split('"')[5]));
          this.router.navigateByUrl("/services");
        },
        error: (err) =>{
          console.log(err);
          this.error= err.statusText;
        },
        complete:() =>{
          if(this.error) this.error='';
          // this.categoryAddForm.reset();
          // this.getCategories();
        },
      })
    }
  }

}