import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  // private httpClient:HttpClient;
  controllerUrl = `${environment.apiUrl}/categories`;

  constructor(private httpClient:HttpClient) {
    // this.httpClient=httpClient;
   }

  getCategories(): Observable<Category[]> {
    //get metodu Get Http istediğini hazırlıyor.
    return this.httpClient.get<Category[]>(this.controllerUrl);
  }

  add(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.controllerUrl, category);
  }

  update(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(`${this.controllerUrl}/${category.id}`,category);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.controllerUrl}/${id}`);
  }
}
