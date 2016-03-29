var lat = 13.08,longit = 80.27;
var success=function (position){
		lat = position.coords.latitude;
		longit = position.coords.longitude;
	};

if(Meteor.isClient){
	
	Meteor.startup(function () {
 		navigator.geolocation.getCurrentPosition(success);
	});
	var Users = Meteor.users;

	angular.module('InstaHire').controller('SignupCtrl',function($meteor, $state, $scope,$location){
		$scope.workers = $meteor.collection(Workers);
		$('input#input_text, textarea#textarea1').characterCounter();
		$('ul.tabs').tabs();
		$('select').material_select();
		$('#modal1').openModal();
		$scope.checkUser = function(){
			if($scope.userType == 'hire'){
				return false;
			}else{
				return true;
			}
		}
		$scope.setUserType = function(type){
			$scope.userType = type;
		}
		$scope.signup = function(){
			$meteor.createUser({
			      email: $scope.email,
			      password: $scope.password,
			      profile: {
			      	name : $scope.name,
			      	mobile: $scope.mobile,
			      	userType: $scope.userType,
			      	email: $scope.email
			     }
			    }).then(function(){
			    Materialize.toast("Hello " + Meteor.user().profile.name, 3000, 'rounded');
			    if($scope.userType == 'hire'){
			    	$state.go('map');
			    }
			    $(document).ready(function(){			
				   $('ul.tabs').tabs('select_tab', 'level2');
				 });
			  }, function(err){
			      Materialize.toast(err.reason, 3000, 'rounded')
			  });
		};
	  $scope.updateData1 = function( level ){
	  		Users.update(
	  				{_id: Meteor.userId()},
	  				{$set:{ "profile.address": $scope.address, "profile.city": $scope.city, "profile.state": $scope.state, "profile.pincode": $scope.pincode}},
	  				function(err,usr){if(err){
	  					Materialize.toast(err.reason, 3000, 'rounded');
	  				}else{
	  					$('ul.tabs').tabs('select_tab', level);
	  				}
	  			}
	  			);

	  };
	 $scope.updateData2 = function ( level ){
	 		console.log("lat:"+lat+"long:"+longit);
			console.log($scope.category);	 		
			console.log($scope.experience);	 		
			console.log($scope.edu);	 		
			console.log($scope.skills);	 		
	 	Users.update(
	  				{_id: Meteor.userId()},
	  				{$set:{ "profile.latitude": lat, "profile.longitude": longit, "profile.category" : $scope.category,
	  				 "profile.edu" : $scope.edu, "profile.exp" :  $scope.experience, "profile.skill" :  $scope.skills }},
	  				function(err,usr){if(err){
	  					Materialize.toast(err.reason, 3000, 'rounded');
	  				}else{
	  					$('ul.tabs').tabs('select_tab', level);
	  				}
				}
	  			);

	  	// var doc = Workers.findOne({ category : $scope.category });
	  	// Workers.update({ _id : doc._id }, {$inc: {count : 1}, $push : {workers: Meteor.userId()}});

	  	
	 };
	$scope.updateData3 = function ( level ){
	 	Users.update(
	  				{_id: Meteor.userId()},
	  				{$set:{"profile.linkedin" : $scope.linkedin, "profile.github" : $scope.github, "profile.projects" : $scope.linkp, "profile.about" : $scope.tell  }},
	  				function(err,usr){
	  					if($scope.userType == 'hire'){
	  						$state.go('map');
	  					}else{
		  					$state.go('reqfeed');	
	  					}				 
	  			}
	  			);
	};
	});
}
