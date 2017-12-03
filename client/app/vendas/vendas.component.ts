import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { VendaService } from '../services/venda.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {

  venda = {};
  vendas = [];
  isLoading = true;
  isEditing = false;

  addVendaForm: FormGroup;
  id = new FormControl('', Validators.required);
  dataVenda = new FormControl('', Validators.required);
  
  constructor(private vendaService: VendaService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getVendas();
    this.addVendaForm = this.formBuilder.group({
      id: this.id,
      dataVenda: this.dataVenda,
    });
  }

  getVendas() {
    this.vendaService.getVendas().subscribe(
      data => this.vendas = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addVenda() {
    this.vendaService.addVenda(this.addVendaForm.value).subscribe(
      res => {
        const newVenda = res.json();
        this.vendas.push(newVenda);
        this.addVendaForm.reset();
        this.toast.setMessage('Item adicionado com sucesso.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(venda) {
    this.isEditing = true;
    this.venda = venda;
  }

  cancelEditing() {
    this.isEditing = false;
    this.venda = {};
    this.toast.setMessage('Edição de item cancelado!', 'warning');
    this.getVendas();
  }

  editVenda(venda) {
    this.vendaService.editVenda(venda).subscribe(
      res => {
        this.isEditing = false;
        this.venda = venda;
        this.toast.setMessage('Item editado com sucesso!', 'success');
      },
      error => console.log(error)
    );
  }

  deleteVenda(venda) {
    if (window.confirm('Você quer deletar o item permanentemente?')) {
      this.vendaService.deleteVenda(venda).subscribe(
        res => {
          const pos = this.vendas.map(elem => elem._id).indexOf(venda._id);
          this.vendas.splice(pos, 1);
          this.toast.setMessage('item deletado com sucesso!', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
