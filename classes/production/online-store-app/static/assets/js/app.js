define(['angularAMD', 'angular', 'angular-ui-router', 'angular-resource', 'angular-toaster', 'js/service'], function (angularAMD) {
    'use strict';
    var app = angular.module('storeApp', ['ui.router', 'ngResource', 'toaster', 'storeService']);
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', angularAMD.route({
                url: '/home',
                templateUrl: '/assets/views/home/home.html',
                controller: 'homeCtrl',
                controllerUrl: 'js/home/homeCtrl'
            }))
            .state('user', angularAMD.route({
                url: '/user',
                templateUrl: 'assets/views/user/user.html',
                controllerUrl: 'assets/js/user/user'
            }))
            .state('ProductItem', angularAMD.route({
                url: '/product/:productId',
                templateUrl: 'assets/views/product/product-detail.html',
                controller: 'ProductItemCtrl',
                controllerUrl: 'js/product/product'
            }))
            .state('cart', angularAMD.route({
                url: '/cart',
                templateUrl: 'assets/views/cart/cart.html',
                controllerUrl: 'assets/js/cart/cart'
            }))
            .state('order', angularAMD.route({
                url: '/order',
                templateUrl: 'assets/views/order.html',
                controllerUrl: 'assets/js/order/order'
            }));

        // Else
        $urlRouterProvider.otherwise('/home');
    }]);

    app.filter('rawHtml', ['$sce', function ($sce) {
        return function (val) {
            return $sce.trustAsHtml(val);
        };
    }]);

    // angularAMD.bootstrap(app); // 不要在这里启动app，因为这样会直接开始渲染页面，而某些controller、filter、config等此时可能还没有从服务器获取下来或者还没有加载完成(即app.controller、app.config等还没有执行完毕)，这时加载就会报错或者功能不全，应该在main.js里面的require语句里面加载完所有的依赖后，在回调函数里面启动app：angularAMD.bootstrap(app)
    return app;
});