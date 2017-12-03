import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ClienteService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  dadosCliente : any;

  constructor(private http: Http) { }

  getClientes(): Observable<any> {
    return this.http.get('/api/clientes').map(res => res.json());
  }

  countClientes(): Observable<any> {
    return this.http.get('/api/clientes/count').map(res => res.json());
  }

  addCliente(cliente): Observable<any> {
    return this.http.post('/api/cliente', JSON.stringify(cliente), this.options);
  }

  getCliente(cliente): Observable<any> {
    return this.http.get(`/api/cliente/${cliente._id}`).map(res => res.json());
  }

  editCliente(cliente): Observable<any> {
    return this.http.put(`/api/cliente/${cliente._id}`, JSON.stringify(cliente), this.options);
  }

  deleteCliente(cliente): Observable<any> {
    return this.http.delete(`/api/cliente/${cliente._id}`, this.options);
  }

}
