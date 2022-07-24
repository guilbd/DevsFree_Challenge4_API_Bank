const express = require('express');
const app = express();
const port = 3000;

var prospects = {
  "clientes": [
  {
    "nome": "João",
    "idade": 20,
    "cpf": 12345678901,
    "uf": "SP",
    "salario": 1000
  },
  {
    "nome": "Maria",
    "idade": 25,
    "cpf": 12345678902,
    "uf": "SP",
    "salario": 2000
  },
  {
    "nome": "José",
    "idade": 30,
    "cpf": 12345678903,
    "uf": "SC",
    "salario": 3000
  }
]
};

var produtos = {
  "consignado": 
  {
  "tipo_emprestimo": "emprestimo_consignado",
  "taxa": 2,
},
"pessoal":
{
  "tipo_emprestimo": "emprestimo_pessoal",
  "taxa": 4,
},
"garantia":
{
  "tipo_emprestimo": "emprestimo_garantia",
  "taxa": 3
}
};
// var obj = Object.assign({}, prospects, produtos);



app.get('/', (req, res) => {
  
  // req.body.cliente.nome = nome;

  for (var i = 0; i < prospects.clientes.length; i++) {
    var consignado, garantia, pessoal = 0;
    var prospect = prospects.clientes[i];
    var garantia = 
    {
      "tipo_emprestimo": "emprestimo_garantia",
      "taxa": 3
    }
    var pessoal = {
      "tipo_emprestimo": "emprestimo_pessoal",
      "taxa": 4,
    }
    var consignado = {
      "tipo_emprestimo": "emprestimo_consignado",
      "taxa": 2,
    }

    if (prospect.salario >= 3000) {
      if (prospect.uf == "SP") {
        res.send({prospect, garantia, pessoal});
      } else {
        res.send({prospect, pessoal});
      }
    }

    if (prospect.salario >= 5000) {
      if (prospect.idade < 30) {
        res.send({prospect, garantia, pessoal, consignado});
      } else {
        res.send({prospect, consignado, pessoal});
      }
    }

    if (prospect.salario < 3000) {
      if (prospect.idade < 30) {
        if (prospect.uf == "SP") {
          res.send({prospect, garantia, pessoal});
        } else {
          res.send({prospect, pessoal});
        }
      }
    }

    emprestimos = []
    if(pessoal == true){
      emprestimos.push(produtos.pessoal)
    }
    if(garantia == true){
      emprestimos.push(produtos.garantia)
    }

    if(consignado == true){
      emprestimos.push(produtos.consignado)
    }

    console.log(JSON.stringify({
      "nome": prospect.nome,
      "produtos_emprestimos": emprestimos
    }));
  }
});
app.listen(port, () => console.log(`App listening on port ${port}!`));