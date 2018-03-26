/**
 * 系统消息
 *
 */
angular.module('App').controller('ClientsMySignMassCtrl', function($rootScope, $stateParams, $uibModal, $scope, $ajax , $state) {

    $scope.currentTab = 'clients.signMass';

    $scope.statusDataSI = [{name:"不限",status:""},
        {name:"待审核",status:0},
        {name:"已通过",status:1},
        {name:"已驳回",status:2}
    ];
    $scope.isActiveTab = function(url) {
        return url == $scope.currentTab;
    };



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
        $ajax.post('/api/report/SignatureMass/items/', $.param({
            limit: $scope.paginationConf.itemsPerPage,
            page: $scope.paginationConf.currentPage,
            telephone : $scope.params.telephone,
            keyword : $scope.params.keyword,
            child_username : $scope.params.child_username,
            status : $scope.params.status
        }), function (result) {
            $scope.tableData = result.list;
            $scope.paginationConf.totalItems = result.count;
        });
    };
    $scope.load();

    $scope.search = function () {
        $scope.load();
    }

    //查看详情
    $scope.SignDetailsMass = function(id) {

        $ajax.post('/api/report/SignatureMass/review/',$.param({id:id}),function (details) {
            $uibModal.open({
                backdrop: 'static',
                templateUrl: 'SignDetailsMass.html',
                controller: 'DlSignDetailsMassCtrl',
                size:'md',
                resolve:{
                    data : function(){
                        return {
                            item: angular.copy(details),
                            callback: function() {
                                $scope.load();
                            }
                        }
                    }
                }
            });
        })

    };

});
//查看详情
angular.module('App').controller('DlSignDetailsMassCtrl', function($rootScope, $stateParams, $scope, $ajax, $uibModalInstance, data) {

    $scope.data = data.item;
    $scope.cancel = function () {
        $uibModalInstance.dismiss(0);
    };
});

