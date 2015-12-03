//var rows[0]

var app = angular.module('myApp', []);
app.controller('myCtrl',function ($scope){
    $scope.roofSystem='Title';
    $scope.windthRegion="a";
    $scope.height=5;
    $scope.width=808;
    $scope.thick=35;
    $scope.power=190;
    $scope.number=1;
    $scope.row=1;
    $scope.rows = function(){
        for(i = 0; i < $scope.row; i++){
            
        }
        return [];
    };
    $scope.errorMessage="";
    /********* calculate total power *********/
   
    $scope.totalPower = function() {return ($scope.power * $scope.number)/1000 };
   
    /********* calculate the space  **********/
    
    $scope.space = function(){
        switch ($scope.roofSystem){
            case "tile":
                switch ($scope.windRegion){
                    case "a":
                        if($scope.height>0 & $scope.height<7.5){
                        return 1400;
                    }else if($scope.height < 12.5){
                        return 1340;
                    }else if($scope.height >=12.5){
                        return 1300;
                    }else{
                        return "height should greater than 0";
                    };
                        break;    
                    case "b":
                        if($scope.height>0 & $scope.height<7.5){
                        return 1050;
                    }else if(height < 12.5){
                        return 980;
                    }else if(height >=12.5){
                        return 920;
                    }else{
                        return "height should greater than 0";
                    };
                        break;
                    case "c":
                        if($scope.height>0 & $scope.height<7.5){
                        return 720;
                    }else if($scope.height < 12.5){
                        return 700;
                    }else if(height >=12.5){
                        return 680;
                    }else{
                        return "height should greater than 0";
                    };
                        break;
                    case "d":
                        if($scope.height>0 ){
                        return 500;
                    }else{
                        return "height should greater than 0";
                    };
                        break;
                    
                    default:
                        $scope.errorMessage = "You must choose one of the wind Region.";
                        return 0;
                };
               
                $scope.errorMessage = "";
                return "tile";
                break;
            case "tin":
                $scope.errorMessage = "";
                return "tin";
                break;
            case "flat":
                return "flat";
                $scope.errorMessage = "";
                break;
            default:
                $scope.errorMessage = "You must choose one of the roof system."
                return "0"
        };
    };

/* calculate the marital needs */
    $scope.rail=;
    
 
    /*********finish calculate total power *********/
});
                
