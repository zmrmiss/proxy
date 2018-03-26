/**
 * Created by Administrator on 2017/8/9 0009.
 */
/**
 * 接口短信
 * Created by wangys on 15/1/1.
 */
angular.module('App').controller('MessageSettingCtrl', function($rootScope, $scope, $ajax) {

    $scope.tabs = [
        {title: '接口概况', url: 'message.report'},
        {title: '签名报备', url: 'message.sign'},
        {title: '模板报备', url: 'message.template'},
        {title: '发送记录', url: 'message.record.today'},
        // {title: '三天内记录', url: 'message.hear.third'},
        // {title: '历史记录',   url: 'message.hear.history'},
        {title: '回复记录', url: 'message.reply.today'},
        {title: '充值记录', url: 'message.bills'},
        {title: '发送统计', url: 'message.sendReport'},
        {title: '导出记录', url: 'message.export'},
        {title: '设置', url: 'message.setup'}
    ];
    $scope.currentTab = 'message.hear.report';

    $scope.onClickTab = function(tab) {
        $scope.currentTab = tab.url;
    };

    $scope.isActiveTab = function(url) {
        return url == $scope.currentTab;
    }

});
