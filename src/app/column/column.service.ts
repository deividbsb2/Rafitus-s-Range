import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Column } from './column.model';
import { RANGE_API } from '../app.api';

@Injectable()
export class ColumnService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Column[]> {
    return this.http.get<Column[]>(`${RANGE_API}/columns`);
  }

  post(column: Column): Observable<Column> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<Column>(`${RANGE_API}/columns`,
      column,
      { headers: headers });
  }

  put(column: Column): Observable<Column> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put<Column>(`${RANGE_API}/columns/${column.id}`,
      column,
      { headers: headers });
  }

  delete(column: Column): Observable<Column> {
    return this.http.delete<Column>(`${RANGE_API}/columns/${column.id}`);
  }

  search(search?: string): Observable<Column[]> {
    let params: HttpParams;
    if (search) {
      params = new HttpParams().append('q', search);
    }
    return this.http.get<Column[]>(`${RANGE_API}/columns`, { params: params });
  }
}
