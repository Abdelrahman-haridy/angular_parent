var productsVar = angular.module('Products', ['ngRoute']);

productsVar.controller('ProductsController', [ '$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    'use strict';
    $http.get('js/products.json').success(function (data) {
        $scope.products = data;
    });
    
    $timeout(function () {
        
        if($(window).width() >= 600 ) {
            $('#sidebar_collapse_open').click(function(){
                $(this).hide();
                $('#sidebar_collapse_close').show();
                $('.sidebar').css('width', '200px').addClass('open');
                $('.main_content').css('margin-left', '200px');
                $('.sidebar ul a span').css('display', 'block');
            });
            $('#sidebar_collapse_close, .products a').click(function(){
                $(this).hide();
                $('#sidebar_collapse_open').show();
                $('.sidebar').css('width', '42px').removeClass('open');
                $('.main_content').css('margin-left', '42px');
                $('.sidebar ul a span').css('display', 'none');
            });
        } else {
            $('#sidebar_collapse_open').click(function(){
                $(this).hide();
                $('#sidebar_collapse_close').show();
                $('.sidebar').css('width', '200px').addClass('open');
                $('.sidebar ul a span').css('display', 'block');
            });
            $('#sidebar_collapse_close, .products a').click(function(){
                $(this).hide();
                $('#sidebar_collapse_open').show();
                $('.sidebar').css('width', '42px').removeClass('open');
                $('.sidebar ul a span').css('display', 'none');
            });
        }

    }, 1000);
}]);



productsVar.controller('singleController', [ '$scope', '$http', '$location', '$routeParams', '$timeout', function($scope,$http,$location,$routeParams, $timeout) {
    
    $http.get('js/products.json').success(function (data) {
        $scope.products = data;
        $scope.productSingle = $routeParams.singleId;
    });
    $scope.home = function() { $location.path('/index'); }
    
}]);




productsVar.config(function($routeProvider) {
    $routeProvider
    .when('/',
        {
            templateUrl : 'partial/home.html',
            controller : 'ProductsController'
        }
    )
    .when('/single/:singleId',
        {
            templateUrl : 'partial/single.html',
            controller : 'singleController'
        }
    )
    .otherwise({ redirectTo : '/'})
});

