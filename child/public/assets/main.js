/***
 Metronic AngularJS App Main Script
 ***/

/* Metronic App  该APP */
var App = angular.module("App", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    'tm.pagination',
    'ui.select',
    'angularFileUpload',
    'daterangepicker',
    '720kb.tooltips',
    'datePicker'
]);

//
// App.directive('webUploader', ['$rootScope',function(){
//     return{
//         restrict: 'AE',
//         replace: true,
//         templateUrl: '../public/tpls/accept.html',
//         compile:function () {
//
//         }
//     };
// }]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
App.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
App.config(['$controllerProvider', function($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
 *********************************************/

/* Setup global settings设置全局设置 */
App.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages支持的语言
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state侧边栏菜单状态
            pageContentWhite: true, // set page content layout设置页面内容布局
            pageBodySolid: false, // solid body color state固体颜色状态
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load页面加载时自动滚动到顶部
        },
        assetsPath: '/web/assets',
        globalPath: '/web/assets/global',
        layoutPath: '/web/assets/layouts/layout'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller 安装应用程序主控制器 */
App.controller('AppCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {

        //App.initComponents(); // init core components它的核心部件
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive初始化整个布局（页眉，页脚，侧边栏，等等）如果在页面加载服务器端包括谐音而不是加载与NG include指令
    });
}]);

/***
 Layout Partials.
 By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
 initialization can be disabled and Layout.init() should be called on page load complete as explained above.

 布局的谐音。
 默认情况下，部分装载通过AngularJS ng包含指令。如果他们在服务器端加载（例如PHP包含函数），那么下面部分
 初始化可以禁用和布局。（）应该被称为页面加载完成上面所说的。
 ***/


