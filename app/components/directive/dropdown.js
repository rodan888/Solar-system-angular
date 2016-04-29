
app.directive("dropdown", function() {
  return {
    restrict: 'A', 
    link: function(scope) {
      scope.selectedIndex = -1,
      scope.innerHeight = window.innerHeight, 
      scope.toggleSelect = function(ind){              
        if( ind === scope.selectedIndex ){
          scope.selectedIndex = -1;
        } else{
          scope.selectedIndex = ind;
        }
      },    
      scope.getClass = function(ind){
        if( ind === scope.selectedIndex ){
          return "selected";
        } else{
          return "";
        }
      },      
      scope.activeButton = function() {
        scope.classFactory.active = !scope.classFactory.active;
      }  
    }
  }
});  

app.directive('btnMenu', function() {
  return{
      restrict: 'E',
      replace: true,
      templateUrl: 'components/templates/menu-button.html'
    }
});

app.directive('sortBy', function() {
 return{
  restrict: 'A',     
  link: function($scope){   
   $scope.sortByS  = false,
   $scope.sortByB = false,
   $scope.sortType = '',

   $scope.sortFnc = function(){  
   console.log($scope.sortType); 
     if ($scope.sortByB == false) {
     $scope.sortByB = true;
     $scope.sortByS = false;
    }else{
     $scope.sortByB = false;
     $scope.sortByS = true;     
    };
   }
  }  
 }
});