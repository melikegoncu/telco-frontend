import { Catalog } from '../model/catalog';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  controllerUrl = `${environment.apiUrl}/catalog`;

  constructor(private httpClient:HttpClient) {
  }

  get(): Observable<Catalog[]> {
    return this.httpClient.get<Catalog[]>(this.controllerUrl);
  }

  add(catalog: Catalog): Observable<Catalog> {
    return this.httpClient.post<Catalog>(this.controllerUrl, catalog);
  }

  update(catalog: Catalog): Observable<Catalog> {
    return this.httpClient.put<Catalog>(`${this.controllerUrl}/${catalog.id}`,catalog);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.controllerUrl}/${id}`);
  }
}
