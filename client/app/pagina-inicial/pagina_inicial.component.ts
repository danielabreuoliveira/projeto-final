import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { HomeService } from '../services/home.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-pagina_inicial',
  templateUrl: './pagina_inicial.component.html',
  styleUrls: ['./pagina_inicial.component.scss']
})
export class Pagina_inicialComponent implements OnInit {
  home = {    
    quantUsuarios: 0,
    quantProdutos: 0,
    quantFornecedores: 0,
    quantVendar: 0,
    quantClientes: 0

  };
  dados : any;
  isLoading = true;
 

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getHome();
  }

  getHome() {
  this.homeService.getHome().subscribe(
    data => {this.home = data;console.log(this.home)},
    error => console.log(error),
    () => this.isLoading = false
  );
}
}
