/**
 * 系统消息
 *
 */
angular.module('App').controller('ClientsMyClientCtrl', function($rootScope, $stateParams, $uibModal, $scope, $ajax , $state) {

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

    $scope.isTypes = [{name:'全部' , value:''},{name:'启用' , value:'0'},{name:'禁用' , value:'1'}];
    $scope.params = {
        mobile : '',
        passport :'',
        is_disable : ''
    };

    $scope.tableData = [];
    $scope.load = function() {
        $ajax.post('/api/agents/Childs/items/', $.param({
            limit: $scope.paginationConf.itemsPerPage,
            page: $scope.paginationConf.currentPage,
            mobile : $scope.params.mobile,
            passport : $scope.params.passport,
            is_disable : $scope.params.is_disable
        }), function (result) {
            $scope.tableData = result.list;
            $scope.paginationConf.totalItems = result.count;
        });
    };
    $scope.load();

    //去群发
    $scope.massSee = function () {
        // $state.go('mass.report', {username: 1234,tip:456});
        $state.go('mass.report');
        sessionStorage.setItem('massApikey','1234')
    }
    //去模板
    $scope.mouldSee = function () {
        // $state.go('mass.report', {username: 1234,tip:456});
        $state.go('mould.report');
        sessionStorage.setItem('massApikey','5678')
    }


    //短信开通
    $scope.kt_All = function (id , num) {
        if(num==1){
            //接口
            url='/api/agents/Account/open1/'
        }else if(num==2){
            //模板
            url='/api/agents/Account/open2/'
        }else if(num==3){
            //群发
            url='/api/agents/Account/open3/'
        }
        layer.msg('确定开通吗？', {
            time: 0, //不自动关闭
            icon: 0,
            btn: ['确定', '取消'],
            yes: function(index){
                $ajax.post(url, $.param({
                    child_id:id
                }), function (result) {
                    layer.close(index);
                    layer.msg('操作成功', {time: 1500, icon: 1});
                    $scope.load();
                });
            }
        });
    }

    //启用和禁用
    $scope.is_disable_on = function (val,num) {
        layer.msg('你确定要执行该操作吗？', {
            time: 0, //不自动关闭
            icon: 0,
            btn: ['确定', '取消'],
            yes: function(index){

                $ajax.post('/api/agents/Childs/disable/', $.param({
                    child_id:val,
                    is_disable:num
                }), function (result) {
                    layer.close(index);
                    layer.msg('操作成功', {time: 1500, icon: 1});
                    $scope.load();
                });
            }
        });
    }


    //新增下级
    $scope.addId = function() {
        $uibModal.open({
            backdrop: 'static',
            templateUrl: 'Newlyaddedid.html',
            controller: 'DlAddCtrl',
            size:'md',
            resolve:{
                data : function(){
                    return {
                        // item: angular.copy(result),
                        callback: function() {
                            $scope.load();
                        }
                    }
                }
            }
        });
    };

    //编辑资料
    $scope.EditProfile = function(vas) {
        $ajax.post('/api/agents/Childs/detail/', $.param({
            child_id:vas
        }), function (result) {
            $uibModal.open({
                backdrop: 'static',
                templateUrl: 'DlEditProfile.html',
                controller: 'DlEditProfileCtrl',
                size:'md',
                resolve:{
                    data : function(){
                        return {
                            item: angular.copy(result),
                            callback: function() {
                                $scope.load();
                            }
                        }
                    }
                }
            });
        });

    };

//    API账号充值管理
    $scope.APIPayiRT = function(i) {
        $uibModal.open({
            backdrop: 'static',
            templateUrl: 'DlApiRecharge.html',
            controller: 'DlApiRechargeCtrl',
            size:'md',
            resolve:{
                data : function(){
                    return {
                        id: angular.copy(i),
                        callback: function() {
                            $scope.load();
                        }
                    }
                }
            }
        });


    };


//    认证详情
    $scope.AuthenDetails = function (id) {
        $ajax.post('/api/agents/Childs/authz/',$.param({child_id:id}),function (details) {
            $uibModal.open({
                backdrop: 'static',
                templateUrl: 'DlClientDetailsMass.html',
                controller: 'DlClientDetailsMassCtrl',
                size:'md',
                resolve:{
                    data : function(){
                        return {
                            Detail: angular.copy(details),
                            callback: function() {
                                $scope.load();
                            }
                        }
                    }
                }
            });
        })
    }

});
//认证详情
angular.module('App').controller('DlClientDetailsMassCtrl', function($rootScope, $stateParams, $scope, $ajax, $uibModalInstance, data) {

    $scope.data = data.Detail;
    if(data.Detail.person==null||data.Detail.person==''){
        $scope.data=$.extend(data.Detail.company,$scope.data)

    }else {
        $scope.data=$.extend(data.Detail.person,$scope.data)
    }
    console.log($scope.data)
    $scope.cancel = function () {
        $uibModalInstance.dismiss(0);
    };
});


