/**
 */
/**
 * 导出记录
 */
angular.module('App').controller('ClientsTabCtrl', function($rootScope, $scope) {

    // $scope.tabs = [
    //     {title: '体验1', url: 'sme.send'},
    //     {title: '体验2', url: 'sme.send2'},
    //     {title: '体验3', url: 'sme.send3'},
    //     {title: '体验4', url: 'sme.send4'},
    // ];

    $scope.tabs = [
        {title: '接口签名', url: 'clients.sign'},
        {title: '群发签名', url: 'clients.signMass'},
    ];

    $scope.tabsMoudle = [
        {title: '接口模板', url: 'clients.template'},
        {title: '群发模板', url: 'clients.templateMass'},
    ];

    $scope.currentTab = 'clients.sign';

    $scope.onClickTab = function(tab) {
        $scope.currentTab = tab.url;
    };

    $scope.isActiveTab = function(url) {
        return url == $scope.currentTab;
    }

    $scope.currentTab = 'proxy.manage';

    $scope.onClickTab = function(tab) {
        $scope.currentTab = tab.url;
    };

    // // //代理待使用(测试)
    // $scope.$on('$stateChangeSuccess',function (ev, to, toParams, from, fromParams) {
    //     if(to.name=='proxy.manage'){
    //         $scope.DLBeBack=false;
    //     }else {
    //         $scope.DLBeBack=true;
    //     }
    //     // console.log(to)
    // })

    $scope.isActiveTab = function(url) {
        return url == $scope.currentTab;
    }

});