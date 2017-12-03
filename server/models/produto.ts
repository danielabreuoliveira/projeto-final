import * as mongoose from 'mongoose';

const produtoSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  name: String,
  qtd: Number,
  estoquemin: Number,
  diasreposicao: Number,
  categoria: String,
  localizacao: String,
  fornecedor_id : {type: mongoose.Schema.Types,Object, ref: 'fornecedor'},
  venda_id : {type: mongoose.Schema.Types,Object, ref: 'venda'}

});

const Produto = mongoose.model('Produto', produtoSchema);

export default Produto;
