import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FornecedorService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getFornecedores(): Observable<any> {
    return this.http.get('/api/fornecedores').map(res => res.json());
  }

  countFornecedores(): Observable<any> {
    return this.http.get('/api/fornecedores/count').map(res => res.json());
  }

  addFornecedor(fornecedor): Observable<any> {
    return this.http.post('/api/fornecedor', JSON.stringify(fornecedor), this.options);
  }

  getFornecedor(fornecedor): Observable<any> {
    return this.http.get(`/api/fornecedor/${fornecedor._id}`).map(res => res.json());
  }

  editFornecedor(fornecedor): Observable<any> {
    return this.http.put(`/api/fornecedor/${fornecedor._id}`, JSON.stringify(fornecedor), this.options);
  }

  deleteFornecedor(fornecedor): Observable<any> {
    return this.http.delete(`/api/fornecedor/${fornecedor._id}`, this.options);
  }

  
}
