
var rows = [0];

var app = angular.module('myApp', []);

app.controller('myCtrl',function ($scope){
    $scope.formVisible = true;
    $scope.rowsVisible = false;
    $scope.resultVisible = false;
    $scope.orderVisible = true;
    $scope.roofSystem='Title';
    $scope.windthRegion="a";
    $scope.railLength=null;
    $scope.height=5;
    $scope.width=808;
    $scope.thick=35;
    $scope.power=190;
    $scope.number=4;
    $scope.row=1;
    
    $scope.rows=function(){
        return $scope.changeLines();
    };
    $scope.errorMessage="";
    
    // calculate total power 
   
    $scope.totalPower = function(){return ($scope.power * $scope.number)/1000 };
   
    // calculate the space  
    
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
    $scope.tempRow = [1,1];
//四舍五入加
    $scope.roundup = function(num){
        num = num - num % 1 + 1;
        return num;
    };
//四舍五入减
    $scope.rounddown = function(num){
        num = num - num % 1;
        return num;
    };
//这个方法是用于控制太阳能板行数的增减
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
    
    //计算公式，计算每行各种配件数量
    $scope.calcu = {
        //rail 单行计算， 输入行号减1
        rail: function(rowNum){
            return 2*($scope.rows()[rowNum] * $scope.width + ($scope.rows()[rowNum] - 1) * 26 +80)/$scope.railLength;
        },
        //tile_hook 单行计算， 输入行号减1
        tile_hook: function(rowNum){
            return $scope.roundup(($scope.calcu.rail(rowNum) * $scope.railLength / 2 - 500) / $scope.space()+1)*2;
        },
        //l_feet 单行计算， 输入行号减1
        l_feet: function(rowNum){
            return $scope.roundup(($scope.calcu.rail(rowNum) * $scope.railLength / 2 - 500) / $scope.space()+1)*2;
        },
        //flat_roof 单行计算， 输入行号减1
        flat_roof: function(rowNum){
            return $scope.roundup(($scope.calcu.rail(rowNum) * $scope.railLength / 2 - 600 ) / $scope.space() ) + 1;
        }
    };
    //计算合计配件数量
    
    $scope.result = {
        //计算导轨
        rail:{
            no:1,
            item_no:"MSR834",
            item_name:"Rail834",
            item_Description:"M8-3400",
            name:"Rail:",
            partsQty: function(){
                var rail_p = 0;
                for(i = 0; i < $scope.row; i++){
                    //导轨计算公式，使用calu计算每行导轨数量并在此汇总。
                    rail_p += $scope.calcu.rail(i);
                };
                return $scope.roundup(rail_p);
            },
            //计算合计配件套数
            kitsQty: function(){
                return $scope.kitsNumber($scope.result.rail.partsQty() , 4);
            }
        },
        //计算 端卡
        end_clamp: {
            no:2,
            item_no:"MSE35",
            item_name:"END Clamp-35",
            item_Description:"END Clamp 35",
            name:"End Clamp:",
            partsQty: function(){
            //端卡计算公式
                var end_clamp_p = 2 * $scope.rows().length;
                return end_clamp_p;  
            },
            kitsQty: function(){
                return $scope.kitsNumber($scope.result.end_clamp.partsQty() , 8);
            }
        }, 
        //计算 中卡
        mid_clamp: {
            no:3,
            item_no:"MSM35",
            item_name:"Mid Clamp-35",
            item_Description:"Mid Clamp 35",
            name:"Mid Clamp:",
            partsQty: function(){
                var mid_clamp_p = 0;
                //中卡计算公式，
                for(i = 0; i < $scope.row; i++){
                    if($scope.rows()[i] > 0){
                        mid_clamp_p += ($scope.rows()[i] - 1) * 2;
                    }  
                };
                return mid_clamp_p;
            },
            kitsQty: function(){
                return $scope.kitsNumber($scope.result.mid_clamp.partsQty() , 12);
            }      
        },
        
        //计算splicer
        
        splicer: {
            no:6,
            item_no:"MSSPL",
            item_name:"Splicer",
            item_Description:"connect two rails",
            name:"Splicer",
            partsQty: function(){
                var splicer_p = 0;
                for(i = 0; i < $scope.row; i++){
                    //splicer 计算公式
                    splicer_p += 2 * $scope.rounddown($scope.result.rail.partsQty() / 2);
                };
                return splicer_p;
            },
            kitsQty: function(){
                return $scope.kitsNumber($scope.result.splicer.partsQty() , 2);
            }
        },
        
        //计算tile hook
        tile_hook: {
            no:4,
            item_no:"MSTSS",
            item_name:"Tile Hook",
            item_Description:"for tile roof",
            name:"Tile Hook:",
            partsQty: function(){
                var tile_hook_p = 0;
                for(i = 0; i < $scope.row; i++){
                    //tile hook 各行汇总计算公式
                    tile_hook_p += $scope.calcu.tile_hook(i);
                };
                return tile_hook_p;
            },
            kitsQty: function(){
                return $scope.kitsNumber($scope.result.tile_hook.partsQty() , 12);
            }
        },
        
        l_feet: {
            no:5,
            item_no:"MSLFT",
            item_name:"L Feet",
            item_Description:"for tin roof",
            name:"L Feet",
            partsQty: function(){
                var l_feet_p = 0;
                for(i = 0; i < $scope.row; i++){
                    //L_feet 各行汇总计算公式
                    l_feet_p += $scope.calcu.l_feet(i);
                };
                return l_feet_p;
            },
            kitsQty: function(){
                return $scope.kitsNumber($scope.result.l_feet.partsQty(), 16);
            }
        },
   
        flat_roof: {
            no:8,
            item_no:"MSLFT",
            item_name:"MSTKT/MSTKT-10/MSTKT-L",
            item_Description:"for flat roof",
            name:"Tilt leg",
            partsQty: function(){
                var flat_roof_p = 0;
                for(i = 0; i < $scope.row; i++){
                    //flat_roof 各行汇总计算公式
                    flat_roof_p += $scope.calcu.flat_roof(i);
                };
                return flat_roof_p;
            },
            kitsQty: function(){
                return $scope.kitsNumber($scope.result.flat_roof.partsQty(), 4);
            }
        }
    
    };
    

//计算kit数量,参数格式(order配件数量，每套配件数量)，输出结果为应采购配件数量
    
    $scope.kitsNumber = function(partsQty ,kitsQty){
        if(partsQty <= 0){
            return 0;
        }else if(partsQty < kitsQty){
            return 1;
        }else if(partsQty % kitsQty == 0){
            return partsQty / kitsQty;
        }else{
            return $scope.rounddown( partsQty / kitsQty ) + 1;
        }; 
    };
  
    // 当点击 用户填好数值 next 按钮时，显示需要安装的行数
    $scope.showRows = function(){
        $scope.rowsVisible = !$scope.rowsVisible;
    };
    
    $scope.showResult = function(){
        $scope.resultVisible = !$scope.resultVisible;
    };
    $scope.printOrder = function(){
        $scope.printDiv("order");
    };
    
     //print a orderlist
    $scope.printDiv = function(divName) {
      var printContents = document.getElementById(divName).innerHTML;
      var popupWin = window.open('', '_blank', 'width=300,height=300');
      popupWin.document.open();
      popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</html>');
      popupWin.document.close();
    };
  
});
