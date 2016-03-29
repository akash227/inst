if(Meteor.isClient){

angular.module('InstaHire').controller('ReqCtrl',function($state,$scope, $rootScope, $location){
     if(!$rootScope.previousState.data.category){
       if(Meteor.user().profile.userType == 'hire')
          $state.go('post');
        else
          $state.go('reqfeed');
    }   
	$scope.category = $rootScope.previousState.data.category;
    $('.collapsible').collapsible();
    $('.datepicker').pickadate({
   	 	selectMonths: true, 
    	selectYears: 15 
 	 });
    var domain = {
    	"Marketing Experts":["1","2","3"],
    	"Web Developers":["Front-end development","Back-end Development","Full Stack Development","AngularJS Development","Rails Development"],
    	"Accountants":["1","2","3","4","5"],
    	"Mobile App Developers":["iOS Development","Android Development","Hybrid Development","Ionic Develpment","UI Design"],
    	"Writers":["1","2","3","4","5"]
    };
    $scope.domains = domain[$scope.category];
    $scope.submit = function(){
        $scope.bidding = $("#bidding").val();
        $scope.submission = $("#submission").val();
        Requirements.insert({
            category: $scope.category,
            req: $scope.reqValue,
            bidDate: $scope.bidding,
            submDate: $scope.submission,
            desc: $scope.projectDesc,
            postedByID: Meteor.userId(),
            postedBy: Meteor.user().profile.name,
            bidding: [],
            budget: $scope.budget,
            worker: ''               
        },function(err){
            if(err){
                Materialize.toast(err.reason, 3000, 'rounded')
            }else{
                Materialize.toast("Posted!" , 3000, 'rounded');
                $state.go('post');
            }            
        });
    }
});
}