/* Setup Layout Part - Header 设置布局部分-表头 */
App.controller('HeaderCtrl', ['$rootScope', '$scope', '$ajax','$http', function($rootScope, $scope, $ajax,$http ,$state) {
    $scope.$on('$includeContentLoaded', function() {

    });

    $rootScope.news = [];
    $rootScope.newsCount = 0;
    // $rootScope.load = function () {
    //     $ajax.post('system/customer/message', {
    //         pageSize: 7,
    //         currentPage: 1,
    //         flag: 2
    //     }, function (result) {
    //         $rootScope.news = result.result;
    //         $rootScope.newsCount = result.total;
    //     })
    // };
    // $rootScope.load();

    $rootScope.logout = function () {
        $ajax.post('/api-child/user/Logout/logout',$.param({}),function (result) {
            layer.msg('退出登录', {time: 1500, icon: 1});
            // setDisabled(59, $('#sendCode'));
            window.location.href='http://sms.qirui.com'
        })
    }

    //获取个人信息
    $scope.batten = function() {
        $ajax.get('/api-child/ordinary/Account/items',$.param({}), function(result) {
            $rootScope.heardata = result[0];
        })
    };
    $scope.batten();


    $rootScope.authInfo = null;


    $rootScope.statusData = [{name:"不限",status:""},
        {name:"待审核",status:0},
        {name:"审核通过",status:1},
        {name:"审核驳回",status:2}];

    $rootScope.resetPw = function () {
        layer.open({
            type: 1
            ,closeBtn:false
            ,title: false //不显示标题栏
            ,area: '600px;'
            ,shade: 0.2
            ,resize: false
            ,btn: false
            ,btnAlign: 'c'
            ,moveType: 1 //拖拽模式，0或者1
            ,content: '<form id="passwordForm" class="form-horizontal ng-pristine ng-scope ng-invalid ng-invalid-required ng-valid-minlength ng-valid-maxlength" role="form" name="myForm" novalidate=""><div class="modal-header"><span class="layui-layer-setwin"><a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a></span>' +
            '<h5 class="modal-title">修改密码</h5>' +
            '</div>' +
            '<div class="modal-body" style="padding-bottom: 0;"><div class="row" style="margin-bottom: 0;">' +
            '<div class="col-md-10">' +
            '<div class="form-group">' +
            '<label class="control-label col-md-3">原密码</label>' +
            '<div class="col-md-9">' +
            '<input class="form-control placeholder-no-fix" type="password" autocomplete="off" placeholder="请输入密码" id="resPassword" name="resPassword"  minlength="8" maxlength="16"> ' +

            '</div> ' +
            '</div> ' +
            '<div class="form-group">' +
            '<label class="control-label col-md-3">新密码</label>' +
            '<div class="col-md-9">' +
            '<input class="form-control placeholder-no-fix" type="password" autocomplete="off" placeholder="请输入密码" id="password" name="password"  minlength="8" maxlength="16"> ' +
            '<span style="color:red" ng-show="myForm.code.$dirty &amp;&amp; myForm.code.$invalid" class="ng-hide">请输入新密码</span>' +
            '</div> ' +
            '</div> ' +
            '<div class="form-group">' +
            '<label class="control-label col-md-3">新密码确认</label>' +
            '<div class="col-md-9">' +
            '<input class="form-control placeholder-no-fix" type="password" autocomplete="off" placeholder="请再次输入密码" id="rePassword" name="rePassword"> ' +
            '</div> ' +
            '</div> ' +
            '</div> </div> </div> <div class="modal-footer">' +
            '<button type="submit" style="float: left;margin-left: 125px;" class="btn btn-xs green layui-layer-btn0" >修改密码 </button> </div> ' +
            '</form>'
            ,success : function (index) {
                $('.layui-layer-btn1').css({'margin-left':'50px','width':'104px','text-align':'center'});
                $(function () {

                    $('#passwordForm').validate({
                        errorElement: 'span', //default input error message container
                        errorClass: 'help-block', // default input error message class
                        focusInvalid: false, // do not focus the last invalid input
                        ignore: "",
                        rules: {

                            resPassword: {
                                required: true
                            },
                            password: {
                                required: true
                            },
                            rePassword: {
                                equalTo: "#password"
                            },

                        },

                        messages: { // custom messages for radio buttons and checkboxes
                            resPassword: {
                                required: '请输入您的原密码',
                                resPassword: '密码长度为{0}至{1}个字符'
                            },
                            password: {
                                required: '请输入您的新密码'
                            },
                            rePassword: {
                                required: '请确认密码',
                                equalTo: '两次密码不一致'
                            }


                        },

                        invalidHandler: function(event, validator) { //display error alert on form submit

                        },

                        highlight: function(element) { // hightlight error inputs
                            $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
                        },

                        success: function(label) {
                            label.closest('.form-group').removeClass('has-error');
                            label.remove();
                        },

                        errorPlacement: function(error, element) {
                            if (element.attr("name") == 'smsCode') {
                                error.insertAfter($('#register_smsCode_error'));
                            } else if (element.closest('.input-icon').size() === 1) {
                                error.insertAfter(element.closest('.input-icon'));
                            } else {
                                error.insertAfter(element);
                            }

                            // if (element.attr("name") == "tnc") { // insert checkbox errors after the container
                            //     error.insertAfter($('#register_tnc_error'));
                            // } else if (element.closest('.input-icon').size() === 1) {
                            //     error.insertAfter(element.closest('.input-icon'));
                            // } else {
                            //     error.insertAfter(element);
                            // }
                        },

                        submitHandler: function(form) {

                            if ($('#resPassword').val()=='') {
                                layer.msg('请输入原密码', {time:2000, icon: 2});
                                return false;
                            }
                            if ($('#password').val()=='') {
                                layer.msg('请输入密码', {time: 2000, icon: 2});
                                return false;
                            }
                            if ($("#rePassword").val()=='') {
                                layer.msg('请输入密码（8-16位数字英文组合）', {time: 2000, icon: 2});
                                return false;
                            }

                            $.ajax({
                                type: "POST",
                                url: '/api-child/ordinary/Account/changeLoginPasswd',
                                data:{
                                    old_password: $('#resPassword').val(),
                                    password:$('#password').val(),
                                },
                                dataType: "json",
                                async: true,
                                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                                success: function(re){
                                    if (re.code == '10000000') {
                                        layer.msg('密码修改成功');
                                        setTimeout(function () {
                                            parent.layer.closeAll()
                                        },2000)


                                    } else {
                                        layer.msg(re.msg + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;错误代码：" + re.code, {time: 1000, icon:2})
                                    }

                                }
                            });





                        }

                    });

                    $('.register-form input').keypress(function(e) {
                        if (e.which == 13) {
                            if ($('.register-form').validate().form()) {
                                // $('.register-form').submit();
                            }
                            return false;
                        }
                    });

                });


                // $('.close').on('click',function () {
                //     layer.close()
                // })
            }
            ,yes: function(index, layero){
                //
                // $ajax.post('/api/transfer/Status/transfer', $.param({amount:$scope.TransferNum}),function () {
                //     layer.msg('转移成功！',{time:2000})
                // })
                // $rootScope.isActiveTop=false;
                // $rootScope.isActiveHeight=false;
                // $rootScope.isActiveMs=false;
                // $rootScope.DonotTransferClick=false;
                layer.close(index);
                // $scope.$apply();
            }

        });
    }


}]);

///* Setup Layout Part - Sidebar 设置布局部分-侧栏*/
App.controller('SideBarCtrl', ['$state', '$scope', function($state, $scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar($state); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
//App.controller('QuickSidebarController', ['$scope', function($scope) {
//    $scope.$on('$includeContentLoaded', function() {
//       setTimeout(function(){
//            QuickSidebar.init(); // init quick sidebar
//        }, 2000)
//    });
//}]);

/* Setup Layout Part - Theme Panel */
//App.controller('ThemePanelController', ['$scope', function($scope) {
//    $scope.$on('$includeContentLoaded', function() {
//        Demo.init(); // init theme panel
//    });
//}]);

/* Setup Layout Part - Footer */
//App.controller('FooterController', ['$scope', function($scope) {
//    $scope.$on('$includeContentLoaded', function() {
//        Layout.initFooter(); // init footer
//    });
//}]);

/* Setup Rounting For All Pages 设置路由的所有页*/
App.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url重定向任何不匹配的URL
    $urlRouterProvider.otherwise("/api/report");

    $stateProvider

        // Dashboard
        //控制台
        .state('desktop', {
            url: "/desktop",
            templateUrl: "../public/tpls/desktop.html",
            data: {pageTitle: '控制台'},
            controller: "DesktopCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files在带有此ID的链接元素之前加载上面的CSS文件。动态CSS文件必须在核心和主题CSS文件之间加载。
                        files: [
                            '../public/assets/pages/controllers/desktop.js'
                        ]
                    });
                }]
            }
        })

        // 接口短信
        .state('message', {
            url: "/api",
            templateUrl: "../public/tpls/message/message-tab.html",
            data: {pageTitle: '接口短信'},
            controller: "MessageSettingCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/message/message-tab.js'
                        ]
                    });
                }]
            }
        })
        // .state('message.hear', {
        //     url: "/hear",
        //     templateUrl: "../public/tpls/message/message-key.html",
        //     data: {pageTitle: '接口短信'},
        //     controller: "MessageHeader",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'App',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [
        //                     '../public/assets/pages/controllers/message/message-header.js',
        //                     '../public/assets/plugins/swiper.min.js'
        //                 ]
        //             });
        //         }]
        //     }
        // })
        // 接口短信 概况
        .state('message.report', {
            url: "/report",
            templateUrl: "../public/tpls/message/message-api.html",
            data: {pageTitle: '接口短信'},
            controller: "MessageApiCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/message/message-api.js'
                        ]
                    });
                }]
            }
        })
        //接口短信 签名
        .state('message.sign', {
            url: "/sign",
            templateUrl: "../public/tpls/message/message-list.html",
            data: {pageTitle: '签名报备'},
            controller: "MessageSignCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/message/message-list.js'
                        ]
                    });
                }]
            }
        })
        //接口短信 模板
        .state('message.template', {
            url: "/template",
            templateUrl: "../public/tpls/message/template-list.html",
            data: {pageTitle: '模板报备'},
            controller: "MessageTemplateCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/message/template-list.js'
                        ]
                    });
                }]
            }
        })

        //接口短信 发送记录
        .state('message.record', {
            url: "/record",
            templateUrl: "../public/tpls/message/message-record.html",
            data: {pageTitle: '发送记录'},
            params: {
                batchId: null,
                date: null
            },
            controller: "MessageRecordTabCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/message/message-record.js'
                        ]
                    });
                }]
            }
        })

        //接口短信 今日发送
        .state('message.record.today', {
            url: "/today",
            templateUrl: "../public/tpls/message/message-today.html",
            data: {pageTitle: '今日发送'},
            params: {
                batchId: null,
                date: null
            },
            controller: "MessageTodayCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/message/message-today.js'
                        ]
                    });
                }]
            }
        })


        //接口短信 昨日发送
        .state('message.record.yesterday', {
            url: "/yesterday",
            templateUrl: "../public/tpls/message/message-yesterday.html",
            data: {pageTitle: '昨日发送'},
            params: {
                batchId: null,
                date: null
            },
            controller: "MessageYesterdayCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/message/message-yesterday.js'
                        ]
                    });
                }]
            }
        })

        //接口短信 前天发送
        .state('message.record.eve', {
            url: "/eve",
            templateUrl: "../public/tpls/message/message-eve.html",
            data: {pageTitle: '昨日发送'},
            params: {
                batchId: null,
                date: null
            },
            controller: "MessageEveCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/message/message-eve.js'
                        ]
                    });
                }]
            }
        })


        //接口短信 更早记录
        .state('message.record.earlier', {
            url: "/earlier",
            templateUrl: "../public/tpls/message/message-earlier.html",
            data: {pageTitle: '更早记录'},
            params: {
                batchId: null,
                date: null
            },
            controller: "MessageEarlierCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/message/message-earlier.js'
                        ]
                    });
                }]
            }
        })

        //接口短信 回复记录
        .state('message.reply', {
            url: "/reply",
            templateUrl: "../public/tpls/message/message-record.html",
            data: {pageTitle: '回复记录'},
            controller: "MessageReplyTabCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/message/message-reply-tab.js'
                        ]
                    });
                }]
            }
        })

        //接口短信 回复记录 今日记录
        .state('message.reply.today', {
            url: "/today",
            templateUrl: "../public/tpls/message/message-reply-today.html",
            data: {pageTitle: '今日记录'},
            controller: "MessageReplyTodayCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/message/message-reply-today.js'
                        ]
                    });
                }]
            }
        })


        //接口短信 回复记录 昨日记录
        .state('message.reply.yesterday', {
            url: "/yesterday",
            templateUrl: "../public/tpls/message/message-reply-yesterday.html",
            data: {pageTitle: '今日记录'},
            controller: "MessageReplyYesterdayCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/message/message-reply-yesterday.js'
                        ]
                    });
                }]
            }
        })
        //接口短信 回复记录 更早记录
        .state('message.reply.earlier', {
            url: "/earlier",
            templateUrl: "../public/tpls/message/message-reply-earlier.html",
            data: {pageTitle: '今日记录'},
            controller: "MessageReplyEarlierCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/message/message-reply-earlier.js'
                        ]
                    });
                }]
            }
        })
        //接口短信 账单明细
        .state('message.bills', {
            url: "/bills",
            templateUrl: "../public/tpls/message/message-bills-list.html",
            data: {pageTitle: '账单明细'},
            controller: "MessageBillsCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/message/message-bills-list.js'
                        ]
                    });
                }]
            }
        })
        //接口短信 发送统计
        .state('message.sendReport', {
            url: "/send/report",
            templateUrl: "../public/tpls/message/message-send-report.html",
            data: {pageTitle: '发送统计'},
            controller: "MessageSendReportCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/message/message-send-report.js'
                        ]
                    });
                }]
            }
        })

        .state('message.batch', {
            url: "/batch",
            templateUrl: "show?page=/message/message-batch-list",
            data: {pageTitle: '发送批次'},
            controller: "MessageBatchCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/message/message-batch-list.js'
                        ]
                    });
                }]
            }
        })

        // 接口短信   导出记录
        .state('message.export', {
            url: "/export",
            templateUrl: "../public/tpls/message/message-export.html",
            data: {pageTitle: '导出记录'},
            controller: "DMessageUserExportCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/message/message-export.js'
                        ]
                    });
                }]
            }
        })


        //接口短信 设置
        .state('message.setup', {
            url: "/setup",
            templateUrl: "../public/tpls/message/message-setting.html",
            data: {pageTitle: '设置'},
            controller: "MessageSetupCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/message/message-setting.js'
                        ]
                    });
                }]
            }
        })
        // //接口短信 黑名单
        // .state('message.black', {
        //     url: "/black",
        //     templateUrl: "show?page=/message/message-black-list",
        //     data: {pageTitle: '黑名单'},
        //     controller: "MessageApiBlackCtrl",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'App',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [
        //                     '../assets/pages/controllers/message/message-black-list.js'
        //                 ]
        //             });
        //         }]
        //     }
        // })


        // 模板短信
        .state('plat', {
            url: "/plat",
            templateUrl: "../public/tpls/plat/plat-tab.html",
            data: {pageTitle: '模板短信'},
            controller: "MessagePlatCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-tab.js'
                        ]
                    });
                }]
            }
        })
        // 模板短信 概况
        .state('plat.report', {
            url: "/report",
            templateUrl: "../public/tpls/plat/plat-report.html",
            data: {pageTitle: '概况'},
            controller: "MessagePlatReportCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-report.js'
                        ]
                    });
                }]
            }
        })
        // 模板短信 短信发送
        .state('plat.send', {
            url: "/send",
            templateUrl: "../public/tpls/plat/plat-record.html",
            data: {pageTitle: '短信发送'},
            controller: "MessagePlatSendTabCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-send-tab.js'
                        ]
                    });
                }]
            }
        })
        .state('plat.send.routine', {
            url: "/routine",
            templateUrl: "../public/tpls/plat/plat-send-routine.html",
            data: {pageTitle: '常规短信发送'},
            controller: "MessagePlatSendRoutineCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/plugins/bootstrap/bootstrap-fileinput.css',
                            '../public/assets/pages/controllers/plat/plat-send-routine.js',
                            '../public/assets/pages/controllers/contact/treeutil.js',
                            '../public/assets/plugins/webuploader/webuploader.min.js'
                        ]
                    });
                }]
            }
        })
        //模板短信 短信发送 个性发送
        .state('plat.send.indiv', {
            url: "/indiv",
            templateUrl: "../public/tpls/plat/plat-send-indiv.html",
            data: {pageTitle: '个性短信发送'},
            controller: "MessagePlatIndivSendCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/plugins/webuploader/webuploader.min.js',
                            '../public/assets/plugins/bootstrap/bootstrap-fileinput.css',
                            '../public/assets/pages/controllers/plat/plat-send-indiv.js'
                            // '../public/js/cs.js'
                        ]
                    });
                }]
            }
        })
        // //模板短信 短信发送 个性发送 测试
        // .state('plat.send.indiv', {
        //     url: "/indiv",
        //     templateUrl: "../public/tpls/plat/plat-send-indiv-cs.html",
        //     data: {pageTitle: '个性短信发送'},
        //     controller: "MessagePlatIndivSendCtrl",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'App',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [
        //                     '../public/assets/plugins/webuploader/webuploader.min.js',
        //                     '../public/assets/plugins/bootstrap/bootstrap-fileinput.css',
        //                     '../public/assets/pages/controllers/plat/plat-send-indiv-cs.js'
        //                     // '../public/js/cs.js'
        //                 ]
        //             });
        //         }]
        //     }
        // })
        // 模板短信 签名
        .state('plat.sign', {
            url: "/sign",
            templateUrl: "../public/tpls/plat/plat-sign-list.html",
            data: {pageTitle: '签名报备'},
            controller: "MessagePlatSignCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-sign-list.js'
                        ]
                    });
                }]
            }
        })
        // 模板短信 模板
        .state('plat.template', {
            url: "/template",
            templateUrl: "../public/tpls/plat/plat-template-list.html",
            data: {pageTitle: '模板报备'},
            controller: "MessagePlatTemplateCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-template-list.js'
                        ]
                    });
                }]
            }
        })
        // 模板短信 发送队列
        .state('plat.batch', {
            url: "/batch",
            templateUrl: "../public/tpls/plat/plat-record.html",
            data: {pageTitle: '发送队列'},
            controller: "MessagePlatBatchTabCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-batch.js'
                        ]
                    });
                }]
            }
        })
        // 模板短信 发送队列 即时发送队列
        .state('plat.batch.today', {
            url: "/today",
            templateUrl: "../public/tpls/plat/plat-batch-today.html",
            data: {pageTitle: '即时发送'},
            controller: "MessagePlatBatchTodayCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-batch-today.js'
                        ]
                    });
                }]
            }
        })
        // 模板短信 发送队列 定时发送队列
        .state('plat.batch.yesterday', {
            url: "/yesterday",
            templateUrl: "../public/tpls/plat/plat-batch-yesterday.html",
            data: {pageTitle: '定时发送'},
            controller: "MessagePlatBatchYesterdayCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-batch-yesterday.js'
                        ]
                    });
                }]
            }
        })
        // 模板短信 发送记录
        .state('plat.record', {
            url: "/record",
            templateUrl: "../public/tpls/plat/plat-record.html",
            data: {pageTitle: '发送记录'},
            params: {
                batchId: null,
                date: null
            },
            controller: "MessagePlatTabCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-record.js'
                        ]
                    });
                }]
            }
        })
        // 模板短信 发送记录  今日发送
        .state('plat.record.today', {
            url: "/today",
            templateUrl: "../public/tpls/plat/plat-record-list-today.html",
            data: {pageTitle: '今日发送'},
            params: {
                batchId: null,
                date: null
            },
            controller: "MessagePlatRecordTodayCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-record-list-today.js'
                        ]
                    });
                }]
            }
        })

        // 模板短信 发送记录  昨日发送
        .state('plat.record.yesterday', {
            url: "/yesterday",
            templateUrl: "../public/tpls/plat/plat-record-list-yesterday.html",
            data: {pageTitle: '昨日发送'},
            params: {
                batchId: null,
                date: null
            },
            controller: "MessagePlatRecordYesterdayCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-record-list-yesterday.js'
                        ]
                    });
                }]
            }
        })

        // 模板短信 发送记录  前日发送
        .state('plat.record.eve', {
            url: "/eve",
            templateUrl: "../public/tpls/plat/plat-record-list-eve.html",
            data: {pageTitle: '前日发送'},
            params: {
                batchId: null,
                date: null
            },
            controller: "MessagePlatRecordEveCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-record-list-eve.js'
                        ]
                    });
                }]
            }
        })

        // 模板短信 发送记录  更早发送
        .state('plat.record.earlier', {
            url: "/earlier",
            templateUrl: "../public/tpls/plat/plat-record-list-earlier.html",
            data: {pageTitle: '更早发送'},
            params: {
                batchId: null,
                date: null
            },
            controller: "MessagePlatRecordEarlierCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-record-list-earlier.js'
                        ]
                    });
                }]
            }
        })

        // 模板短信 回复记录
        .state('plat.reply', {
            url: "/reply",
            templateUrl: "../public/tpls/plat/plat-record.html",
            data: {pageTitle: '回复记录'},
            controller: "MessagePlatReplyCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-reply-tab.js'
                        ]
                    });
                }]
            }
        })
        // 模板短信 回复记录  今日回复
        .state('plat.reply.today', {
            url: "/today",
            templateUrl: "../public/tpls/plat/plat-record-reply-today.html",
            data: {pageTitle: '回复记录'},
            controller: "MessagePlatdReplyTodayCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-record-reply-today.js'
                        ]
                    });
                }]
            }
        })


        // 模板短信 回复记录  昨日回复
        .state('plat.reply.yesterday', {
            url: "/yesterday",
            templateUrl: "../public/tpls/plat/plat-record-reply-yesterday.html",
            data: {pageTitle: '昨日回复记录'},
            controller: "MessagePlatdReplyYesterdayCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-record-reply-yesterday.js'
                        ]
                    });
                }]
            }
        })


        // 模板短信 回复记录  更早回复
        .state('plat.reply.earlier', {
            url: "/earlier",
            templateUrl: "../public/tpls/plat/plat-record-reply-earlier.html",
            data: {pageTitle: '更早回复记录'},
            controller: "MessagePlatdReplyEarlierCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-record-reply-earlier.js'
                        ]
                    });
                }]
            }
        })
        // 模板短信 黑名单
        .state('plat.black', {
            url: "/black",
            templateUrl: "show?page=/plat/plat-black-list",
            data: {pageTitle: '黑名单'},
            controller: "MessagePlatBlackCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/plat/plat-black-list.js'
                        ]
                    });
                }]
            }
        })
        // 模板短信 白名单
        .state('plat.white', {
            url: "/white",
            templateUrl: "show?page=/plat/plat-white-list",
            data: {pageTitle: '白名单'},
            controller: "MessagePlatWhiteCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/plat/plat-white-list.js'
                        ]
                    });
                }]
            }
        })
        //模板短信 账单明细
        .state('plat.bills', {
            url: "/bills",
            templateUrl: "../public/tpls/plat/plat-bills-list.html",
            data: {pageTitle: '账单明细'},
            controller: "PlatBillsCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-bills-list.js'
                        ]
                    });
                }]
            }
        })
        //模板短信 发送统计
        .state('plat.sendReport', {
            url: "/send/report",
            templateUrl: "../public/tpls/plat/plat-send-report.html",
            data: {pageTitle: '发送统计'},
            controller: "PlatSendReportCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-send-report.js'
                        ]
                    });
                }]
            }
        })

        //模板短信 设置
        .state('plat.setting', {
            url: "/setting",
            templateUrl: "../public/tpls/plat/plat-setting.html",
            data: {pageTitle: '设置'},
            controller: "PlatSetupCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/plat/plat-setting.js'
                        ]
                    });
                }]
            }
        })





        // 群发短信
        .state('industry', {
            url: "/industry",
            templateUrl: "../public/tpls/industry/industry-tab.html",
            data: {pageTitle: '群发短信'},
            controller: "MessageIndustryCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-tab.js'
                        ]
                    });
                }]
            }
        })
        // 群发短信 概况
        .state('industry.report', {
            url: "/report",
            templateUrl: "../public/tpls/industry/industry-report.html",
            data: {pageTitle: '概况'},
            controller: "MessageIndustryReportCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-report.js'
                        ]
                    });
                }]
            }
        })
        // 群发短信 短信发送
        .state('industry.send', {
            url: "/send",
            templateUrl: "../public/tpls/industry/industry-record.html",
            data: {pageTitle: '短信发送'},
            controller: "MessageIndustrySendTabCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                            '../public/assets/plugins/bootstrap/bootstrap-fileinput.css',
                            '../public/assets/pages/controllers/industry/industry-send-tab.js',
                            '../public/assets/pages/controllers/contact/treeutil.js',
                            '../public/assets/plugins/webuploader/webuploader.min.js'
                        ],
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    });
                }]
            }
        })
        // 群发短信 短信发送 常规发送
        .state('industry.send.routine', {
            url: "/routine",
            templateUrl: "../public/tpls/industry/industry-send-routine.html",
            data: {pageTitle: '常规短信发送'},
            controller: "MessageIndustrySendRoutineCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/plugins/bootstrap/bootstrap-fileinput.css',
                            '../public/assets/pages/controllers/industry/industry-send-routine.js',
                            '../public/assets/plugins/webuploader/webuploader.min.js'
                        ]
                    });
                }]
            }
        })
        //群发短信 短信发送 个性发送
        .state('industry.send.indiv', {
            url: "/indiv",
            templateUrl: "../public/tpls/industry/industry-send-indiv.html",
            data: {pageTitle: '个性短信发送'},
            controller: "MessageIndustryIndivSendCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/plugins/webuploader/webuploader.min.js',
                            '../public/assets/plugins/bootstrap/bootstrap-fileinput.css',
                            '../public/assets/pages/controllers/industry/industry-send-indiv.js'
                            // '../public/js/cs.js'
                        ]
                    });
                }]
            }
        })
        // 群发短信 签名
        .state('industry.sign', {
            url: "/sign",
            templateUrl: "../public/tpls/industry/industry-sign-list.html",
            data: {pageTitle: '签名报备'},
            controller: "MessageIndustrySignCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-sign-list.js'
                        ]
                    });
                }]
            }
        })
        // 群发短信 模板
        .state('industry.template', {
            url: "/template",
            templateUrl: "../public/tpls/industry/industry-template-list.html",
            data: {pageTitle: '模板报备'},
            controller: "MessageIndustryTemplateCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-template-list.js'
                        ]
                    });
                }]
            }
        })
        // 群发短信 发送队列
        .state('industry.batch', {
            url: "/batch",
            templateUrl: "../public/tpls/industry/industry-record.html",
            data: {pageTitle: '发送队列'},
            controller: "MessageIndustryBatchTabCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-batch.js'
                        ]
                    });
                }]
            }
        })
        // 群发短信 发送队列 即时发送队列
        .state('industry.batch.today', {
            url: "/today",
            templateUrl: "../public/tpls/industry/industry-batch-today.html",
            data: {pageTitle: '即时发送'},
            controller: "MessageIndustryBatchTodayCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-batch-today.js'
                        ]
                    });
                }]
            }
        })
        // 群发短信 发送队列 定时发送队列
        .state('industry.batch.yesterday', {
            url: "/yesterday",
            templateUrl: "../public/tpls/industry/industry-batch-yesterday.html",
            data: {pageTitle: '定时发送'},
            controller: "MessageIndustryBatchYesterdayCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-batch-yesterday.js'
                        ]
                    });
                }]
            }
        })
        // 群发短信 发送记录
        .state('industry.record', {
            url: "/record",
            templateUrl: "../public/tpls/industry/industry-record.html",
            data: {pageTitle: '发送记录'},
            params: {
                batchId: null,
                date: null
            },
            controller: "MessageIndustryTabCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-record.js'
                        ]
                    });
                }]
            }
        })
        // 群发短信 发送记录  今日发送
        .state('industry.record.today', {
            url: "/today",
            templateUrl: "../public/tpls/industry/industry-record-list-today.html",
            data: {pageTitle: '今日发送'},
            params: {
                batchId: null,
                date: null
            },
            controller: "MessageIndustryRecordTodayCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-record-list-today.js'
                        ]
                    });
                }]
            }
        })

        // 群发短信 发送记录  昨日发送
        .state('industry.record.yesterday', {
            url: "/yesterday",
            templateUrl: "../public/tpls/industry/industry-record-list-yesterday.html",
            data: {pageTitle: '昨日发送'},
            params: {
                batchId: null,
                date: null
            },
            controller: "MessageIndustryRecordYesterdayCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-record-list-yesterday.js'
                        ]
                    });
                }]
            }
        })

        // 群发短信 发送记录  前日发送
        .state('industry.record.eve', {
            url: "/eve",
            templateUrl: "../public/tpls/industry/industry-record-list-eve.html",
            data: {pageTitle: '前日发送'},
            params: {
                batchId: null,
                date: null
            },
            controller: "MessageIndustryRecordEveCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-record-list-eve.js'
                        ]
                    });
                }]
            }
        })

        // 群发短信 发送记录  更早发送
        .state('industry.record.earlier', {
            url: "/earlier",
            templateUrl: "../public/tpls/industry/industry-record-list-earlier.html",
            data: {pageTitle: '更早发送'},
            params: {
                batchId: null,
                date: null
            },
            controller: "MessageIndustryRecordEarlierCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-record-list-earlier.js'
                        ]
                    });
                }]
            }
        })

        // 群发短信 回复记录
        .state('industry.reply', {
            url: "/reply",
            templateUrl: "../public/tpls/industry/industry-record.html",
            data: {pageTitle: '回复记录'},
            controller: "MessageIndustryReplyCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-reply-tab.js'
                        ]
                    });
                }]
            }
        })
        // 群发短信 回复记录  今日回复
        .state('industry.reply.today', {
            url: "/today",
            templateUrl: "../public/tpls/industry/industry-record-reply-today.html",
            data: {pageTitle: '回复记录'},
            controller: "MessageIndustrydReplyTodayCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-record-reply-today.js'
                        ]
                    });
                }]
            }
        })


        // 群发短信 回复记录  昨日回复
        .state('industry.reply.yesterday', {
            url: "/yesterday",
            templateUrl: "../public/tpls/industry/industry-record-reply-yesterday.html",
            data: {pageTitle: '昨日回复记录'},
            controller: "MessageIndustrydReplyYesterdayCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-record-reply-yesterday.js'
                        ]
                    });
                }]
            }
        })


        // 群发短信 回复记录  更早回复
        .state('industry.reply.earlier', {
            url: "/earlier",
            templateUrl: "../public/tpls/industry/industry-record-reply-earlier.html",
            data: {pageTitle: '更早回复记录'},
            controller: "MessageIndustrydReplyEarlierCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-record-reply-earlier.js'
                        ]
                    });
                }]
            }
        })
        //群发短信 账单明细
        .state('industry.bills', {
            url: "/bills",
            templateUrl: "../public/tpls/industry/industry-bills-list.html",
            data: {pageTitle: '账单明细'},
            controller: "IndustryBillsCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-bills-list.js'
                        ]
                    });
                }]
            }
        })
        //群发短信 发送统计
        .state('industry.sendReport', {
            url: "/send/report",
            templateUrl: "../public/tpls/industry/industry-send-report.html",
            data: {pageTitle: '发送统计'},
            controller: "IndustrySendReportCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-send-report.js'
                        ]
                    });
                }]
            }
        })

        //群发短信 设置
        .state('industry.setting', {
            url: "/setting",
            templateUrl: "../public/tpls/industry/industry-setting.html",
            data: {pageTitle: '设置'},
            controller: "IndustrySetupCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/industry/industry-setting.js'
                        ]
                    });
                }]
            }
        })

        // 通讯录
        .state('contact', {
            url: "/contact/group",
            templateUrl: "../public/tpls/contact/contact-group-list.html",
            data: {pageTitle: '通讯组'},
            controller: "ContactGroupCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/plugins/bootstrap/bootstrap-fileinput.css',
                            '../public/assets/pages/controllers/contact/contact-group-list.js',
                            '../public/assets/pages/controllers/contact/treeutil.js'
                        ]
                    });
                }]
            }
        })




        // 开发者工具
        // .state('develop', {
        //     url: "/develop",
        //     templateUrl: 'show?page=/develop/develop-sdk-list',
        //     abstract: true
        // })
        // SDK下载
        .state('develop', {
            url: "/develop",
            templateUrl: "../public/tpls/develop/develop-tab.html",
            data: {pageTitle: '开发者工具'},
            controller: "DevelopTabCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/develop/develop-tab.js'
                        ]
                    });
                }]
            }
        })
        .state('develop.API', {
            url: "/API",
            templateUrl: "../public/tpls/develop/develop-all-list.html",
            data: {pageTitle: '开发者工具'},
            controller: "DevelopAllCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/develop/develop-all-list.js'
                        ]
                    });
                }]
            }
        })
        // 充值
        .state('payment', {
            url: "/payment",
            templateUrl: "../public/tpls/balance/payment-tab.html",
            data: {pageTitle: '充值'},
            controller: "PaymentCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/balance/payment-tab.js'
                        ]
                    });
                }]
            }
        })
        // 充值 账户充值
        .state('payment.account', {
            url: "/account",
            templateUrl: "../public/tpls/balance/payment-account.html",
            data: {pageTitle: '账户充值'},
            controller: "PaymentAccountCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/balance/payment-account.js'
                        ]
                    });
                }]
            }
        })

        // 充值 服务充值
        .state('payment.product', {
            url: "/product",
            templateUrl: "../public/tpls/balance/payment-product.html",
            data: {pageTitle: '服务充值'},
            controller: "PaymentProductCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/balance/payment-product.js'
                        ]
                    });
                }]
            }
        })

        // 充值 线下充值
        .state('payment.offline', {
            url: "/offline",
            templateUrl: "../public/tpls/balance/payment-offline.html",
            data: {pageTitle: '线下充值'},
            controller: "PaymentOfflineCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/balance/payment-offline.js'
                        ]
                    });
                }]
            }
        })
        // 账单
        .state('orders', {
            url: "/orders",
            templateUrl: "../public/tpls/balance/orders-tab.html",
            data: {pageTitle: '账单'},
            controller: "OrderTabCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/balance/orders-tab.js'
                        ]
                    });
                }]
            }
        })
        .state('orders.all', {
            url: "/all",
            templateUrl: "../public/tpls/balance/orders-all-list.html",
            data: {pageTitle: '订单'},
            controller: "OrderAllCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/balance/orders-all-list.js'
                        ]
                    });
                }]
            }
        })
        .state('money', {
            url: "/money",
            templateUrl: "../public/tpls/balance/money-tab.html",
            data: {pageTitle: '账单'},
            controller: "MoneyTabCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/balance/money-tab.js'
                        ]
                    });
                }]
            }
        })
        .state('money.bills', {
            url: "/bills",
            templateUrl: "../public/tpls/balance/payment-bills.html",
            data: {pageTitle: '钱包明细'},
            controller: "PaymentAllCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/balance/payment-bills.js'
                        ]
                    });
                }]
            }
        })
        .state('orders.paid', {
            url: "/paid",
            templateUrl: "show?page=/balance/orders-paid-list",
            data: {pageTitle: '已支付账单'},
            controller: "OrderPaidCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/balance/orders-paid-list.js'
                        ]
                    });
                }]
            }
        })
        .state('orders.nopaid', {
            url: "/nopaid",
            templateUrl: "show?page=/balance/orders-nopaid-list",
            data: {pageTitle: '未支付账单'},
            controller: "OrderNoPaidCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/balance/orders-nopaid-list.js'
                        ]
                    });
                }]
            }
        })

        //发票
        .state('invoice', {
            url: "/invoice",
            templateUrl: "../public/tpls/balance/invoice-tab.html",
            data: {pageTitle: '发票'},
            controller: "InvoiceTabCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/balance/invoice-tab.js'
                        ]
                    });
                }]
            }
        })
        .state('invoice.claim', {
            url: "/claim",
            templateUrl: "../public/tpls/balance/invoice-claim.html",
            data: {pageTitle: '索取发票'},
            controller: "InvoiceCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/balance/invoice-claim.js'
                        ]
                    });
                }]
            }
        })
        .state('invoice.record', {
            url: "/record",
            templateUrl: "../public/tpls/balance/invoice-record.html",
            data: {pageTitle: '索取记录'},
            controller: "InvoiceRecordCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/balance/invoice-record.js'
                        ]
                    });
                }]
            }
        })
        .state('invoice.news', {
            url: "/news",
            templateUrl: "../public/tpls/balance/invoice-news.html",
            data: {pageTitle: '发票信息'},
            controller: "InvoiceNewsCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/plugins/bootstrap/bootstrap-fileinput.css',
                            '../public/assets/pages/controllers/balance/invoice-news.js'
                        ]
                    });
                }]
            }
        })
        .state('invoice.add', {
            url: "/add",
            templateUrl: "../public/tpls/balance/invoice-add.html",
            data: {pageTitle: '发票信息'},
            controller: "InvoiceAddCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/balance/invoice-add.js'
                        ]
                    });
                }]
            }
        })

        //申请发票页
        .state('invoice.submit', {
            url: "/submit/:dataTic/:dataMon/:Assure",
            templateUrl: "../public/tpls/balance/invoice-submit.html",
            data: {pageTitle: '索取发票'},
            controller: "InvoiceSubmitCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/plugins/bootstrap/bootstrap-fileinput.css',
                            '../public/assets/pages/controllers/balance/invoice-submit.js'
                        ]
                    });
                }]
            }
        })

        //申请详情页
        .state('invoice.details', {
            url: "/details/:id",
            templateUrl: "../public/tpls/balance/invoice-details.html",
            data: {pageTitle: '发票详细'},
            controller: "InvoiceDetailsCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/balance/invoice-details.js'
                        ]
                    });
                }]
            }
        })

        // 账户设置
        .state('account', {
            url: "/account",
            templateUrl: "../public/tpls/account/account-tab.html",
            data: {pageTitle: '账户设置'},
            controller: "AccountTabCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/account/account-tab.js'
                        ]
                    });
                }]
            }
        })
        // 系统设置 IP白名单
        .state('account.info', {
            url: "/info",
            templateUrl: "../public/tpls/account/info.html",
            data: {pageTitle: '基本信息'},
            controller: "AccountInfoCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/account/account-info.js'
                        ]
                    });
                }]
            }
        })
        // 系统设置
        .state('account.auth', {
            url: "/auth",
            templateUrl: "../public/tpls/account/account-auth.html",
            data: {pageTitle: '认证资料'},
            controller: "AccountAuthCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/plugins/bootstrap/bootstrap-fileinput.css',
                            '../public/assets/pages/controllers/account/account-auth.js'
                        ]
                    });
                }]
            }
        })
        // 安全设置
        .state('account.safe', {
            url: "/safe",
            templateUrl: "show?page=/account/account-safe",
            data: {pageTitle: '安全设置'},
            controller: "AccountSafeCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/account/account-safe.js'
                        ]
                    });
                }]
            }
        })
        // 系统设置 修改密码
        .state('account.pwd', {
            url: "/pwd",
            templateUrl: "../public/tpls/account/account-pwd.html",
            data: {pageTitle: '修改密码'},
            controller: "AccountPwdCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/account/account-pwd.js'
                        ]
                    });
                }]
            }
        })



        // 消息日志
        .state('customer', {
            url: "/customer",
            templateUrl: "../public/tpls/system/customer-tab.html",
            data: {pageTitle: '消息日志'},
            controller: "CustomerTabCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/system/customer-tab.js'
                        ]
                    });
                }]
            }
        })
        // 系统消息
        .state('customer.news', {
            url: "/customer/news",
            templateUrl: "../public/tpls/system/customer-message-list.html",
            data: {pageTitle: '消息日志'},
            controller: "CustomerMessageCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/system/customer-message-list.js'
                        ]
                    });
                }]
            }
        })
        // 操作日志
        .state('customer.logs', {
            url: "/customer/logs",
            templateUrl: "../public/tpls/system/customer-log-list.html",
            data: {pageTitle: '操作日志'},
            controller: "CustomerUserLogCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/system/customer-log-list.js'
                        ]
                    });
                }]
            }
        })
        .state('Export', {
            url: "/Export",
            templateUrl: "../public/tpls/system/Export-tab.html",
            data: {pageTitle: '导出记录'},
            controller: "ExportTabCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/system/Export-tab.js'
                        ]
                    });
                }]
            }
        })

        // 导出记录
        .state('Export.export', {
            url: "/Export/export",
            templateUrl: "../public/tpls/system/customer-export-list.html",
            data: {pageTitle: '导出记录'},
            controller: "CustomerUserExportCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/system/customer-export-list.js'
                        ]
                    });
                }]
            }
        })













        // 语音验证码
        .state('voice', {
            url: "/voice",
            templateUrl: "show?page=/voice/voice-tab",
            data: {pageTitle: '语音验证码'},
            controller: "VoiceCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/voice/voice-tab.js'
                        ]
                    });
                }]
            }
        })
        // 语音验证码 概况
        // .state('voice.report', {
        //     url: "/report",
        //     templateUrl: "show?page=/voice/voice-report",
        //     data: {pageTitle: '概况'},
        //     controller: "VoiceReportCtrl",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'App',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [
        //                     'assets/pages/controllers/voice/voice-report.js'
        //                 ]
        //             });
        //         }]
        //     }
        // })
        // 语音验证码 测试
        .state('voice.test', {
            url: "/test",
            templateUrl: "show?page=/voice/voice-test",
            data: {pageTitle: '语音测试'},
            controller: "VoiceTestCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/voice/voice-test.js'
                        ]
                    });
                }]
            }
        })// 语音验证码 发送记录
        .state('voice.record', {
            url: "/record",
            templateUrl: "show?page=/voice/voice-record-list",
            data: {pageTitle: '发送记录'},
            controller: "VoiceRecordCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/voice/voice-record-list.js'
                        ]
                    });
                }]
            }
        })
        //语音短信 账单明细
        .state('voice.bills', {
            url: "/bills",
            templateUrl: "show?page=/voice/voice-bills-list",
            data: {pageTitle: '账单明细'},
            controller: "VoiceBillsCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/voice/voice-bills-list.js'
                        ]
                    });
                }]
            }
        })
        //语音短信 发送统计
        .state('voice.sendReport', {
            url: "/send/report",
            templateUrl: "show?page=/voice/voice-send-report",
            data: {pageTitle: '发送统计'},
            controller: "VoiceSendReportCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/voice/voice-send-report.js'
                        ]
                    });
                }]
            }
        })

        // 国际语音验证码
        .state('intlvoice', {
            url: "/intlvoice",
            templateUrl: "show?page=/intlvoice/voice-tab",
            data: {pageTitle: '语音验证码'},
            controller: "intlVoiceCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/intlvoice/voice-tab.js'
                        ]
                    });
                }]
            }
        })
        // 语音验证码 概况
        // .state('voice.report', {
        //     url: "/report",
        //     templateUrl: "show?page=/voice/voice-report",
        //     data: {pageTitle: '概况'},
        //     controller: "VoiceReportCtrl",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'App',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [
        //                     'assets/pages/controllers/voice/voice-report.js'
        //                 ]
        //             });
        //         }]
        //     }
        // })
        // 语音验证码 测试
        .state('intlvoice.test', {
            url: "/intltest",
            templateUrl: "show?page=/intlvoice/voice-test",
            data: {pageTitle: '语音测试'},
            controller: "intlVoiceTestCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/intlvoice/voice-test.js'
                        ]
                    });
                }]
            }
        })// 语音验证码 发送记录
        .state('intlvoice.record', {
            url: "/intlrecord",
            templateUrl: "show?page=/intlvoice/voice-record-list",
            data: {pageTitle: '发送记录'},
            controller: "intlVoiceRecordCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/intlvoice/voice-record-list.js'
                        ]
                    });
                }]
            }
        })
        //国际语音短信 账单明细
        .state('intlvoice.bills', {
            url: "/intlbills",
            templateUrl: "show?page=/intlvoice/voice-bills-list",
            data: {pageTitle: '账单明细'},
            controller: "intlVoiceBillsCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/intlvoice/voice-bills-list.js'
                        ]
                    });
                }]
            }
        })
        //国际语音短信 发送统计
        .state('intlvoice.sendReport', {
            url: "/intlsend/report",
            templateUrl: "show?page=/intlvoice/voice-send-report",
            data: {pageTitle: '发送统计'},
            controller: "intlVoiceSendReportCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/intlvoice/voice-send-report.js'
                        ]
                    });
                }]
            }
        })
        // 国际语音验证码 价格
        .state('intlvoice.price', {
            url: "/price",
            templateUrl: "show?page=/intlvoice/voice-price",
            data: {pageTitle: '国际语音验证码价格'},
            controller: "IntlVoicePriceCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/intlvoice/voice-price.js'
                        ]
                    });
                }]
            }
        })

        // 语音通知
        .state('noticevoice', {
            url: "/noticevoice",
            templateUrl: "show?page=/noticevoice/voice-tab",
            data: {pageTitle: '语音短信'},
            controller: "noticeVoiceCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/noticevoice/voice-tab.js'
                        ]
                    });
                }]
            }
        })
        // 国际验证码 发送
        .state('noticevoice.send', {
            url: "/noticevoicesend",
            templateUrl: "show?page=/noticevoice/voice-send",
            data: {pageTitle: '短信发送'},
            controller: "noticeVoiceSendCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            '../assets/pages/controllers/noticevoice/voice-send.js'
                        ]
                    });
                }]
            }
        })
        // 语音短信 测试
        .state('noticevoice.test', {
            url: "/noticetest",
            templateUrl: "show?page=/noticevoice/voice-test",
            data: {pageTitle: '语音测试'},
            controller: "noticeVoiceTestCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/noticevoice/voice-test.js'
                        ]
                    });
                }]
            }
        })
        // 语音短信 发送记录
        .state('noticevoice.record', {
            url: "/noticerecord",
            templateUrl: "show?page=/noticevoice/voice-record-list",
            data: {pageTitle: '发送记录'},
            params: {
                batchId: null,
                date: null
            },
            controller: "noticeVoiceRecordCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/noticevoice/voice-record-list.js'
                        ]
                    });
                }]
            }
        })
        //语音短信 账单明细
        .state('noticevoice.bills', {
            url: "/noticebills",
            templateUrl: "show?page=/noticevoice/voice-bills-list",
            data: {pageTitle: '账单明细'},
            controller: "noticeVoiceBillsCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/noticevoice/voice-bills-list.js'
                        ]
                    });
                }]
            }
        })
        //语音短信 发送统计
        .state('noticevoice.sendReport', {
            url: "/noticesend/report",
            templateUrl: "show?page=/noticevoice/voice-send-report",
            data: {pageTitle: '发送统计'},
            controller: "noticeVoiceSendReportCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/noticevoice/voice-send-report.js'
                        ]
                    });
                }]
            }
        })
        // 国际验证码 模板
        .state('noticevoice.template', {
            url: "/noticevoicetemplate",
            templateUrl: "show?page=/noticevoice/voice-template-list",
            data: {pageTitle: '模板报备'},
            controller: "noticevoiceTemplateCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/noticevoice/voice-template-list.js'
                        ]
                    });
                }]
            }
        })
        .state('noticevoice.batch', {
            url: "/noticevoicebatch",
            templateUrl: "show?page=/noticevoice/voice-batch-list",
            data: {pageTitle: '发送记录'},
            controller: "MessageNoticevoiceBatchCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/noticevoice/voice-batch-list.js'
                        ]
                    });
                }]
            }
        })
        // 语音通知 价格
        .state('noticevoice.price', {
            url: "/price",
            templateUrl: "show?page=/noticevoice/voice-price",
            data: {pageTitle: '语音通知价格'},
            controller: "NoticeVoicePriceCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/noticevoice/voice-price.js'
                        ]
                    });
                }]
            }
        })

        // 国际验证码
        .state('intl', {
            url: "/intl",
            templateUrl: "../public/tpls/intl/intl-tab.html",
            data: {pageTitle: '国际验证码'},
            controller: "IntlCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/intl/intl-tab.js'
                        ]
                    });
                }]
            }
        })
        // 国际验证码 概况
        .state('intl.report', {
            url: "/report",
            templateUrl: "../public/tpls/intl/intl-report.html",
            data: {pageTitle: '概况'},
            controller: "IntlReportCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/intl/intl-report.js'
                        ]
                    });
                }]
            }
        })
        // 国际验证码 发送
        .state('intl.send', {
            url: "/send",
            templateUrl: "../public/tpls/intl/intl-send.html",
            data: {pageTitle: '短信发送'},
            controller: "IntlSendCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/plugins/bootstrap/bootstrap-fileinput.css',
                            '../public/assets/pages/controllers/intl/intl-send.js'
                        ]
                    });
                }]
            }
        })
        // 国际验证码 签名
        .state('intl.sign', {
            url: "/sign",
            templateUrl: "../public/tpls/intl/intl-sign-list.html",
            data: {pageTitle: '签名报备'},
            controller: "IntlSignCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/intl/intl-sign-list.js'
                        ]
                    });
                }]
            }
        })
        // 国际验证码 模板
        .state('intl.template', {
            url: "/template",
            templateUrl: "../public/tpls/intl/intl-template-list.html",
            data: {pageTitle: '模板报备'},
            controller: "IntlTemplateCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/intl/intl-template-list.js'
                        ]
                    });
                }]
            }
        })
        .state('intl.batch', {
            url: "/batch",
            templateUrl: "../public/tpls/intl/intl-batch-list.html",
            data: {pageTitle: '发送批次'},
            controller: "MessageIntlBatchCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/intl/intl-batch-list.js'
                        ]
                    });
                }]
            }
        })
        // 国际验证码 发送记录
        .state('intl.record', {
            url: "/record",
            templateUrl: "../public/tpls/intl/intl-record-list.html",
            data: {pageTitle: '发送记录'},
            params: {
                batchId: null,
                date: null
            },
            controller: "IntlRecordCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/intl/intl-record-list.js'
                        ]
                    });
                }]
            }
        })
        //国际短信 账单明细
        .state('intl.bills', {
            url: "/bills",
            templateUrl: "../public/tpls/intl/intl-bills-list.html",
            data: {pageTitle: '账单明细'},
            controller: "IntlBillsCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/intl/intl-bills-list.js'
                        ]
                    });
                }]
            }
        })
        //国际短信 发送统计
        .state('intl.sendReport', {
            url: "/send/report",
            templateUrl: "../public/tpls/intl/intl-send-report.html",
            data: {pageTitle: '发送统计'},
            controller: "IntlSendReportCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/intl/intl-send-report.js'
                        ]
                    });
                }]
            }
        })
        // 国际验证码 价格
        .state('intl.price', {
            url: "/price",
            templateUrl: "../public/tpls/intl/intl-price.html",
            data: {pageTitle: '国际价格'},
            controller: "IntlPriceCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/intl/intl-price.js'
                        ]
                    });
                }]
            }
        })
        // 私密通话
        .state('secrettalk', {
            url: "/secrettalk",
            templateUrl: "show?page=/secrettalk/secrettalk-tab",
            data: {pageTitle: '私密通话'},
            controller: "SecretTalkCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/secrettalk/secrettalk-tab.js'
                        ]
                    });
                }]
            }
        })
        // 私密通话 概况
        .state('secrettalk.report', {
            url: "/report",
            templateUrl: "show?page=/secrettalk/secrettalk-report",
            data: {pageTitle: '概况'},
            controller: "SecretTalkReportCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/secrettalk/secrettalk-report.js'
                        ]
                    });
                }]
            }
        })
        // 私密通话 发送记录
        .state('secrettalk.record', {
            url: "/record",
            templateUrl: "show?page=/secrettalk/secrettalk-record-list",
            data: {pageTitle: '发送记录'},
            params: {
                batchId: null,
                date: null
            },
            controller: "SecretTalkRecordCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/secrettalk/secrettalk-record-list.js'
                        ]
                    });
                }]
            }
        })
        //国际短信 账单明细
        .state('secrettalk.bills', {
            url: "/bills",
            templateUrl: "show?page=/secrettalk/secrettalk-bills-list",
            data: {pageTitle: '账单明细'},
            controller: "SecretTalkBillsCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/secrettalk/secrettalk-bills-list.js'
                        ]
                    });
                }]
            }
        })
        //国际短信 发送统计
        .state('secrettalk.sendReport', {
            url: "/send/report",
            templateUrl: "show?page=/secrettalk/secrettalk-send-report",
            data: {pageTitle: '发送统计'},
            controller: "SecretTalkSendReportCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/secrettalk/secrettalk-send-report.js'
                        ]
                    });
                }]
            }
        })
        // 国际验证码 价格
        .state('secrettalk.price', {
            url: "/price",
            templateUrl: "show?page=/secrettalk/secrettalk-price",
            data: {pageTitle: '价格'},
            controller: "SecretTalkPriceCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/secrettalk/secrettalk-price.js'
                        ]
                    });
                }]
            }
        })





        // 发票
        // .state('invoice', {
        //     url: "/invoice",
        //     templateUrl: "show?page=/balance/invoice-tab",
        //     data: {pageTitle: '发票'},
        //     controller: "InvoiceTabCtrl",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'App',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [
        //                     '../assets/pages/controllers/balance/invoice-tab.js'
        //                 ]
        //             });
        //         }]
        //     }
        // })
        // .state('invoice.all', {
        //     url: "/invoices",
        //     templateUrl: "show?page=/balance/invoice-all-list",
        //     data: {pageTitle: '全部发票'},
        //     controller: "InvoiceAllCtrl",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'App',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [
        //                     '../assets/pages/controllers/balance/invoice-all-list.js'
        //                 ]
        //             });
        //         }]
        //     }
        // })
        // .state('invoice.invoiced', {
        //     url: "/invoiced",
        //     templateUrl: "show?page=/balance/invoice-invoiced-list",
        //     data: {pageTitle: '已开发票'},
        //     controller: "InvoicedCtrl",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'App',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [
        //                     '../assets/pages/controllers/balance/invoice-invoiced-list.js'
        //                 ]
        //             });
        //         }]
        //     }
        // })
        // .state('invoice.unbilled', {
        //     url: "/unbilled",
        //     templateUrl: "show?page=/balance/invoice-unbilled-list",
        //     data: {pageTitle: '未开发票'},
        //     controller: "InvoiceUnbilledCtrl",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'App',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [
        //                     '../assets/pages/controllers/balance/invoice-unbilled-list.js'
        //                 ]
        //             });
        //         }]
        //     }
        // })
        // 系统设置
        .state('system', {
            url: "/system",
            templateUrl: "show?page=/system/system-tab",
            data: {pageTitle: '系统设置'},
            controller: "SystemTabCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/system/system-tab.js'
                        ]
                    });
                }]
            }
        })
        // 系统设置 IP白名单
        .state('system.ip', {
            url: "/whiteip",
            templateUrl: "show?page=/system/system-ip-setting",
            data: {pageTitle: 'IP白名单'},
            controller: "SystemApiCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/system/system-ip-setting.js'
                        ]
                    });
                }]
            }
        })
        // 系统设置 数据推送
        .state('system.push', {
            url: "/push",
            templateUrl: "show?page=/system/system-push-setting",
            data: {pageTitle: '数据推送'},
            controller: "CustomerPushCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/system/system-push-setting.js'
                        ]
                    });
                }]
            }
        })
        // 系统设置 通知设置
        .state('system.notice', {
            url: "/notice",
            templateUrl: "show?page=/system/system-notice-setting",
            data: {pageTitle: '通知设置'},
            controller: "SystemNoticeCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/controllers/system/system-notice-setting.js'
                        ]
                    });
                }]
            }
        })

}]);

