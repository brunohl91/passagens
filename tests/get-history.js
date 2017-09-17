
var request = require('request');
var cheerio = require('cheerio');

getDataPage( "http://passagensimperdiveis.com.br" );

function getDataPage ( link ) {
  return new Promise (function (resolve, reject) {
    request( link , function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var posts = $("div.texto h4 a");
        delete posts.options;
        delete posts._root;
        delete posts.length;
        delete posts.prevObject;
        for (var p in posts) {
          console.log(posts[p])
        }
        resolve( response );
      }
      else {
        reject( error )
      }
    });
  });
}