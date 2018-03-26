/**
 * 个人
 *
 */
angular.module('App').controller('DlAccountTabCtrl', function($rootScope, $scope, $ajax) {

    $scope.tabs = [
        {title: '站点标题', url: 'account.install'},
        {title: '站点LOGO', url: 'account.logo'},
        {title: '客服电话', url: 'account.telephone'}
    ];

    $scope.tabs2 = [
        {title: '修改密码', url: 'account.pwd'},
        // {title: '站点LOGO', url: 'account.logo'},
        // {title: '客服电话', url: 'account.telephone'}
    ];

    $scope.currentTab = 'account.install';

    $scope.onClickTab = function(tab) {
        $scope.currentTab = tab.url;
    };

    $scope.isActiveTab = function(url) {
        return url == $scope.currentTab;
    }

});
