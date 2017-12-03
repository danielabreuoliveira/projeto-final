import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class VendaService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getVendas(): Observable<any> {
    return this.http.get('/api/vendas').map(res => res.json());
  }

  countVendas(): Observable<any> {
    return this.http.get('/api/vendas/count').map(res => res.json());
  }

  addVenda(venda): Observable<any> {
    return this.http.post('/api/venda', JSON.stringify(venda), this.options);
  }

  getVenda(venda): Observable<any> {
    return this.http.get(`/api/venda/${venda._id}`).map(res => res.json());
  }

  editVenda(venda): Observable<any> {
    return this.http.put(`/api/venda/${venda._id}`, JSON.stringify(venda), this.options);
  }

  deleteVenda(venda): Observable<any> {
    return this.http.delete(`/api/venda/${venda._id}`, this.options);
  }

}