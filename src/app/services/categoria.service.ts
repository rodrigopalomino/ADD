import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  myApi: string = 'http://localhost:3000/';
  myApp: string = 'categoria';

  constructor(private http: HttpClient) {}

  getCategoriasGenerales(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.myApi}${this.myApp}/null`);
  }

  getCategorias(params: number): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.myApi}${this.myApp}/${params}`);
  }
}
