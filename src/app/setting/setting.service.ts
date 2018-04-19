import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RANGE_API } from '../app.api';
import { Setting } from './setting.model';
import { Row } from '../home/row.model';

@Injectable()
export class SettingService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
  }

  getRows(): Observable<Row[]> {
    return this.http.get<Row[]>(`${RANGE_API}/rows`);
  }

  getAll(): Observable<Setting[]> {
    return this.http.get<Setting[]>(`${RANGE_API}/settings`);
  }

  post(setting: Setting): Observable<Setting> {
    return this.http.post<Setting>(`${RANGE_API}/settings`,
      setting,
      { headers: this.headers });
  }

  put(setting: Setting): Observable<Setting> {
    return this.http.put<Setting>(`${RANGE_API}/settings/${setting.id}`,
      setting,
      { headers: this.headers });
  }

  delete(setting: Setting): Observable<Setting> {
    return this.http.delete<Setting>(`${RANGE_API}/settings/${setting.id}`);
  }

  isExist(columnId: number, typeId: number, categoryId: number): Observable<Setting[]> {
    return this.http.get<Setting[]>(`${RANGE_API}/settings?columnId=${columnId}&typeId=${typeId}&categoryId=${categoryId}`);
  }

  getColumn(columnId: number): Observable<Setting[]> {
    return this.http.get<Setting[]>(`${RANGE_API}/settings?column.id=${columnId}`);
  }
}
