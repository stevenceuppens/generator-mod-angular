'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');

var ServiceGenerator = yeoman.generators.NamedBase.extend({
  prompting: {
    askForFilterName: function () {
      var done = this.async();

      var prompts = [
        {
          type    : 'input',
          name    : 'servicename',
          message : 'Your service name?',
          default : this.name
        },
        {
          type    : 'list',
          name    : 'servicetype',
          message : 'Your service type?',
          choices : ['service', 'factory', 'provider'],
          default : 'service'
        },
        {
          type    : 'input',
          name    : 'modulename',
          message : 'Whats your module name?',
          default : 'core'
        }
      ];

      this.prompt(prompts, function (answers) {
        this.servicename = answers.servicename;
        this.servicetype = answers.servicetype;
        this.modulename = answers.modulename;

        done();
      }.bind(this));
    }
  },

  writing: {
    app: function () {
      var dir = 'src/app/modules/' + this.modulename + '/services/' + this.servicename;
      
      this.dest.mkdir(dir);

      if(this.servicetype === 'service') {
        this.template('_name.service.js', dir + '/' + this.servicename + '.service.js');
        this.template('_name.service.spec.js', dir + '/' + this.servicename + '.service.spec.js');
      }

      if(this.servicetype === 'factory') {
        this.template('_name.factory.js', dir + '/' + this.servicename + '.factory.js');
        this.template('_name.factory.spec.js', dir + '/' + this.servicename + '.factory.spec.js');
      }
      
      if(this.servicetype === 'provider') {
        this.template('_name.provider.js', dir + '/' + this.servicename + '.provider.js');
        this.template('_name.provider.spec.js', dir + '/' + this.servicename + '.provider.spec.js');
      }
    }
  }
});

module.exports = ServiceGenerator;