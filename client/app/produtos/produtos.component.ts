import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ProdutoService } from '../services/produto.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  produto = {};
  produtos = [];
  isLoading = true;
  isEditing = false;
  inscricao: Subscription;
  pagina: number = 0;


  addProdutoForm: FormGroup;
  id = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  estoquemin = new FormControl('', Validators.required);
  qtd = new FormControl('', Validators.required);
  diasreposicao = new FormControl('', Validators.required);
  categoria = new FormControl('', Validators.required);
  localizacao = new FormControl('', Validators.required);

  constructor(private produtoService: ProdutoService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent,
              private route: ActivatedRoute,
              private router: Router) { }
  
            
  ngOnInit() {
    this.getProdutos();
    this.addProdutoForm = this.formBuilder.group({
      id: this.id,
      name: this.name,
      estoquemin: this.estoquemin,
      qtd: this.qtd,
      diasreposicao: this.diasreposicao,
      categoria: this.categoria,
      localizacao: this.localizacao
       
    })
    
    this.produtoService.emitirProdutoVendido.subscribe;


    {
      this.produto = this.produtoService.getProdutos();
  
      this.inscricao = this.route.queryParams.subscribe(
        (queryParams: any) => {
          this.pagina = queryParams['pagina'];
        }
      );
    }   
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  getProdutos() {
    this.produtoService.getProdutos().subscribe(
      data => this.produtos = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addProduto() {
    this.produtoService.addProduto(this.addProdutoForm.value).subscribe(
      res => {
        const newProduto = res.json();
        this.produtos.push(newProduto);
        this.addProdutoForm.reset();
        this.toast.setMessage('Item adicionado com sucesso.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(produto) {
    this.isEditing = true;
    this.produto = produto;
  }

  cancelEditing() {
    this.isEditing = false;
    this.produto = {};
    this.toast.setMessage('Edição de item cancelado!', 'warning');
    this.getProdutos();
  }

  editProduto(produto) {
  this.produtoService.editProduto(produto).subscribe(
      res => {
        this.isEditing = false;
        this.produto = produto;
        this.toast.setMessage('Item editado com sucesso!', 'success');
      },
      error => console.log(error)
    );
  }

  deleteProduto(produto) {
    if (window.confirm('Você quer deletar o item permanentemente?')) {
      this.produtoService.deleteProduto(produto).subscribe(
        res => {
          const pos = this.produtos.map(elem => elem._id).indexOf(produto._id);
          this.produtos.splice(pos, 1);
          this.toast.setMessage('item deletado com sucesso!', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
