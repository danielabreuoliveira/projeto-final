import * as mongoose from 'mongoose'
const userModel = mongoose.model('User');
const produtoModel = mongoose.model('Produto');
const fornecedorModel = mongoose.model('Fornecedor');
const clienteModel = mongoose.model('Cliente');
const vendaModel = mongoose.model('Venda');

export default class HomeCtrl {
  
  getInfos = (req, res) => {
    let homeInfos = {
      quantUsuarios: 0,
      quantProdutos: 0,
      quantFornecedores: 0,
      quantVendar: 0,
      quantClientes: 0
    };    
    
    userModel.count()
    .then(response => {
        homeInfos.quantUsuarios = response
        console.log(response);
        console.log(homeInfos);
    })

    .then(produtoModel.count()
     .then(response => {
         homeInfos.quantProdutos = response
        console.log(response);
        console.log(homeInfos);
    })

    .then(fornecedorModel.count()
    .then(response => {
        homeInfos.quantFornecedores = response
       console.log(response);
       console.log(homeInfos);
   })

   .then(clienteModel.count()
   .then(response => {
       homeInfos.quantClientes = response
      console.log(response);
      console.log(homeInfos);
  }))

  .then(vendaModel.count()
  .then(response => {
      homeInfos.quantVendar = response
     console.log(response);
     console.log(homeInfos);
  }) 
  
  .then(response => {
    console.log(homeInfos);
        res.json(homeInfos);
        })
        )
      )
    )
  }
}