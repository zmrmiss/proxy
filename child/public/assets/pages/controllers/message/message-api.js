/**
 * Created by Administrator on 2017/8/9 0009.
 */
/**
 * 接口短信
 * Created by wangys on 15/1/1.
 */
angular.module('App').controller('MessageApiCtrl', function($rootScope, $scope, $ajax , $uibModal) {
    $scope.tableDataList=[];
    $scope.tableDataShow=false;
    $scope.currentTab = 'message.report';

    $scope.isActiveTab = function(url) {
        return url === $scope.currentTab;
    };
    $scope.username=0;
    $scope.smsCount = 0;
    $scope.templateCount = 0;
    $scope.signCount = 0;
    $scope.tableData = [];
    $scope.loadList = function() {
        $ajax.post('/api-child/ordinary/Account/items',$.param({}), function(result) {
            if (result.length!=0){
                $scope.setTab2 = result[0];
                $rootScope.username2= $scope.setTab2.username;
                $rootScope.remind2= $scope.setTab2.remind;
                sessionStorage.setItem("qrname2", $scope.setTab2.username);
                sessionStorage.setItem("remind2", $scope.setTab2.remind);
                if(sessionStorage.getItem("qrname2")==null){
                    $scope.username2=result[0].username;
                    $rootScope.loadCounts(result[0].username);
                    $rootScope.loadReport(result[0].username);
                }else {
                    $scope.username2=sessionStorage.getItem("qrname2");
                    $rootScope.loadCounts(result[0].username);
                    $rootScope.loadReport(result[0].username);
                }

            }

        });
    };

    $scope.loadList();

    //获取短信条数
    $rootScope.loadCounts = function(username) {
        $scope.username2=username;
        $ajax.post('/api-child/bridge1/Balance/detail',$.param({username:username}), function(result) {
            $scope.smsCount = result;
        });
        // $ajax.post('/api-child/ordinary/Signature/items',$.param({page:1,limit: 10, status:1, username:username}),function (result) {
        //     // alert(result);
        //     $scope.tableDataList = result.list;
        //     if(result.list!=''){
        //         $scope.tableDataShow=true;
        //     }else {
        //         $scope.tableDataShow=false;
        //     }
        //
        // });
    };



    $rootScope.loadReport = function(username) {
        $ajax.post('/api-child/bridge2/Profile/detail', $.param({username:username}), function(result) {
            if (result.pAxisData) {
                init1(result.xAxisData, result.yAxisData, result.pAxisData);
            } else {
                init2(result.xAxisData, result.yAxisData);
            }
            $scope.tableData = result.data;
        })
    };

    var init1 = function(xData, yData, pData) {
        require.config({
            paths: {
                echarts: '../../public/assets/plugins/echarts/dist'
            }
        });
        require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/pie'
            ],
            function(e) {
                var myChart = e.init(document.getElementById('sendR'));
                option = {
                    title: {
                        text: '发送统计',
                        subtext: '近30天内的统计数据，不包括今日',
                        textStyle: {
                            fontSize: 14,
                            fontWeight: 'bolder',
                            color: '#333'
                        }
                    },
                    // grid: {
                    //   x:0,
                    //   y:100,
                    //   x2:0,
                    //   y2:100
                    // },
                    tooltip : {
                        trigger: 'axis'
                    },
                    calculable : true,
                    legend: {
                        color: ['red', 'green', 'red', 'yellow'],
                        data:['发送总量','发送成功','发送失败','等待返回', '无效发送']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            // mark : {show: true},
                            // dataView : {show: true, readOnly: false},
                            // magicType : {show: true, type: ['line', 'bar']},
                            // restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    xAxis : [
                        {
                            type : 'category',
                            splitLine : {show : false},
                            data : xData
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            position: 'left'
                        }
                    ],
                    series : [

                        {
                            name:'发送总量',
                            type:'line',
                            data: yData
                        },

                        {
                            name:'状态分析',
                            type:'pie',
                            tooltip : {
                                trigger: 'item',
                                formatter: '{a} <br/>{b} : {c} ({d}%)'
                            },
                            center: [160,130],
                            radius : [0, 50],
                            itemStyle :　{
                                normal : {
                                    labelLine : {
                                        length : 10
                                    }
                                }
                            },
                            data: pData
                        }
                    ]
                };
                myChart.setOption(option);
                window.onresize = myChart.resize;
            }
        );
    };

    var init2 = function(xData, yData) {
        require.config({
            paths: {
                echarts: '../../public/assets/plugins/echarts/dist'
            }
        });
        require(
            [
                'echarts',
                'echarts/chart/line'
            ],
            function(e) {
                var myChart = e.init(document.getElementById('sendR'));
                option = {
                    title: {
                        text: '发送统计',
                        subtext: '近30天内的统计数据，不包括今日',
                        textStyle: {
                            fontSize: 14,
                            fontWeight: 'bolder',
                            color: '#333'
                        }
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    calculable : true,
                    legend: {
                        data:['发送总量']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            saveAsImage : {show: true}
                        }
                    },
                    xAxis : [
                        {
                            type : 'category',
                            splitLine : {show : false},
                            data : xData
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            position: 'left'
                        }
                    ],
                    series : [

                        {
                            name:'发送总量',
                            type:'line',
                            data: yData
                        }
                    ]
                };
                myChart.setOption(option);
                window.onresize = myChart.resize;
            }
        );
    };


    //显示api密码
    $scope.openShow = function(tel,username) {
        $uibModal.open({
            backdrop: 'static',
            templateUrl: 'showword.html',
            controller: 'ShowSafeCtrl',
            size: 'md',
            resolve:{
                data : function(){
                    return {
                        telephone: angular.copy(tel),
                        username: angular.copy(username),
                        callback: function() {
                            $scope.load();
                        }
                    }
                }
            }
        });
    };

    //打开重置
    $scope.openRester = function(tel,username) {
        $uibModal.open({
            backdrop: 'static',
            templateUrl: 'rester.html',
            controller: 'ResterSafeCtrl',
            size: 'md',
            resolve:{
                data : function(){
                    return {
                        telephone: angular.copy(tel),
                        username: angular.copy(username),
                        callback: function() {
                            $scope.load();
                        }
                    }
                }
            }
        });
    };

});


