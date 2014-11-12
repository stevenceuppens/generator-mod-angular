(function() {

  'use strict';

  angular
    .module('<%= _.slugify(appname) %>.<%= _.slugify(modulename) %>')

    .service('<%= _.slugify(servicename) %>', function() {
      
    });

})();