import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { RANGE_API } from '../app.api';
import { Type } from './type.model';

@Injectable()
export class TypeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Type[]> {
    return this.http.get<Type[]>(`${RANGE_API}/types`);
  }

  post(type: Type): Observable<Type> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<Type>(`${RANGE_API}/types`,
      type,
      { headers: headers });
  }

  put(type: Type): Observable<Type> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put<Type>(`${RANGE_API}/types/${type.id}`,
      type,
      { headers: headers });
  }

  delete(type: Type): Observable<Type> {
    return this.http.delete<Type>(`${RANGE_API}/types/${type.id}`);
  }

  search(search?: string): Observable<Type[]> {
    let params: HttpParams;
    if (search) {
      params = new HttpParams().append('q', search);
    }
    return this.http.get<Type[]>(`${RANGE_API}/types`, { params: params });
  }
}
