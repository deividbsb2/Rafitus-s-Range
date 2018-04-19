import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Category } from './category.model';
import { RANGE_API } from '../app.api';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${RANGE_API}/categories`);
  }

  post(category: Category): Observable<Category> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<Category>(`${RANGE_API}/categories`,
      category,
      { headers: headers });
  }

  put(category: Category): Observable<Category> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put<Category>(`${RANGE_API}/categories/${category.id}`,
      category,
      { headers: headers });
  }

  delete(category: Category): Observable<Category> {
    return this.http.delete<Category>(`${RANGE_API}/categories/${category.id}`);
  }

  search(search?: string): Observable<Category[]> {
    let params: HttpParams;
    if (search) {
      params = new HttpParams().append('q', search);
    }
    return this.http.get<Category[]>(`${RANGE_API}/categories`, { params: params });
  }
}
