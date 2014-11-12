(function() {

  'use strict';

  angular
    .module('<%= _.slugify(appname) %>.<%= _.slugify(modulename) %>')

    .directive('<%= _.slugify(directivename) %>', function() {
      return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {},
        templateUrl: '<%= directivepath %>/<%= _.slugify(directivename) %>.directive.tpl',
        link: function(scope, element, attrs) {

        }
      };
    });

})();