/* Init global settings and run the app */
App.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);

App.service('$ajax', ['$http', '$window', '$location','$rootScope', function ($http, $window, $location ,$rootScope) {
        var resultInspector = function (result, success, error) {
            // alert(result.code);
            switch (result.code) {
                case '10000000':
                    success && success(result.data);
                    break;
                case '10001023':
                    success && success(result.data);
                    break;
                case '10001010':
                    var path = window.document.location.pathname;
                    window.location.replace(path.substring(0,path.substr(6).indexOf('/')+1) + 'sign/login.html');
                    break;
                case '10000005':
                    //系统维护
                    var path = window.document.location.pathname;
                    window.location.replace(path.substring(0,path.substr(6).indexOf('/')+1) + 'sign/login.html');
                    break;
                case '10000001':
                    layer.msg(result.message|| result.msg  || '请求失败，请稍后重试!', function(){});
                    break;
                case '10001060':
                    layer.msg(result.message|| result.msg  || '请求失败，请稍后重试!', {time: 1000, icon:2});
                    var path = window.document.location.pathname;
                    window.location.replace(path.substring(0,path.substr(6).indexOf('/')+1) + 'sign/login.html');
                    break;
                case '10000002':
                    layer.msg(result.message|| result.msg  || '暂无数据!', function(){});
                    break;
                case '10001024':
                    if(result.data==-1){
                        layer.msg('操作频繁，同一号码只能一分钟发送一次', {time: 2000, icon:2});
                    }

                    break;
                case '10008014':
                    layer.msg(result.message|| result.msg  || '暂无数据!', function(){});
                    break;
                case '10001084':
                    layer.confirm(result.msg, {
                        btn: ['我知道了'] //按钮
                    }, function(index){
                        layer.close(index);
                    })
                    break;
                case '10001085':
                    layer.confirm(result.msg, {
                        btn: ['继续认证','取消'] //按钮
                    }, function(index){
                        $rootScope.modifyBoss(1);
                        layer.close(index);
                    }, function(index){
                        layer.close(index);
                    });
                    break;
                case '10001086':
                    layer.confirm(result.msg, {
                        btn: ['继续认证','取消'] //按钮
                    }, function(index){
                        $rootScope.modifyBoss(1);
                        layer.close(index);
                    }, function(index){
                        layer.close(index);
                    });
                    break;
                default:
                    if (error) {
                        error(result);
                    } else {
                        layer.msg(result.message|| result.msg || '请求失败，请稍后重试!', {time: 2500, icon:2});
                    }
            }
        };

        return {
            get: function (url, params, success, error) {
                App.startPageLoading({animate: true});
                $http({
                    method: 'GET',
                    url: url+'?'+new Date().getTime(),
                    params: params,
                    headers: {'X-Requested-With': 'XMLHttpRequest'}
                }).then(function (response) {
                    App.stopPageLoading();
                    var result = response.data;
                    resultInspector(result, success, error);
                }, function (response) {
                    App.stopPageLoading();
                    layer.msg('请求失败，请稍后重试!', {time: 1000, icon: 2}, function(){});
                });
            },
            post: function (url, data, success, error) {
                App.startPageLoading({animate: true});
                $http({
                    method: 'POST',
                    url: url+'?'+new Date().getTime(),
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                }).then(function (response) {
                    App.stopPageLoading();
                    var result = response.data;
                    resultInspector(result, success, error);
                }, function (response) {
                    App.stopPageLoading();
                    layer.msg('请求失败，请稍后重试!', {time: 1000, icon: 2}, function(){});
                });
            }
        };
    }]
);


