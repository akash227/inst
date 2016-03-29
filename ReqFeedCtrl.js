if(Meteor.isClient){
angular.module('InstaHire').controller('ReqFeedCtrl',function($http, $meteor, $state,$scope, $rootScope, $location){
    $('.collapsible').collapsible();
   	if(Meteor.user()){
   		if(Meteor.user().profile.userType == 'hire'){
   			$scope.bidd = true;
		    $scope.requirements = $meteor.collection(function(){
		    	return Requirements.find({postedByID: Accounts.userId()});
		    });       			
   		}else{
   			$scope.bidd = false;
		    $scope.requirements =  $meteor.collection(function(){
          return Requirements.find();
        });              			
   		}	        	 
   	}
    $scope.currId = 0;
    $scope.modal = function(id){
    	$scope.currId = id;
        $('#modal1').openModal();
    };
    $scope.reqFilter = function(worker){
      if(worker == '  '){
        return true;
      }
      if(Meteor.user().profile.userType == 'hire'){
        return true;
      }
      if(worker == Accounts.userId()){
        return true;
      }
      return false;
    }
    $scope.acceptBid = function(id, bid){
      console.log(id);
      $scope.wid = Requirements.findOne({_id: id});
        Requirements.update(
                {_id: $scope.wid._id},
                {$set:{"worker" : bid}});
    	$scope.phno = Meteor.users.findOne({_id: bid}).profile.mobile;
    	$scope.bidd = false;
    	Materialize.toast("Bid Accepted!" , 3000, 'rounded');
    	$state.current.data.value = bid;
    	/*var api = 'http://www.smszone.in/sendsms.asp?page=SendSmsBulk&username=919500881944&password=DE0B&number=91' + $scope.phno +
    	'&message=' + 'Your Bid for "' + $scope.requirements[id].req + '" has been accepted!';
      */ /* $http.post(api).then(function(){
              $state.go('chat');
            }); */
    }
     $scope.check = function(){
       	if(Meteor.user())
	       return Meteor.user().profile.userType != 'hire';	
    	 return false;
     }
     $scope.chat = function(id){
     	$state.current.data.value = $scope.requirements[id].postedByID;
     	$state.go('chat');
     }
    $scope.placeBid = function(){
    	var x = $scope.requirements[$scope.currId].bidding;
    	x.push({
    		bidAmt: $scope.bidAmt,
    		bidByID: Meteor.userId(),
    		bidBy: Meteor.user().profile.name
    	});
    }
});
}