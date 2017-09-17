
'use strict';

/**
 * TODO:
 * - Cuidar custo
 * - Origens
 * - Destinos
 * - Entrar na página da Passagem?
 *
 * - Passagens imperdiveis não está pegando completo
 */

var parser = require('./modules/parser.js');

global.links = [
  {
    'last': '',
    'link': 'http://passagensimperdiveis.com.br',
  },
  {
    'last': '',
    'link': 'http://melhoresdestinos.com.br',
  },
  {
    'last': '',
    'link': 'http://viajandobaratopelomundo.com.br',
  },
]

var promises = [
]

for (var i = 0; i < global.links.length; i++) {

  let link = global.links[i]['link'];
  promises.push( parser.parse( link ) );

}

function runPromises ( promises ) {

  Promise.all( promises )
    .then(function(values) {
      console.log(values);
    })
    .catch(function (err) {
      console.log(err);
    });

}

runPromises( promises );