//编辑资料
angular.module('App').controller('DlEditProfileCtrl', function($rootScope, $stateParams, $scope, $ajax,$uibModal, $uibModalInstance, data) {

    $scope.data = data.item;
    $scope.ok = function () {
        $scope.data.child_id=$scope.data.id;
        if($scope.data.moblie=''){
            layer.msg('请输入手机号', {time: 1500, icon: 2});
            return false;
        }

        $ajax.post('/api/agents/Childs/edit/', $.param($scope.data), function () {
            $uibModalInstance.dismiss(0);
            data.callback();
        })
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss(0);
    };
});

//新增下级
angular.module('App').controller('DlAddCtrl', function($rootScope, $stateParams, $scope, $ajax, $uibModalInstance, data) {

    $scope.data ={};
    // console.log($scope.data)
    $scope.parata= {
        moblie:''
    }
    $scope.ok = function () {
        // $('#AddUserForm').validate({
        //     rules: {
        //         company: {
        //             required: true,
        //             sign: [2, 20]
        //         },
        //         username: {
        //             required: true,
        //             sign: [2, 6]
        //         }
        //     },
        //     messages: {
        //         company: {
        //             required: '公司名称为2至20个字符',
        //             sign: '公司名称为{0}至{1}个字符'
        //         },
        //         username: {
        //             required: '姓名为2至6个字符',
        //             sign: '姓名为{0}至{1}个字符'
        //         }
        //     },
        //     errorPlacement: function(error, element) {
        //         // if (element.is(':radio') || element.is(':checkbox')) {
        //         //     var eid = element.attr('name');
        //         //     error.appendTo(element.parent());
        //         // } else {
        //         error.appendTo(element.parent());
        //         // }
        //     },
        //     // errorElement: 'span',
        //     // debug: true,
        //     submitHandler: function() {
        //
        //
        //     }
        // })
        var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (myreg.test($scope.data.telephone)) {
            $ajax.post('/api/agents/Register/add/', $.param($scope.data), function (result) {
                layer.msg('新增子用户成功!', {time: 1000, icon: 1});
                $uibModalInstance.dismiss(0);
                data.callback();
            })
        } else {
            layer.msg('手机号格式错误!', {time: 1000, icon: 2});
        }

    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss(0);
    };
});

