if(Meteor.isClient){
	angular.module('InstaHire').controller('ProfileCtrl',function($state, $meteor, $scope, $rootScope, $http){
		$scope.id = $rootScope.previousState.data.value;
		$state.current.data.value = $scope.id;
		$scope.user = Meteor.users.findOne({_id: $scope.id});
	});
}
