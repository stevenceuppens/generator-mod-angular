(function() {

  'use strict';

  angular
    .module('<%= _.slugify(appname) %>.<%= _.slugify(modulename) %>', [
      'ui.router'
    ])

    .config(function() {

    })

    .run(function() {

    });

})();