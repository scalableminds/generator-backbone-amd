'use strict'
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

var AppGenerator = module.exports = function Appgenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.testFramework = 'mocha';
  this.templateFramework = this.options['template-framework'] || 'jst';

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],
      skipMessage: options['skip-install-message']
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppGenerator, yeoman.generators.Base);

AppGenerator.prototype.askFor = function() {
  var cb = this.async();

  // welcome
  console.log(this.yeoman);
  console.log("Here we go. You'll get CoffeeScript, RequireJS, Backbone, Bootstrap out of the box.");

  var prompts = [{
    type: 'list',
    name: 'templateFramework',
    message: 'Pick your template framework',
    choices: [
      {'name':'moustache', value:'moustache'},
      {'name':'handlebars', value:'handlebars'},
      {'name':'JST, like _.template', value:'jst'}
    ],
    default: 'jst'
  }];

  this.prompt(prompts, function (answers) {
    this.templateFramework = answers.templateFramework;
    cb();
  }.bind(this));
};

AppGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

AppGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

AppGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

AppGenerator.prototype.bower = function() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

AppGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

AppGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

AppGenerator.prototype.h5bp = function h5bp() {
  this.copy('404.html', 'app/404.html');
  this.copy('robots.txt', 'app/robots.txt');
};

AppGenerator.prototype.mainStylesheet = function mainStylesheet() {
  this.copy('main.less', 'app/styles/main.less');
};

AppGenerator.prototype.writeIndex = function writeIndexWithRequirejs() {

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.indexFile = this.engine(this.indexFile, this);

  this.indexFile = this.appendScripts(this.indexFile, 'scripts/main.js', [
    'bower_components/requirejs/require.js'
  ], {'data-main': 'scripts/main'});
};

AppGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/scripts/lib');
  this.mkdir('app/scripts/views');
  this.mkdir('app/scripts/models');
  this.mkdir('app/scripts/routers');
  this.mkdir('app/scripts/templates');
  this.mkdir('app/styles');
  this.mkdir('app/images');
  this.write('app/index.html', this.indexFile);
};

AppGenerator.prototype.mainJS = function mainJS() {

  var dirPath = '../templates/coffeescript';
  this.sourceRoot(path.join(__dirname, dirPath));

  var mainJsFile = this.engine(this.read('main.coffee'), this);

  this.write('app/scripts/main.coffee', mainJsFile);
};

