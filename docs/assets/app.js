var module = angular.module('ui.select.pages', ['ngRoute', 'ui.select', 'demo']);
var sampleRoutes = [
  'basic',
  'append-to-body',
  'bind-to-single-property-async',
  'bind-to-single-property',
  'bootstrap',
  'disable-search',
  'dropdown-position',
  'event-on-selection',
  'focus',
  'group-by',
  'group-filter',
  'multiple-selection',
  'object-as-source',
  'select2-with-bootstrap',
  'selectize-with-bootstrap',
  'tagging',
];

module.config(['$routeProvider',
  function config($routeProvider) {
    var rp = $routeProvider;
    for (var i = 0; i < sampleRoutes.length; i++) {
      rp = rp.when(`/${sampleRoutes[i]}`, { template: `<demo-${sampleRoutes[i]}></demo-${sampleRoutes[i]}>` });
    }
    rp.otherwise('/basic');
  }
]);

module.controller('routerCtrl', function () {
  var vm = this;
  vm.sampleRoutes = sampleRoutes.map(x => ({ route: `#/${x}`, name: x }));
  vm.pathname = window.location.hash || '#/basic';
  window.addEventListener('hashchange', function() {
    vm.pathname = String(window.location.hash);
  }, false);
});

function toCamelCase(value) {
  var arr = value.split('-').map(function(a) {
    return String(a[0]).toUpperCase() + a.substring(1);
  });
  return arr.join('');
}

for (var i = 0; i < sampleRoutes.length; i++) {
  const componentName = 'demo' + toCamelCase(sampleRoutes[i]);
  module.component(componentName, {
    templateUrl: `examples/demo-${sampleRoutes[i]}.html`,
    controller: ['$scope', '$http', '$timeout', '$interval', demoController],
    controllerAs: 'ctrl',
  });
}
