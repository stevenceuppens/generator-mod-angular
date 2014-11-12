(function() {

  'use strict';

  angular
    .module('<%= _.slugify(appname) %>.<%= _.slugify(modulename) %>')

    .filter('<%= _.slugify(filtername) %>', function() {
      return function( input ) {
        return input;
      };
    });

})();