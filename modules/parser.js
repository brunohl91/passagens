
var request = require('request');
var cheerio = require('cheerio');
var recorder = require('../modules/recorder.js');

var Parser = function () {

  var self = this;

  self.promo = {
    'link': '',
    'text': '',
    'preco': -1,
  }

  self.parse = function (link) {
    return new Promise (function (resolve, reject) {
      request( link , function (error, response, html) {
        if (!error && response.statusCode == 200) {
          var $ = cheerio.load(html);
          var res = self.decode( $, link );
          recorder.record( self.getFileName(link), res );
          resolve( res );
        }
        else {
          reject( error )
        }
      });
    })
  }

  self.decode = function ( $, strategy ) {
    if (typeof self.strategies[strategy] == "function") {
      return self.strategies[strategy]( $ );
    }
    else {
      return false;
    }
  }

  self.strategies = {
    'http://passagensimperdiveis.com.br': function ( $ ) {
      var post = $( '.title-h1' )[0];
      var text = post.children[0].data;
      var custoTmp = text.match( /\R\$\s[\d\.]{3,6}/i );
      return {
        'link': post.attribs.href,
        'text': text,
        'custo': (custoTmp) ? self.convertMoney( custoTmp[0] ) : -1,
      }
    },
    'http://melhoresdestinos.com.br': function ( $ ) {
      var post = $( '.conteudo-topo-home a' )[0];
      var text = post.children[0].children[0].data;
      var custoTmp = text.match( /\R\$\s[\d\.]{3,6}/i );
      return {
        'link': post.attribs.href,
        'text': text,
        'custo': (custoTmp) ? self.convertMoney( custoTmp[0] ) : -1,
      }
    },
    'http://viajandobaratopelomundo.com.br': function ( $ ) {
      var post = $( 'h1.entry-title a' )[2];
      var text = post.children[0].data;
      var custoTmp = text.match( /\R\$[\s\d\.]{3,6}/i );
      return {
        'link': post.attribs.href,
        'text': text,
        'custo': (custoTmp) ? self.convertMoney( custoTmp[0], 2 ) : -1,
      }
    },
  }

  self.convertMoney = function ( money, exclude ) { // "R$ 1.274"
    exclude = exclude || 3;
    return parseFloat( (money).replace('.','').substring( exclude ) )
  }

  self.getFileName = function (link) {
    return link.replace('http://', '').replace('https://', '').replace('.com.br', '');
  }

  return self;

}

module.exports = Parser ();