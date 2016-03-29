if(Meteor.isClient){

angular.module('InstaHire').controller('PostCtrl',function($state,$scope,$location){
//	console.log($state.current);
$scope.chooseCat = function(name){
	$state.current.data.category = name;
	$state.go('reqForm');
}
});
}