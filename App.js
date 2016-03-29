Requirements = new Mongo.Collection('requirements');
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
           .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'LoginCtrl'
          })
          .state('chat', {
            url: '/chat',
            templateUrl: 'chattie.html',
            controller: 'Login',
            resolve: {
                   "currentUser": function ($meteor) {
                     return $meteor.requireUser();
                   }
                 }
          })
            .state('post', {
            url: '/post',
            templateUrl: 'post.html',
            controller: 'PostCtrl',
            data : {
              category : "None"
            },
            resolve: {
                   "currentUser": function ($meteor) {
                     return $meteor.requireUser();
                   }
                 }
          })
            .state('map', {
            url: '/map',
            templateUrl: 'map.html',
            controller: 'MapCtrl',
            data : {
              value : "None"
            },
            resolve: {
                   "currentUser": function ($meteor) {
                     return $meteor.requireUser();
                   }
                 }
          })
          .state('reqForm', {
            url: '/reqForm',
            templateUrl: 'reqForm.html',
            controller: 'ReqCtrl',
            data : {
              category : "None"
            },
            resolve: {
                   "currentUser": function ($meteor) {
                     return $meteor.requireUser();
                   }
                 }
          })
          .state('profile', {
            url: '/profile',
            templateUrl: 'profile.html',
            controller: 'ProfileCtrl',
            data : {
              category : "None"
            },
            resolve: {
                   "currentUser": function ($meteor) {
                     return $meteor.requireUser();
                   }
                 }
          })
          .state('reqfeed', {
            url: '/reqfeed',
            templateUrl: 'reqfeed.html',
            controller: 'ReqFeedCtrl',
            data : {
              value : "None"
            },
            resolve: {
                   "currentUser": function ($meteor) {
                     return $meteor.requireUser();
                   }
                 }
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
      $rootScope
              .$on('$stateChangeStart', 
                  function(event, toState, toParams, fromState, fromParams){ 
                      NProgress.start();
              });

      $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
           NProgress.done();
          $rootScope.previousState = from;
          if(to.name == 'signup'){
              $('ul.tabs').tabs();
          }
      });
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}