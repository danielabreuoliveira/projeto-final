import Produto from '../models/produto';
import BaseCtrl from './base';

export default class ProdutoCtrl extends BaseCtrl {
  model = Produto;
}
