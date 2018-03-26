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
        $ajax.post('/api/center/Logout/logout/ ',$.param({}),function (result) {
            layer.msg('退出登录', {time: 1500, icon: 1});
            // setDisabled(59, $('#sendCode'));
            window.location.href='http://sms.qirui.com'
        })
    }

    //获取个人信息
    $scope.batten = function() {
        $ajax.get('/api/user/Center/basic',$.param({}), function(result) {
            $rootScope.heardata = result;
        })
    };
    // $scope.batten();

    $rootScope.re_status=null;
    // $ajax.post('/api/user/Refund/lock/', $.param({}),function (re_status) {
    //     $rootScope.re_status=re_status;
    // })



    $rootScope.statusData = [{name:"不限",status:""},
        {name:"待审核",status:0},
        {name:"审核通过",status:1},
        {name:"审核驳回",status:2}];


    // $rootScope.AuditingData = [
    //     {name:"客户通过接口主动获取",status:1},
    //     {name:"系统推送数据到客户URL",status:2}];

    // $rootScope.validateFlagData = [{name:"--审核状态--",validateFlag:""},
    //     {name:"待审核",validateFlag:3},
    //     {name:"审核通过",validateFlag:4},
    //     {name:"审核驳回",validateFlag:5}];
    //
    // $rootScope._deptOriginalData = null;
    //获取通讯录
    $rootScope.getContactGroup = function (callback) {
        if($rootScope._deptOriginalData != null){
            callback && callback($rootScope._deptOriginalData);
            return;
        }
        $http({
            url:'/api/contacts/getGroupList?'+new Date().getTime(),
            type: "POST",
        }).then(function (result) {
            //待修改
            // console.log(result)
            if (result.status == 200 && result.data.code == "10000000") {
                $rootScope.stateItems=result.data.data;

                $rootScope._deptOriginalData = result.data.data;
                $rootScope._deptOriginalData.forEach(function (a,i) {
                    delete a['ctime'];
                    delete a['ltime'];
                });
                callback && callback($rootScope._deptOriginalData);
            }
        });
    };
    // $rootScope.getContactGroup();
    $rootScope.getGroupName = function (groupId) {
        // console.log(groupId)
        if(!groupId){
            return "未分组";
        }
        var nameList = [];
        // console.log(nameList)
        $rootScope._getGroupName(groupId,nameList);
        return nameList.join(">");
    };
    $rootScope._getGroupName = function (groupId,nameList) {
        $rootScope.getContactGroup(function () {
            for(var i=0;i<$scope._deptOriginalData.length;i++){
                if($scope._deptOriginalData[i].id == groupId){
                    nameList.unshift($scope._deptOriginalData[i].type_name);
                    if($scope._deptOriginalData[i].parentId != 0){
                        $scope._getGroupName($scope._deptOriginalData[i].parent_id,nameList)
                    }
                }
            }
        });
    };
    // //=================加载签名=====================
    // $rootScope._signs = null;
    // $rootScope.loadSign = function (callback) {
    //     if($rootScope._signs != null){
    //         callback && callback($rootScope._signs);
    //         return;
    //     }
    //     // 待恢复
    //     // $ajax.post('plat/signs', {}, function (result) {
    //     //     $rootScope._signs = result;
    //     //     callback && callback($rootScope._signs);
    //     // })
    // };
    //
    //=================获取客服信息=====================

    $rootScope.customServiceInfo = null;
    $rootScope.getCustomServiceInfo = function (callback) {
        $ajax.post('/api/user/Service/index', $.param({}), function (result) {
            $rootScope.customServiceInfo = result;
        })
    };
    // $rootScope.getCustomServiceInfo();


}]);



