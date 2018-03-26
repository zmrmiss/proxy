/**
 * 订单
 *
 */
angular.module('App').controller('DlOrderTabCtrl', function($rootScope, $scope, $ajax) {

    $scope.tabs = [
        {title: '订单', url: 'orders.all'},
        // {title: '已支付', url: 'orders.paid'},
        // {title: '未支付', url: 'orders.nopaid'}
    ];

    $scope.tabs3 = [
        {title: '充值记录', url: 'orders.record'},
        // {title: '已支付', url: 'orders.paid'},
        // {title: '未支付', url: 'orders.nopaid'}
    ];

    $scope.tabs4 = [
        {title: '分配记录', url: 'orders.distribution'},
        // {title: '已支付', url: 'orders.paid'},
        // {title: '未支付', url: 'orders.nopaid'}
    ];


    $scope.tabs2 = [
        {title: '退款', url: 'orders.refund'},
        // {title: '已支付', url: 'orders.paid'},
        // {title: '未支付', url: 'orders.nopaid'}
    ];

    $scope.tabs5 = [
        {title: '钱包明细', url: 'money.bills'},

        // {title: '已支付', url: 'orders.paid'},
        // {title: '未支付', url: 'orders.nopaid'}
    ];

    // $scope.currentTab = 'orders.all';

    $scope.onClickTab = function(tab) {
        $scope.currentTab = tab.url;
    };

    $scope.isActiveTab = function(url) {
        return url == $scope.currentTab;
    }

});
