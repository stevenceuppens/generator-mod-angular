'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');

var ControllerGenerator = yeoman.generators.NamedBase.extend({
  prompting: {
    askForFilterName: function () {
      var done = this.async();

      var prompts = [
        {
          type    : 'input',
          name    : 'controllername',
          message : 'Your controller name',
          default : this.name
        },
        {
          type    : 'input',
          name    : 'modulename',
          message : 'Whats your module name?',
        }
      ];

      this.prompt(prompts, function (answers) {
        this.controllername = answers.controllername;
        this.modulename = answers.modulename;

        done();
      }.bind(this));
    }
  },

  writing: {
    app: function () {
      var dir = 'src/app/modules/' + this.modulename + '/controllers/' + this.controllername;
      
      this.dest.mkdir(dir);

      this.template('_name.controller.js', dir + '/' + this.controllername + '.controller.js');
      this.template('_name.controller.spec.js', dir + '/' + this.controllername + '.controller.spec.js');
    }
  }
});

module.exports = ControllerGenerator;