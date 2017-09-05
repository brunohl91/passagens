
var fs = require('fs');
var os = require("os");

var Recorder = function () {

  var self = this;
  self.path = 'record/';

  self.record = function ( name, data ) {
    return new Promise (function (resolve, reject) {
      var dados = Date().toLocaleString() + ' => ' + JSON.stringify(data) + os.EOL;
      fs.appendFile( self.path + name + '.log' , dados, 'utf-8', function(err, res){
        if (err) {
          console.log( Date().toLocaleString() + " => ERROR => " + err );
          reject()
        }
        else {
          resolve();
        }
      })
    })
  }

  return self;

}

module.exports = Recorder ();