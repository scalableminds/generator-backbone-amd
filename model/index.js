/*jshint latedef:false */
var generator  = require('yeoman-generator');
var util       = require('util');
var path       = require('path');

module.exports = Generator;

function Generator() {
  generator.NamedBase.apply(this, arguments);
  var dirPath = '../templates/coffeescript/';
  this.sourceRoot(path.join(__dirname, dirPath));
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createModelFiles = function createModelFiles() {
  this.template('model.coffee', path.join('app/scripts/models', this.name + '.coffee'));
};
