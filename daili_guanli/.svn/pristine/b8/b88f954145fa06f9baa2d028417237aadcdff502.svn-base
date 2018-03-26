/**
 * 个人资料
 *
 */
angular.module('App').controller('DlAccountInstallCtrl', function($rootScope,$http, $scope, $ajax,$uibModal) {

    $scope.currentTab = 'account.install';

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
        $ajax.get('/api/setting/Title/show/', $.param({}), function(result) {
            $scope.data = result;
            if(result.other&&result.other.title_switch==1){
                $scope.hasSetoffBT=true
            }
        })
    };
    $scope.load();

    $scope.Title = function() {
        if($scope.hasSetoffBT){
            $scope.title_switch=1;
            if($scope.data.other.sms_title==''){
                layer.msg('请输入站点名称!',{icon:2,time:2000});
                return false;
            }
        }else {
            $scope.title_switch=0;
        }
        $ajax.post('/api/setting/Title/edit/',$.param({
            title_switch:$scope.title_switch,
            sms_title:$scope.data.other.sms_title
        }),function () {
            layer.msg('保存成功', {time: 1500, icon: 1});
        })
    }
});
