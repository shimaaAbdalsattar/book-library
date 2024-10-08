import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  constructor(
    private http: HttpClient
  ) {}

  get(url: string, options?: any): Observable<any> {
    return this.http.get<any>(url, options);
  }

}
