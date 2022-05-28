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

  // 所有选项
  var allOptions = [
    { name: '全部', code: '全部' },
    { name: '一', code: '1' },
    { name: '二', code: '2' },
    { name: '三', code: '3' },
    { name: '四', code: '4' },
    { name: '五', code: '5' }
  ];
  // 只有【全部】的选项
  var oneOptions = allOptions.filter(function(item) {
    return item.code === '全部';
  });
  // 排除【全部】的其他选项
  var otherOptions = allOptions.filter(function(item) {
    return item.code !== '全部';
  });
// 全部判断
module.controller('allotherCtrl', function() {
  var vm = this;
  // 已选项
  vm.codes = '';
  // 下拉项
  vm.options = [].concat(allOptions);
  // 下拉选择事件
  vm.onSelect = function (item, model){
    console.log('onSelect', item, model, vm.codes);
    // 选项为【全部】或已选项个数等于其他项个数时，清空下拉项并设置已选项为【全部】
    if (model === '全部' || otherOptions.length === vm.codes.length) {
      vm.options = oneOptions;
      vm.codes = ['全部'];
    }
  };
  // 移除事件
  vm.onRemove = function (item, model){
    console.log('onRemove', item, model, vm.codes);
    // 移除【全部】选项时，显示其他下拉项
    if (model === '全部') {
      vm.options = [].concat(allOptions);
    }
  };
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
