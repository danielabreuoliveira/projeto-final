import * as mongoose from 'mongoose';


const clienteSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  nome: String,
  email: String,
  endereco: String,
  telefone: Number,
  cidade: String,
  cep: Number,
  estado: String,
  sigla: String,
  user_id : {type: mongoose.Schema.Types,Object, ref: 'user'}
  
});

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;
