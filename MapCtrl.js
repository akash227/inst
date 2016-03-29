
if(Meteor.isClient){

angular.module('InstaHire').controller('MapCtrl',function($state, $meteor, $scope, $rootScope, $http){
    var data = {};
    
    if(Meteor.user().profile.userType != 'hire')      
      $state.go('reqfeed');
 
    $scope.users = $scope.$meteorCollection(function () {
        return Meteor.users.find({"profile.userType":"work"});
    });
    $scope.markers = [];
    $scope.lat = 13.08;
    $scope.longit = 80.27;
   if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function showPosition(position) {
            $scope.lat = position.coords.latitude;
            $scope.longit =  position.coords.longitude;
        });
    }
    
    for(var i = 0; i < $scope.users.length; ++i){

        if($scope.users[i]._id != Meteor.userId()){
            var iconC;
            if($scope.users[i].profile.category == "Web Developer"){
                iconC = 'http://maps.google.com/mapfiles/ms/icons/blue.png'
            }else{
                iconC = 'http://maps.google.com/mapfiles/ms/icons/green.png'
            }
            x = {
               id: $scope.users[i]._id,
               latitude: $scope.users[i].profile.latitude,
               longitude: $scope.users[i].profile.longitude,
               title: [$scope.users[i].profile.name,i],
               cat: $scope.users[i].profile.category,
               email: $scope.users[i].email,
               icon: iconC   
            }
            $scope.markers.push(x);
        }
    }
    console.log($scope.markers);
        data.map = {
            center: {
                latitude: $scope.lat,
                longitude: $scope.longit
            },
            markers: $scope.markers,
            markersEvents: {
                click: function(marker, eventName, model, arguments) {
                    console.log('Marker was clicked (' + marker + ', ' + eventName);
                    $scope.map.window.model = model;
                    $scope.map.window.title = model.title[0];
                    

                    //move value
                    $state.current.data.value = model.id;
                    //console.log($scope.users[model.title[1]].emails[0].address);
                    

                    $scope.map.window.show = true;
                    
                }
            },
            window: {
                marker: {},
                show: false,
                closeClick: function() {
                    this.show = false;
                },
                options: {}, 
                title: ''
            }
        };

        $scope.closeClick = function () {
            this.window = false;
        };
        $scope.showProfile = function(id){
            $state.current.data.value = id;
            $state.go('profile');
        }
        $scope.map = data.map;
       
});
}