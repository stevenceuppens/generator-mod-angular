(function() {

  'use strict';

  angular
    .module('<%= _.slugify(appname) %>.<%= _.slugify(modulename) %>')

    .controller('<%= _.slugify(controllername) %>', function() {
      
      var vm = this;

      vm.name = '<%= _.slugify(controllername) %>';

    });

})();