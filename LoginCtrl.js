if(Meteor.isClient){
angular.module('InstaHire').controller('LoginCtrl',function($scope,$rootScope,$meteor,$state,$location){
  if(Meteor.user() ){
    if(Meteor.user().profile.userType == 'hire')
      $state.go('map');
    else
      $state.go('reqfeed');
  }
    $scope.login = function()
    {
        NProgress.start();
       $meteor.loginWithPassword($scope.loginMail, $scope.loginPassword).then(function(){
          NProgress.done();

        Materialize.toast("Hello " + Meteor.user().profile.name, 3000, 'rounded');
        if(Meteor.user().profile.userType == 'hire')
          $state.go('map');
        else
          $state.go('reqfeed');
       },function(err){
          NProgress.done();

        Materialize.toast(err.reason, 3000, 'rounded');
       });
    }
  });
}
