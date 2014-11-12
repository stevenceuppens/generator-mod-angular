'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');

var DirectiveGenerator = yeoman.generators.NamedBase.extend({
  prompting: {
    askForFilterName: function () {
      var done = this.async();

      var prompts = [
        {
          type    : 'input',
          name    : 'directivename',
          message : 'Your filter name',
          default : this.name
        },
        {
          type    : 'input',
          name    : 'modulename',
          message : 'Whats your module name?',
        }
      ];

      this.prompt(prompts, function (answers) {
        this.directivename = answers.directivename;
        this.modulename = answers.modulename;

        done();
      }.bind(this));
    }
  },

  writing: {
    app: function () {
      var dir = 'src/app/modules/' + this.modulename + '/directives/' + this.directivename;
      
      this.directivepath = 'modules/' + this.modulename + '/directives/' + this.directivename;

      this.dest.mkdir(dir);

      this.template('_name.directive.js', dir + '/' + this.directivename + '.directive.js');
      this.template('_name.directive.tpl', dir + '/' + this.directivename + '.directive.tpl');
      this.template('_name.directive.scss', dir + '/' + this.directivename + '.directive.scss');
      this.template('_name.directive.spec.js', dir + '/' + this.directivename + '.directive.spec.js');
    }
  }
});

module.exports = DirectiveGenerator;