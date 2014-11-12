(function() {

  'use strict';

  angular
    .module('<%= _.slugify(appname) %>.<%= _.slugify(modulename) %>')

    .provider('<%= _.slugify(servicename) %>', function() {
      this.$get = function() {
        function Foo() {
          this.bar = 'bar';
        }
        return new Foo();
      };
    });

})();