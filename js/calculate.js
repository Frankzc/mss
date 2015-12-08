//var rows[0]


var rows = [0];
var app = angular.module('myApp', []);
app.controller('myCtrl',function ($scope){
    $scope.formVisible = true;
    $scope.rowsVisible = true;
    $scope.resultVisible = true;
    $scope.roofSystem='Title';
    $scope.windthRegion="a";
    $scope.railLength=null;
    $scope.height=5;
    $scope.width=808;
    $scope.thick=35;
    $scope.power=190;
    $scope.number=1;
    $scope.row=1;
    $scope.rows=function(){
        /*
        for(i = 0; i < $scope.row; i++){
            rows[i] = 0;
        };
        */
        //return rows;
        return $scope.changeLines();
    };
    /*
    function(){
        for(i = 0; i < $scope.row; i++){
            rows[i] = 2;
        }
        return rows;
    };
    */
    $scope.errorMessage="";
    /********* calculate total power *********/
   
    $scope.totalPower = function(){return ($scope.power * $scope.number)/1000 };
   
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
    
/* calculate the total row */
    /*
    $scope.rows = function(){
        return "<input type="number" ng-model="row" value="1">";
    };
    */
    /*
    $scope.rows = function(){
        var rows = [];
        //Init rows
        for(i = 0; i < $scope.row; i++){
            rows[i] = 0;
        }
        return rows;
    };
    */

/* calculate the marital needs */
    //$scope.rail=;
    $scope.lineQty = 5;

    $scope.tempRow = [1,1];
    $scope.rowlen = $scope.tempRow.length;
    $scope.firstL = function(){return 2*($scope.rows()[0] * $scope.width + ($scope.rows()[0] - 1) * 26 +80)/$scope.railLength;};
    
        //rows.length; 
    
    $scope.changeLines = function(){
        if($scope.tempRow.length != $scope.row){
            
            //var len = $scope.tempRow.lenght;
            if($scope.tempRow.length > $scope.row)
            {
                var rowChange = [];
                for(i=0; i<$scope.row; i++){
                    rowChange[i] = rows[i];
                };
                rows = rowChange;
            }else{
                for(i=$scope.tempRow.length; i<$scope.row; i++){
                    rows[i] = 0;
                };
            }
            $scope.tempRow = rows;
            
        };
         return rows;
    };
    

    $scope.hh = function(){
        return rows[0];
        //rows.length; 
    };
    $scope.result = {
        rail: function(){
            var rail_p = 0;
            for(i = 0; i < $scope.row; i++){
                rail_p += 2*($scope.rows()[i] * $scope.width + ($scope.rows()[i] - 1) * 26 +80)/$scope.railLength;
            };
            return rail_p;
            //return (6 * $scope.width + (6 - 1) * 26 +80)/$scope.railLength + 0.499;
            //return $scope.rows.length;
    },
        mid_clamp: function(){
            var mid_clamp_p;
            for(i = 0; i < $scope.row; i++){
                mid_clamp_p += ($scope.rows()[i] - 1) * 2;
            };
            return mid_clamp_p;
        },
        splicer: function(){
            return 2 * rounddown($scope.lineQty/2);
        },
        tile_hook: function(){
            return ((($scope.lineQty*$scope.railLength/2-500)/$scope.space)+1)*2;
        },
        l_feet: function(){
            return ((($scope.lineQty*$scope.railLength/2-500)/$scope.space)+1)*2;
        },
        flat_roof: function(){
            return (($scope.lineQty*$scope.railLength/2-600)/$scope.space)+1;
        }
    };
    
    $scope.resulte = {
        rail: "0",
        mid_clamp: "0",
        splicer: "0",
        tile_hook: "0",
        l_feet: "0",
        flat_roof: "0"
    }
    $scope.resultf = {
        rail: function(){return $scope.result.rail - $scope.resulte.rail},
        mid_clamp: $scope.result.mid_clamp - $scope.resulte.mid_clamp,
        splicer: $scope.result.splicer - $scope.resulte.splicer,
        tile_hook: $scope.result.tile_hook - $scope.resulte.tile_hook,
        l_feet: $scope.result.l_feet - $scope.resulte.l_feet,
        flat_roof: $scope.result.flat_roof - $scope.resulte.flat_roof
    }


/*********** calculate parts  ***************/
    $scope.resulte = function(){return 5};
    $scope.rail = function(){return 2*($scope.lineQty * $scope.width + ($scope.lineQty - 1) * 26 + 80)/$scope.railLength;};
    $scope.rail_e = 0;
    $scope.mid_clamp = function(){return ($scope.lineQty - 1) * 2;};
    $scope.mid_clamp_e = 0;
    $scope.splicer = function(){return 2 * ($scope.rail()/2);};
    $scope.splicer_e = 0;
    $scope.tile_hook = function(){return (($scope.rail()*$scope.railLength/2-500)/$scope.space()+1)*2;}
    //$scope.tile_hook = function(){return $scope.space()};
    $scope.tile_hook_e = 0;
    $scope.l_feet = function(){return ((($scope.rail()*$scope.railLength/2-500)/$scope.space())+1)*2;};
    $scope.l_feet_e = 0;
    $scope.flat_roof =function(){return (($scope.rail()*$scope.railLength/2-600)/$scope.space())+1;};
    $scope.flat_roof_e = 0;
    
    $scope.showRows = function(){
        $scope.rowsVisible = true;
        //var rows = [];
        /*
        for(i = 0; i < $scope.row; i++){
            $scope.rows[i] = "a";
        };
        */
    };
    /*********finish calculate total power *********/
});
/*         
function hiddeform(){
    $('.c_form').css.("display","hidden");
};
*/