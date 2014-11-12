(function() {

  'use strict';

  angular
    .module('<%= _.slugify(appname) %>', [
      '<%= _.slugify(appname) %>.core'
    ]);

})();