angular.module('App').controller('TransferFormCtrl', function($rootScope, $stateParams, $scope, $ajax, $uibModalInstance, data) {

    $scope.cancel = function () {
        $uibModalInstance.dismiss(0);
    };
});
///* Setup Layout Part - Sidebar 设置布局部分-侧栏*/
App.controller('SideBarCtrl', ['$state', '$scope','$ajax','$http',  function($state, $scope, $ajax ) {
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
    $urlRouterProvider.otherwise("/clients/customer");

    $stateProvider

        // Dashboard
        //控制台
        // 客户管理 我的客户
        .state('clients', {
            url: "/clients",
            templateUrl: "../public/tpls/client/client-tab.html",
            data: {pageTitle: '我的客户'},
            controller: "ClientsTabCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/client/client-tab.js'
                        ]
                    });
                }]
            }
        })

        // 我的客户
        .state('clients.customer', {
            url: "/customer",
            templateUrl: "../public/tpls/client/myclient-list.html",
            data: {pageTitle: '我的客户'},
            controller: "ClientsMyClientCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/client/myclient-list.js'
                        ]
                    });
                }]
            }
        })

        // 接口签名
        .state('clients.sign', {
            url: "/sign",
            templateUrl: "../public/tpls/client/myclient-sign.html",
            data: {pageTitle: '接口签名'},
            controller: "ClientsMySignCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/client/myclient-sign.js'
                        ]
                    });
                }]
            }
        })

        // 群发签名
        .state('clients.signMass', {
            url: "/signMass",
            templateUrl: "../public/tpls/client/myclient-signMass.html",
            data: {pageTitle: '群发签名'},
            controller: "ClientsMySignMassCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/client/myclient-signMass.js'
                        ]
                    });
                }]
            }
        })
        // 接口模板
        .state('clients.template', {
            url: "/template",
            templateUrl: "../public/tpls/client/myclient-template.html",
            data: {pageTitle: '接口模板'},
            controller: "ClientsMyTemplateCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/client/myclient-template.js'
                        ]
                    });
                }]
            }
        })

    // 群发模板
        .state('clients.templateMass', {
                url: "/templateMass",
                templateUrl: "../public/tpls/client/myclient-templateMass.html",
                data: {pageTitle: '群发模板'},
                controller: "ClientsMyTemplateMassCtrl",
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'App',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                            files: [
                                '../public/assets/pages/controllers/client/myclient-templateMass.js'
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
            controller: "DlPaymentAccountCtrl",
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
            controller: "DlPaymentProductCtrl",
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
        // 财务管理
        .state('orders', {
            url: "/orders",
            templateUrl: "../public/tpls/balance/orders-tab.html",
            data: {pageTitle: '账单'},
            controller: "DlOrderTabCtrl",
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
        //财务管理 订单
        .state('orders.all', {
            url: "/all",
            templateUrl: "../public/tpls/balance/orders-all-list.html",
            data: {pageTitle: '订单'},
            controller: "DlOrderAllCtrl",
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
        .state('orders.refund', {
            url: "/refund",
            templateUrl: "../public/tpls/balance/orders-refund.html",
            data: {pageTitle: '退款'},
            controller: "OrderRefundCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/balance/orders-refund.js'
                        ]
                    });
                }]
            }
        })
        .state('orders.bills', {
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

        //财务管理 分配记录
        .state('orders.distribution', {
            url: "/distribution",
            templateUrl: "../public/tpls/balance/Distribution-record.html",
            data: {pageTitle: '分配记录'},
            controller: "DistributionRecordCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/balance/Distribution-record.js'
                        ]
                    });
                }]
            }
        })
        //财务管理 充值记录
        .state('orders.record', {
            url: "/record",
            templateUrl: "../public/tpls/balance/Recharge-record.html",
            data: {pageTitle: '充值记录'},
            controller: "RechargeRecordCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/balance/Recharge-record.js'
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
            controller: "DlAccountTabCtrl",
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
        // 设置  站点设置
        .state('account.install', {
            url: "/install",
            templateUrl: "../public/tpls/account/install.html",
            data: {pageTitle: '站点标题'},
            controller: "DlAccountInstallCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/account/account-install.js'
                        ]
                    });
                }]
            }
        })
        // 设置  LOGO设置
        .state('account.logo', {
            url: "/logo",
            templateUrl: "../public/tpls/account/logo-set.html",
            data: {pageTitle: '站点logo'},
            controller: "DlAccountLogoCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/plugins/bootstrap/bootstrap-fileinput.css',
                            '../public/assets/pages/controllers/account/logo-set.js'
                        ]
                    });
                }]
            }
        })

        // 设置  客服电话设置
        .state('account.telephone', {
            url: "/telephone",
            templateUrl: "../public/tpls/account/tel-set.html",
            data: {pageTitle: '客服电话'},
            controller: "DlAccountTelCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../public/assets/pages/controllers/account/tel-set.js'
                        ]
                    });
                }]
            }
        })


        // 系统设置 基本信息
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
        // 系统设置 修改密码
        .state('account.pwd', {
            url: "/pwd",
            templateUrl: "../public/tpls/account/account-pwd.html",
            data: {pageTitle: '修改密码'},
            controller: "DlAccountPwdEditCtrl",
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
                case '10001050':
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
                case '10005004':
                    layer.msg('赠送体验短信条数已用完', function(){});
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


