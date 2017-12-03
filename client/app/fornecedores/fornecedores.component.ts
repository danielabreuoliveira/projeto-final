import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { FornecedorService } from '../services/fornecedor.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { $ } from 'protractor';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss']
})
export class FornecedoresComponent implements OnInit {

  fornecedor = {};
  fornecedores = [];
  isLoading = true;
  isEditing = false;

  addFornecedorForm: FormGroup;
  id = new FormControl('', Validators.required);
  nome = new FormControl('', Validators.required);
  cnpj = new FormControl('', Validators.required);

  constructor(private fornecedorService: FornecedorService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getFornecedores();
    this.addFornecedorForm = this.formBuilder.group({
      id: this.id,
      nome: this.nome,
      cnpj: this.cnpj
    });
  }

  getFornecedores() {
    this.fornecedorService.getFornecedores().subscribe(
      data => this.fornecedores = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addFornecedor() {
    this.fornecedorService.addFornecedor(this.addFornecedorForm.value).subscribe(
      res => {
        const newFornecedor = res.json();
        this.fornecedores.push(newFornecedor);
        this.addFornecedorForm.reset();
        this.toast.setMessage('Item adicionado com sucesso.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(fornecedor) {
    this.isEditing = true;
    this.fornecedor = fornecedor;
  }

  cancelEditing() {
    this.isEditing = false;
    this.fornecedor = {};
    this.toast.setMessage('Edição de item cancelado!', 'warning');
    this.getFornecedores();
  }

  editFornecedor(fornecedor) {
    this.fornecedorService.editFornecedor(fornecedor).subscribe(
      res => {
        this.isEditing = false;
        this.fornecedor = fornecedor;
        this.toast.setMessage('Item editado com sucesso!', 'success');
      },
      error => console.log(error)
    );
  }

  deleteFornecedor(fornecedor) {
    if (window.confirm('Você quer deletar o item permanentemente?')) {
      this.fornecedorService.deleteFornecedor(fornecedor).subscribe(
        res => {
          const pos = this.fornecedores.map(elem => elem._id).indexOf(fornecedor._id);
          this.fornecedores.splice(pos, 1);
          this.toast.setMessage('item deletado com sucesso!', 'success');
        },
        error => console.log(error)
      );
    }
  }


}
