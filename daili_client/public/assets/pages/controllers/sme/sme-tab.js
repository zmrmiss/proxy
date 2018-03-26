/**
 */
/**
 * 导出记录
 */
angular.module('App').controller('SmeTabCtrl', function($rootScope, $scope) {

    $scope.tabs = [
        {title: '体验1', url: 'sme.send'},
        {title: '体验2', url: 'sme.send2'},
        {title: '体验3', url: 'sme.send3'},
        {title: '体验4', url: 'sme.send4'},
    ];

    $scope.currentTab = 'sme.send';

    $scope.onClickTab = function(tab) {
        $scope.currentTab = tab.url;
    };

    //代理待使用(测试)
    $scope.$on('$stateChangeSuccess',function (ev, to, toParams, from, fromParams) {
        if(to.name=='sme.record'){
            $scope.BeBack=true;
        }else {
            $scope.BeBack=false;
        }
        // console.log(to)
    })

    $scope.isActiveTab = function(url) {
        return url == $scope.currentTab;
    }

});