
/**
 * TODO:
 * - Cuidar custo
 * - Origens
 * - Destinos
 * - Entrar na página da Passagem?
 */

var parser = require('./modules/parser.js');

var links = [
  'http://passagensimperdiveis.com.br',
  'http://melhoresdestinos.com.br',
  'http://viajandobaratopelomundo.com.br',
]

var promises = [
]

for (var i = 0; i < links.length; i++) {

  let link = links[i];
  promises.push( parser.parse( link ) );

}

Promise.all( promises )
  .then(function(values) {
    console.log(values);
  })
  .catch(function (err) {
    console.log(err);
  });