import * as mongoose from 'mongoose';

const vendaSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  dataVenda: Date,
  cliente_id : {type: mongoose.Schema.Types,Object, ref: 'cliente'}
});

const Venda = mongoose.model('Venda', vendaSchema);

export default Venda;