//显示api密码
angular.module('App').controller('ShowSafeCtrl', function($rootScope, $stateParams, $scope, $ajax, $uibModalInstance, data) {
    $scope.step = 1;
    $scope.data = {
        username: data.username,
        telephone: data.telephone,
        imgcode:''
    };

    // $ajax.get('/api/user/Center/basic', {}, function(result) {
    //     $scope.data.telephone = result.mobile;
    // })



    $scope.getCode = function () {
            if($scope.data.imgcode!=''){
                $ajax.post('/api-child/user/Sms/send', $.param({telephone: $scope.data.telephone,code:$scope.data.imgcode,type:4}), function (result) {
                    layer.msg('验证码短信已发送，请注意查收！', {time: 1500, icon: 1});
                    setDisabled(59, $('#sendCode'));
                });

                // $.ajax({
                //     type: "POST",
                //     url: '//'+domain.user+'/Sms/send',
                //     data:{telephone: $scope.data.telephone,code:$scope.data.imgcode,type:4},
                //     dataType: "json",
                //     async: true,
                //     contentType: "application/x-www-form-urlencoded;charset=utf-8",
                //     success: function(re){
                //         if (re.code == '10000000') {
                //             layer.msg('短信验证码发送成功', {time: 1500, icon: 1});
                //             setDisabled(59, $('#sendCode'));
                //         } else {
                //             layer.msg(re.msg, {time: 2000, icon: 2});
                //         }
                //     }
                // });

            }else {
                layer.msg('请填写图形验证码', {time: 2000, icon: 2});
            }

    };

    $scope.ok = function () {
        if($scope.data.sms_code){

            $ajax.post('/api-child/ordinary/Account/show', $.param($scope.data), function (result) {
                layer.msg('请查看！', {time: 1500, icon: 1});
                $('#accessSecretCopy').html(result);
                $uibModalInstance.dismiss(0);
            },function (result) {
                setDisabled(0,$('#sendCode'));
                layer.msg(result.msg, {time: 2000, icon: 2});
            })
            // $.ajax({
            //     type: "POST",
            //     url: 'http://api.dev.qirui.com/ordinary/Account/show',
            //     data:$scope.data,
            //     dataType: "json",
            //     async: true,
            //     contentType: "application/x-www-form-urlencoded;charset=utf-8",
            //     success: function(re){
            //         if (re.code == '10000000') {
            //             layer.msg('新手机号码更新成功！', {time: 1500, icon: 1});
            //             $scope.data.mobile = $scope.data.newMobile;
            //             $uibModalInstance.dismiss(0);
            //         } else {
            //             layer.msg(re.msg, {time: 2000, icon: 2});
            //         }
            //     }
            // },function (result) {
            //     setDisabled(0,$('#sendCode'));
            //     layer.msg(result.msg, {time: 2000, icon: 2});
            // });

        }else {
            layer.msg('请输入验证码', {time: 2000, icon: 2});
        }
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss(0);
    };

    // 发送倒计时
    var _timeEvent = null;
    function setDisabled(seconds, o) {
        if (seconds <= 0) {
            clearTimeout(_timeEvent);
            o.removeAttr("disabled");
            o.html('发送短信');
        } else {
            o.attr('disabled', true);

            o.html('重新发送 ( ' + (seconds < 10 ? '0': '') + seconds + ' )');
            seconds --;
            _timeEvent = setTimeout(function () {
                setDisabled(seconds, o);
            }, 1000);
        }
    }
});

