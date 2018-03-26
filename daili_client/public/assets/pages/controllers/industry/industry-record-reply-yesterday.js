/**
 * 群发短信
 *
 */
angular.module('App').controller('MessageIndustrydReplyYesterdayCtrl', function($rootScope, $stateParams, $scope, $ajax,$uibModal) {

    $scope.currentTab = 'industry.reply.today';
    $scope.currentTab2 = 'industry.reply.yesterday';

    $scope.isActiveTab = function(url) {
        return url == $scope.currentTab;
    };
    $scope.isActiveRep = function(url) {
        return url == $scope.currentTab2;
    };
    var apindustry=$rootScope.apindustry;
    if(apindustry==undefined){
        apindustry= sessionStorage.getItem("ApiIndustry");
    }


    //分页信息
    $scope.paginationConf = {
        currentPage : $stateParams.currentPage || 1,
        totalItems : 0,
        itemsPerPage : $stateParams.itemsPerPage || 10,
        pagesLength : 10,
        perPageOptions : [ 10, 20, 30, 40, 50 ],
        onChange : function() {
            $scope.load();
        }
    };
    $scope.params = {};

    $scope.tableData = [];
    $scope.load = function() {
        var data={username : apindustry,page : $scope.paginationConf.currentPage,limit : 10, day : -1 ,scope:1};
        $ajax.post('/api/bridge2/Reply/items',$.param(data),function (result) {
            // alert(result);
            // console.log(result)
            $scope.tableData = result.list;
            $scope.paginationConf.totalItems = result.count;
        });
    };
    $scope.load();

});
