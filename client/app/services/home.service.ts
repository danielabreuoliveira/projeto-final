import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  

  constructor(private http: Http) { }

  addHome(home): Observable<any> {
    return this.http.post('/api/home', JSON.stringify(home), this.options);
  }

  getHome(): Observable<any> {
    return this.http.get(`/api/home`).map(res => res.json());
  }

  editHome(home): Observable<any> {
    return this.http.put(`/api/home`, JSON.stringify(home), this.options);
  }

}
