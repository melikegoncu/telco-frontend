import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  // ?: null olabilir demek
  // !: null olmayacak, bu prop'u kullanmadan önce atama işlemini gerçekleştireceğiz demek.
  categories !: Category[];

  categoryAddForm !: FormGroup;

  categoryIdToDelete !: number ;
  categoryIdToUpdate !: number ;

  error :string ='';

  changeForm: boolean= false;

  //IoC Container
  //Dependency Injection
  constructor(private categoriesService:CategoriesService, private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    this.getCategories();
    this.createCategoryAddForm();
  }
  createCategoryAddForm() {
    this.categoryAddForm = this.formBuilder.group({
      name: ['',Validators.required],
      description:''//def values
    })
  }

  changeFormFunc(id:number){
    this.changeForm=!this.changeForm;
    this.categoryIdToUpdate=id;
  }

  getCategories() {
    // Object tipi henüz belli olmayan referans tipi. Referans tiplerin en temel sınıfı.
    const response = this.categoriesService.getCategories().subscribe((response) => { 
      //Observer Design Pattern
      //asenkronu senkron olarak çalıştırabilmek için observer design pattern ini kullanır Angular
      this.categories = response;
    });
  }

  add() : void {
    if (!this.categoryAddForm.valid) {
      this.error= 'form is invalid';
      return;
    }
    console.log(this.categoryAddForm);
    console.log(this.categoryAddForm.valid);

    //spread operator
    const category : Category={
      ...this.categoryAddForm.value
    };

    this.categoriesService.add(category).subscribe({
      next:(response) => {
        console.info(response.id);
      },
      error: (err) =>{
        console.log(err);
        this.error= err.statusText;
      },
      complete:() =>{
        if(this.error) this.error='';
        this.categoryAddForm.reset();
        this.getCategories();
      },
    });
  }

  update(): void{
    if (!this.categoryAddForm.valid) {
      this.error= 'form is invalid';
      return;
    }
    const category : Category={
      ...this.categoryAddForm.value,
      id: this.categoryIdToUpdate
    };
    this.categoriesService.update(category).subscribe({
      next:(response) => {
        console.info(response.id);
      },
      error: (err) =>{
        console.log(err);
        this.error= err.statusText;
      },
      complete:() =>{
        if(this.error) this.error='';
        this.categoryAddForm.reset();
        this.getCategories();
        this.changeFormFunc(0);
      },
    });
  }

  delete(){
    this.categoriesService.delete(this.categoryIdToDelete).subscribe();
    this.getCategories();
  }
}
