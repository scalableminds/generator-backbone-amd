/*jshint latedef:false */
var generator  = require('yeoman-generator');
var util       = require('util');
var path       = require('path');

module.exports = Generator;

function Generator() {
  generator.NamedBase.apply(this, arguments);
  var dirPath = '../templates/coffeescript/';
  this.sourceRoot(path.join(__dirname, dirPath));
  this.argument('model', { type: String, required: false });
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createViewFiles = function createViewFiles() {
  this.template('router.coffee', path.join('app/scripts/routers', this.name + '_router.coffee'));
};
