import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ClienteService } from '../services/cliente.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  cliente = {};
  clientes = [];
  isLoading = true;
  isEditing = false;

  addClienteForm: FormGroup;
  id = new FormControl('', Validators.required);
  nome = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  endereco = new FormControl('', Validators.required);
  telefone = new FormControl('', Validators.required);
  cidade = new FormControl('', Validators.required);
  cep = new FormControl('', Validators.required);
  estado = new FormControl('', Validators.required);
  sigla = new FormControl('', Validators.required);

  constructor(private clienteService: ClienteService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getClientes();
    this.addClienteForm = this.formBuilder.group({
      id: this.id,
      nome: this.nome,
      email: this.email,
      endereco: this.endereco,
      telefone: this.telefone,
      cidade: this.cidade,
      cep: this.cep,
      estado: this.estado,
      sigla: this.sigla
    });
  }

  getClientes() {
    this.clienteService.getClientes().subscribe(
      data => this.clientes = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCliente() {
    this.clienteService.addCliente(this.addClienteForm.value).subscribe(
      res => {
        const newCliente = res.json();
        this.clientes.push(newCliente);
        this.addClienteForm.reset();
        this.toast.setMessage('Item adicionado com sucesso.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(cliente) {
    this.isEditing = true;
    this.cliente = cliente;
  }

  cancelEditing() {
    this.isEditing = false;
    this.cliente = {};
    this.toast.setMessage('Edição de item cancelado!', 'warning');
    this.getClientes();
  }

  editCliente(cliente) {
    this.clienteService.editCliente(cliente).subscribe(
      res => {
        this.isEditing = false;
        this.cliente = cliente;
        this.toast.setMessage('Item editado com sucesso!', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCliente(cliente) {
    if (window.confirm('Você quer deletar o item permanentemente?')) {
      this.clienteService.deleteCliente(cliente).subscribe(
        res => {
          const pos = this.clientes.map(elem => elem._id).indexOf(cliente._id);
          this.clientes.splice(pos, 1);
          this.toast.setMessage('item deletado com sucesso!', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
