'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');

var FilterGenerator = yeoman.generators.NamedBase.extend({
  prompting: {
    askForFilterName: function () {
      var done = this.async();

      var prompts = [
        {
          type    : 'input',
          name    : 'filtername',
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
        this.filtername = answers.filtername;
        this.modulename = answers.modulename;

        done();
      }.bind(this));
    }
  },

  writing: {
    app: function () {
      var dir = 'src/app/modules/' + this.modulename + '/filters/' + this.filtername;
      
      this.dest.mkdir(dir);

      this.template('_name.filter.js', dir + '/' + this.filtername + '.filter.js');
      this.template('_name.filter.spec.js', dir + '/' + this.filtername + '.filter.spec.js');
    }
  }
});

module.exports = FilterGenerator;