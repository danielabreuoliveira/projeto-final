import * as express from 'express';

import ProdutoCtrl from './controllers/produto';
import UserCtrl from './controllers/user';
import Produto from './models/produto';
import User from './models/user';
import ClienteCtrl from './controllers/cliente';
import Cliente from './models/cliente';
import VendaCtrl from './controllers/venda';
import Venda from './models/venda';
import FornecedorCtrl from './controllers/fornecedor';
import Fornecedor from './models/fornecedor';
import homeCtrl from './controllers/home';
import HomeCtrl from './controllers/home';

export default function setRoutes(app) {

  const router = express.Router();

  const produtoCtrl = new ProdutoCtrl();
  const clienteCtrl = new ClienteCtrl();
  const userCtrl = new UserCtrl();
  const vendaCtrl = new VendaCtrl();
  const fornecedorCtrl = new FornecedorCtrl();
  const homeCtrl = new HomeCtrl();

  // Produtos
  router.route('/produtos').get(produtoCtrl.getAll);
  router.route('/produtos/count').get(produtoCtrl.count);
  router.route('/produto').post(produtoCtrl.insert);
  router.route('/produto/:id').get(produtoCtrl.get);
  router.route('/produto/:id').put(produtoCtrl.update);
  router.route('/produto/:id').delete(produtoCtrl.delete);

  // Usuarios
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

   // Clientes
  router.route('/clientes').get(clienteCtrl.getAll);
  router.route('/clientes/count').get(clienteCtrl.count);
  router.route('/cliente').post(clienteCtrl.insert);
  router.route('/cliente/:id').get(clienteCtrl.get);
  router.route('/cliente/:id').put(clienteCtrl.update);
  router.route('/cliente/:id').delete(clienteCtrl.delete);

  // Vendas
  router.route('/vendas').get(vendaCtrl.getAll);
  router.route('/vendas/count').get(vendaCtrl.count);
  router.route('/venda').post(vendaCtrl.insert);
  router.route('/venda/:id').get(vendaCtrl.get);
  router.route('/venda/:id').put(vendaCtrl.update);
  router.route('/venda/:id').delete(vendaCtrl.delete);


  // Fornecedores
  router.route('/fornecedores').get(fornecedorCtrl.getAll);
  router.route('/fornecedores/count').get(fornecedorCtrl.count);
  router.route('/fornecedor').post(fornecedorCtrl.insert);
  router.route('/fornecedor/:id').get(fornecedorCtrl.get);
  router.route('/fornecedor/:id').put(fornecedorCtrl.update);
  router.route('/fornecedor/:id').delete(fornecedorCtrl.delete);



  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
  router.route('/home').get(homeCtrl.getInfos);

}