//api操作
angular.module('App').controller('DlApiRechargeCtrl', function($rootScope, $stateParams, $scope, $ajax,$uibModal, $uibModalInstance, data) {
    $scope.id=data.id;
    $scope.data = data.item;

    //获取API账号详情
    $scope.loding = function () {
        //获取接口
        $ajax.post('/api/agents/Account/items1/', $.param({
            child_id:$scope.id
        }), function (result1) {
            if(result1==""){
                $scope.tableData1=[{
                    "title": "接口短信",        //账号名称
                    "surplus_amount": 0,
                    "is_kt":1//短信余量
                }]
            }else {
                $scope.tableData1=result1
            }

        });
        //获取模板
        $ajax.post('/api/agents/Account/items2/', $.param({
            child_id:$scope.id
        }), function (result2) {
            if(result2==""){
                $scope.tableData2=[{
                    "title": "行业短信",        //账号名称
                    "surplus_amount": 0,       //短信余量,
                    "is_kt":1
                }]
            }else {
                $scope.tableData2=result2
            }

        });
        //获取群发
        $ajax.post('/api/agents/Account/items3/', $.param({
            child_id:$scope.id
        }), function (result3) {
            if(result3==""){
                $scope.tableData3=[{
                    "title": "营销短信",        //账号名称
                    "surplus_amount": 0,    //短信余量
                    "is_kt":1
                }]
            }else {
                $scope.tableData3=result3;
            }
            // console.log($scope.tableData3)
        });
    }
    $scope.loding();


    //充值
    $scope.APIPayiZh = function (a,y,x) {
        //a:username
        //y:id
        //x:区分接口，模板，群发
        if(x==1){
            //接口
            url = '/api/agents/AgentApi/balance1/';
            name ='接口'
        }else if(x==2){
            //行业
            url = '/api/agents/AgentMass/balance2/';
            name ='行业'
        }else if(x==3){
            //营销
            url = '/api/agents/AgentMass/balance3/';
            name ='营销'

        }


        $ajax.post(url, $.param({}), function (l) {
            var ssmnu = '您当前可用'+name+'短信余量: '+l[0].balance+'条'
            $uibModal.open({
                backdrop: 'static',
                templateUrl: 'smsPay.html',
                controller: 'DlSmsPayCtrl',
                windowClass:'width400',
                resolve:{
                    data : function(){
                        return {
                            its: angular.copy(ssmnu),
                            Zusername: angular.copy(a),
                            Zid: angular.copy(y),
                            Zqufen: angular.copy(x),
                            callback: function() {
                                $scope.load();
                            }
                        }
                    }
                }
            });
        })

            // layer.msg('手机号格式错误!', {time: 1000, icon: 2});


    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss(0);
    };

    //短信开通
    $scope.kt_All = function (id , num) {
        if(num==1){
            //接口
            url='/api/agents/Account/open1/'
        }else if(num==2){
            //模板
            url='/api/agents/Account/open2/'
        }else if(num==3){
            //群发
            url='/api/agents/Account/open3/'
        }
        layer.msg('确定开通吗？', {
            time: 0, //不自动关闭
            icon: 0,
            btn: ['确定', '取消'],
            yes: function(index){
                $ajax.post(url, $.param({
                    child_id:$scope.id
                }), function (result) {
                    layer.close(index);
                    layer.msg('操作成功', {time: 1500, icon: 1});
                    data.callback();
                    $scope.loding()
                });
            }
        });
    }
});

//进行下线充值
angular.module('App').controller('DlSmsPayCtrl', function($rootScope, $stateParams, $scope, $ajax, $uibModalInstance, data) {
    $scope.data = data.its;
    $scope.parata= {
        branches:''
    }

    // console.log(data)
    $scope.ok = function () {
        // $('#AddUserForm').validate({
        //     rules: {
        //         company: {
        //             required: true,
        //             sign: [2, 20]
        //         },
        //         username: {
        //             required: true,
        //             sign: [2, 6]
        //         }
        //     },
        //     messages: {
        //         company: {
        //             required: '公司名称为2至20个字符',
        //             sign: '公司名称为{0}至{1}个字符'
        //         },
        //         username: {
        //             required: '姓名为2至6个字符',
        //             sign: '姓名为{0}至{1}个字符'
        //         }
        //     },
        //     errorPlacement: function(error, element) {
        //         // if (element.is(':radio') || element.is(':checkbox')) {
        //         //     var eid = element.attr('name');
        //         //     error.appendTo(element.parent());
        //         // } else {
        //         error.appendTo(element.parent());
        //         // }
        //     },
        //     // errorElement: 'span',
        //     // debug: true,
        //     submitHandler: function() {
        //
        //
        //     }
        // })

        if(data.Zqufen==1){
            //接口
            url = '/api/agents/TransferApi/move1/';
        }else if(data.Zqufen==2){
            //模板
            url = '/api/agents/TransferMass/move2/';
        }else if(data.Zqufen==3){
            //群发
            url = '/api/agents/TransferMass/move3/';
        }

        if(data.Zusername==undefined||data.Zid==undefined){
            layer.msg('请先开通此服务!', {time: 1000, icon: 2});
            return false
        }
        if($scope.parata.branches==''||$scope.parata.branches==undefined){
            layer.msg('请输入充值条数!', {time: 1000, icon: 2});
            return false
        }


            $ajax.post(url, $.param({
                child_id:data.Zid,
                amount:$scope.parata.branches,
                child_username:data.Zusername
            }), function (result) {
                layer.msg('充值成功!', {time: 1000, icon: 1});
                $uibModalInstance.dismiss(0);
                data.callback();
            })

            // layer.msg('手机号格式错误!', {time: 1000, icon: 2});


    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss(0);
    };
});