//重置api密码
angular.module('App').controller('ResterSafeCtrl', function($rootScope, $stateParams, $scope, $ajax, $uibModalInstance, data) {
    $scope.step = 1;

    $scope.data = {
        username: data.username,
        telephone: data.telephone,
        imgcode:''
    };

    // $ajax.get('/api-child/user/Center/basic', {}, function(result) {
    //     $scope.data.telephone = result.mobile;
    // })

    $scope.getCode = function () {
        if($scope.data.imgcode!=''){
            $ajax.post('/api-child/user/Sms/send', $.param({telephone: $scope.data.telephone,code:$scope.data.imgcode,type:5}), function (result) {
                layer.msg('验证码短信已发送，请注意查收！', {time: 1500, icon: 1});

                setDisabled(59, $('#sendCode'));

            });

        }else {
            layer.msg('请填写图形验证码', {time: 2000, icon: 2});
        }


    };

    $scope.ok = function () {
        $ajax.post('/api-child/ordinary/Account/reset', $.param($scope.data), function (result) {
            layer.msg('重置API密码！', {time: 1500, icon: 1});
            // $scope.data.mobile = $scope.data.newMobile;
            $('#accessSecretCopy').html(result);
            $uibModalInstance.dismiss(0);
        },function (result) {
            setDisabled(0,$('#sendCode'));
            layer.msg(result.msg, {time: 2000, icon: 2});
        })



    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss(0);
    };

    // 发送倒计时
    var _timeEvent = null;
    function setDisabled(seconds, o) {
        if (seconds <= 0) {
            clearTimeout(_timeEvent);
            o.removeAttr("disabled");
            o.html('发送短信');
        } else {
            o.attr('disabled', true);

            o.html('重新发送 ( ' + (seconds < 10 ? '0': '') + seconds + ' )');
            seconds --;
            _timeEvent = setTimeout(function () {
                setDisabled(seconds, o);
            }, 1000);
        }
    }
});

