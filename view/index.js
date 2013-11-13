/*jshint latedef:false */
var generator  = require('yeoman-generator');
var util       = require('util');
var path       = require('path');

module.exports = Generator;

function Generator() {
  generator.NamedBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates/coffeescript/'));

  this.prompt({
    type: 'list',
    name: 'viewType',
    message: 'What kind of view do you want?',
    choices: [
      {'name':'HumanView', value:'human'},
      {'name':'Backbone.View', value:'backbone'}
    ],
    default: 'backbone'

  }, function (answers) {

    this.viewType = answers.viewType;

  });
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createViewFiles = function createViewFiles() {

  if (this.viewType == "human") {
    this.template('view-human.coffee', path.join('app/scripts/views', this.name + '_view.coffee'));
  } else {
    this.template('view.coffee', path.join('app/scripts/views', this.name + '_view.coffee'));
  }

};
