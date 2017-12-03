import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
@Injectable()
export class ProdutoService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  emitirProdutoVendido = new EventEmitter<string>();

  getProdutos(): Observable<any> {
    return this.http.get('/api/produtos').map(res => res.json());
  }

  countProdutos(): Observable<any> {
    return this.http.get('/api/produtos/count').map(res => res.json());
  }

  addProduto(produto): Observable<any> {
    return this.http.post('/api/produto', JSON.stringify(produto), this.options);
    
  }

  getProduto(produto): Observable<any> {
    return this.http.get(`/api/produto/${produto._id}`).map(res => res.json());
  }

  editProduto(produto): Observable<any> {
    return this.http.put(`/api/produto/${produto._id}`, JSON.stringify(produto), this.options);
  }

  deleteProduto(produto): Observable<any> {
    return this.http.delete(`/api/produto/${produto._id}`, this.options);
  }

}
