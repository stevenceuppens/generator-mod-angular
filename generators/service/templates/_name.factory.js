(function() {

  'use strict';

  angular
    .module('<%= _.slugify(appname) %>.<%= _.slugify(modulename) %>')

    .factory('<%= _.slugify(servicename) %>', function() {
      return {

      };
    });

})();