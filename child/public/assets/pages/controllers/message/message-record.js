/**
 * Created by Administrator on 2017/8/9 0009.
 */
/**
 * 接口短信
 * Created by wangys on 15/1/1.
 */
angular.module('App').controller('MessageRecordTabCtrl', function($rootScope, $scope, $ajax) {


    $scope.tabs2 = [
        {title: '今日发送', url: 'message.record.today'},
        {title: '昨日发送', url: 'message.record.yesterday'},
        {title: '前日发送', url: 'message.record.eve'},
        {title: '更早发送', url: 'message.record.earlier'}
    ];

    $scope.currentTab2 = 'message.hear.report.today';

    $scope.onClickDay = function(day) {
        $scope.currentTab2 = day.url;
    };

    $scope.isActiveDay = function(day) {
        return day == $scope.currentTab2;
    }

});
