Workers = new Mongo.Collection('workers');
if (Meteor.isClient) {
   $(document).ready(function(){
    $('select').material_select();
  });
   
  var app = angular.module('InstaHire', ['angular-meteor', 'ui.router', 'uiGmapgoogle-maps']);
    app.config(function($urlRouterProvider, $stateProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $stateProvider
          .state('index', {
            url: '/index',
            templateUrl: 'index.html',
          })
          .state('signup', {
            url: '/signup',
            templateUrl: 'signup.html',
            controller: 'SignupCtrl'
          })
          .state('chat', {
            url: '/chat',
            templateUrl: 'chattie.html',
            controller: 'Login'
          });
        $urlRouterProvider.otherwise("/");
      });
    app.directive('index', function() {
      return {
        templateUrl: 'index.html'
      };
    });
    app.directive('map', function() {
      return {
        templateUrl: 'map.html'
      };
    });
    app.directive('chattie', function() {
      return {
        templateUrl: 'chattie.html'
      };
    });
    app.run(function($rootScope){
      $rootScope.previousState;
      $rootScope.currentState;
      $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
          $rootScope.previousState = from;
          if(to.name == 'signup'){
              $('ul.tabs').tabs();
              alert("Hello!");
          }
      });
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
