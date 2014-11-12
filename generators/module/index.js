'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');

var ModuleGenerator = yeoman.generators.NamedBase.extend({
  prompting: {
    askForModuleName: function () {
      var done = this.async();

      var prompts = [];

      if(this.options.modulename === undefined) {
        prompts.push({
          type    : 'input',
          name    : 'modulename',
          message : 'Whats your module name?',
          default : this.name
        });
      };

      if(this.options.lazyload === undefined) {
        prompts.push({
          type    : 'confirm',
          name    : 'lazyload',
          message : 'Would you like to lazy-load the module?',
          default : true
        });
      };

      if(prompts.length > 0) {
        this.prompt(prompts, function (answers) {
          this.options.modulename = answers.modulename;
          this.options.lazyload = answers.lazyload;

          done();
        }.bind(this));
      }
      else {
        done();
      };
    }
  },

  configuring: {
    update: function () {
      this.lazyload = this.options.lazyload;
      this.modulename = this.options.modulename;
    }
  },

  writing: {
    app: function () {
      this.dest.mkdir('src/app/modules/' + this.modulename);
      this.dest.mkdir('src/app/modules/' + this.modulename + '/directives');
      this.dest.mkdir('src/app/modules/' + this.modulename + '/filters');
      this.dest.mkdir('src/app/modules/' + this.modulename + '/services');
      this.dest.mkdir('src/app/modules/' + this.modulename + '/controllers');
      this.template('_name.module.js', 'src/app/modules/' + this.modulename + '/' + this.modulename + '.module.js');
    },

    projectfiles: function () {
      this.template('_name.info.json', 'src/app/modules/' + this.modulename + '/' + this.modulename + '.info.json');
    }
  }
});

module.exports = ModuleGenerator;
