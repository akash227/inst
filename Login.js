
Messages = new Mongo.Collection('msgs');
if (Meteor.isClient) {
  angular.module('InstaHire').controller('Login',function($rootScope, $state, $scope,$meteor,$location,$anchorScroll){
    if(!$rootScope.previousState.data.value){
       if(Meteor.user().profile.userType == 'hire')
          $state.go('map');
        else
          $state.go('reqfeed');
    }   
//    $("#list").scrollTop($("#list")[0].scrollHeight);
   //$('#list').animate({scrollTop: $('#list').prop(&quot;scrollHeight&quot;)}, 500);


   var chatid;
   $scope.show = true;
   $scope.me = Meteor.userId();
   $scope.guest = $rootScope.previousState.data.value;
   $scope.showSend = false;

   if(Messages.findOne({me:$scope.me,guest:$scope.guest})){
      chatid = Messages.findOne({me:$scope.me,guest:$scope.guest})._id;
   } else if(Messages.findOne({me:$scope.guest, guest:$scope.me})){
      chatid = Messages.findOne({me:$scope.guest, guest:$scope.me})._id;
   }else{
      Messages.insert({me:$scope.me,guest:$scope.guest});
      chatid = Messages.findOne({me:$scope.me,guest:$scope.guest})._id;
   }
      var q = Messages.find({_id: chatid});
    $scope.messages = $meteor.collection(function(){
        return q;
    });   
    console.log($scope.messages);
    $scope.messages = $scope.messages[0].messages;
    console.log($scope.messages);
    $scope.scroll = function(){
        $location.hash('msgItem-'+(Messages.find().count()-1));
        $anchorScroll();
    }
  $scope.sendMsg = function(){
    Messages.update(
      {_id: chatid},
      {"$push": { "messages": {time: new Date(), sentBy: $scope.me, message: $scope.txt}} }
      );
    Materialize.toast("Sent! :)", 3000, 'rounded');
    $scope.txt = "";
    setTimeout(function(){
      window.scrollTo(0, document.body.scrollHeight);
    },1000);
  },
  $scope.toggleSendMsg = function(){
    $scope.showSend = $scope.showSend === false ? true: false;
    window.scrollTo(0, document.body.scrollHeight);
  },
  $scope.deleteAll = function(){
    Meteor.call('removeAll');
  },

  $scope.clicked = function($event){
    if($event.target.id.indexOf("msgSender") < 0  ){
       $scope.showSend = false;
    }
   };
}); 
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

  });
}
