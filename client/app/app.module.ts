import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { ClienteService} from './services/cliente.service';
import { VendaService} from './services/venda.service';

import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

import { AppComponent } from './app.component';
import { ClientesComponent} from './clientes/clientes.component';
import { VendasComponent } from './vendas/vendas.component';
import { Pagina_inicialComponent } from './pagina-inicial/pagina_inicial.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoService } from './services/produto.service';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { FornecedorService } from './services/fornecedor.service';
import { RelatorioComponent } from './relatorios/relatorio.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    ClientesComponent,
    VendasComponent,
    FornecedoresComponent,
    Pagina_inicialComponent,
    RegisterComponent,
    RelatorioComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,    
    NotFoundComponent,

  ],
  imports: [
    RoutingModule,
    SharedModule,
    ChartsModule
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    ProdutoService,
    ClienteService,
    VendaService,
    FornecedorService,
    UserService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
