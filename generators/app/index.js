'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var ModAngularGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../../package.json');
    this.argument('appname', { type: String, required: false });
  },

  prompting: {
    askForProjectName: function () {
      var done = this.async();

      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the modularized Angular generator!'
      ));

      var prompts = [
        {
          type    : 'input',
          name    : 'appname',
          message : 'Your project name',
          default : this.appname
        }
      ];

      this.prompt(prompts, function (answers) {
        this.appname = answers.appname;

        done();
      }.bind(this));
    }
  },

  configuring: {
    enforceFolderName: function () {
      if (this.appname !== this._.last(this.destinationRoot().split(path.sep))) {
        this.destinationRoot(this.appname);
      }
      this.config.save();
    }
  },

  writing: {
    app: function () {
      this.dest.mkdir('src');
      this.dest.mkdir('src/app');
      this.dest.mkdir('src/app/modules');
      this.dest.mkdir('src/assets');
      this.dest.mkdir('src/assets/images');
      this.dest.mkdir('src/sass');

      this.template('src/_index.html', 'src/index.html');
      this.template('src/app/appname.module.js', 'src/app/' + this.appname + '.module.js');

      this.src.copy('src/sass/main.scss', 'src/sass/main.scss');
    },

    projectfiles: function () {
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('_gulpfile.js', 'gulpfile.js');

      this.src.copy('_bowerrc', '.bowerrc');
      this.src.copy('_editorconfig', '.editorconfig');
      this.src.copy('_jshintrc', '.jshintrc');
    },

    generateCoreModule: function () {
      var done = this.async();
      this.invoke('mod-angular:module', 
        { 
          args: [
            'core'
          ],
          options: {
            modulename: 'core',
            lazyload: false
          }
        },
        function() {
          done();
        }
      );
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = ModAngularGenerator;
