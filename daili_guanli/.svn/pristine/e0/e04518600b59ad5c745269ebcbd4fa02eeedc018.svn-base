/**
 * 个人资料
 *
 */
angular.module('App').controller('DlAccountTelCtrl', function($rootScope,$http, $scope, $ajax,$uibModal) {

    $scope.currentTab = 'account.telephone';

    $scope.isActiveTab = function(url) {
        return url == $scope.currentTab;
    };
    //
    $scope.data = {
        contact1: '',
        contact1_mobile: '',
    };
    // $scope.data={};
    $scope.load = function() {
        $ajax.get('/api/setting/Telephone/show/', $.param({}), function(result) {
            $scope.data = result;
        })
    };
    $scope.load();


    $scope.modify = function() {
        $ajax.post('/api/setting/Telephone/edit/',$.param({
            sms_telephone:$scope.data
        }),function () {
            layer.msg('保存成功', {time: 1500, icon: 1});
        })



    }


});
