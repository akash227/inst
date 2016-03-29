if(Meteor.isClient){
angular.module('InstaHire').controller('IndexCtrl',function($state, $meteor, $scope, $rootScope, $http){

    $(".button-collapse").sideNav();
    $scope.logout = function(){
         $meteor.logout().then(function(){
            Materialize.toast("Bye :)", 3000, 'rounded');
            $state.go('index')
          },function(err){
            Materialize.toast(err.reason, 3000, 'rounded');
          });
       };
       $scope.check = function(){
          if(Meteor.user())
           return Meteor.user().profile.userType == 'hire'; 
         return false;
       }
       $scope.checkLogIn = function(){
          if(Meteor.user()){
           return true; 
          }
         return false;
       }
       $scope.goHome = function(){
        if(Meteor.user().profile.userType == 'hire')
          $state.go('map');
        else
          $state.go('reqfeed');
       }
});
}