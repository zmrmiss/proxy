/**
 * Created by Administrator on 2017/8/12 0012.
 */
/**
 * 接口短信
 * Created by wangys on 15/1/1.
 */
angular.module('App').controller('MessageSendReportCtrl', function($rootScope, $stateParams, $scope, $ajax ,$filter) {

    $scope.currentTab = 'message.sendReport';

    $scope.isActiveTab = function(url) {
        return url == $scope.currentTab;
    };

    // 日期控制初始化参数
    $scope.opts = {
        locale: {
            applyClass: 'btn-green',
            applyLabel: "确定",
            fromLabel: "从",
            toLabel: "至",
            cancelLabel: '取消',
            customRangeLabel: '自定义范围',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            firstDay: 1,
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
                '十月', '十一月', '十二月'
            ]
        },
        ranges: {
            '今天': [moment(), moment()],
            '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            '最近7天': [moment().subtract(6, 'days'), moment()],
            '最近30天': [moment().subtract(30, 'days'), moment()],
            '本月': [moment().startOf('month'), moment().endOf('month')]
        },
        dateLimit: {
            months: 3
        }
    };
    //初始化日期查询参数
    $scope.date = {
        startDate:moment().startOf('month'),
        endDate:moment().endOf('month')
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

    var username=$rootScope.username;
    if(username==undefined){
        username= sessionStorage.getItem("qrname2");
    }

    $scope.tableData = [];
    $scope.stateSwitched = 1;
    $scope.load = function() {
        var data={
            page : $scope.paginationConf.currentPage,
            limit : 10,
            username : username,
            start_date : $scope.date.startDate.format('YYYY-MM-DD'),
            end_date : $scope.date.endDate.format('YYYY-MM-DD')
        };
        $ajax.post('/api-child/bridge2/Statistics/items',$.param(data),function (result) {
            // alert(result);
            $scope.tableData = result.list;
            $scope.paginationConf.totalItems = result.count;
        });

        // $ajax.post('api/send/report', {
        //     pageSize: $scope.paginationConf.itemsPerPage,
        //     currentPage: $scope.paginationConf.currentPage,
        //     startDate: $scope.date.startDate.unix() * 1000,
        //     endDate: $scope.date.endDate.unix() * 1000
        // }, function (result) {
        //     $scope.tableData = result.page.result;
        //     $scope.paginationConf.totalItems = result.page.total;
        //     $scope.stateSwitched = result.stateSwitched;
        // });
    };
    $scope.load();

    $scope.export = function () {
        var url = 'api/export/sendReport?startDate=' + $scope.date.startDate.unix() * 1000 + '&endDate=' + $scope.date.endDate.unix() * 1000;
        url = decodeURIComponent(url, true);
        url = encodeURI(encodeURI(url));
        window.location.href = url;
    }
});
