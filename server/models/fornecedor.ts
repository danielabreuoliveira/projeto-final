import * as mongoose from 'mongoose';

const fornecedorSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  nome: String,
  cnpj: Number,
  

});

const Fornecedor = mongoose.model('Fornecedor', fornecedorSchema);

export default Fornecedor;
