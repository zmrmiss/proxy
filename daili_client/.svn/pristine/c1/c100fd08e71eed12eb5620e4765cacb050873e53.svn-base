/**
 * 个人资料
 *
 */
angular.module('App').controller('AccountInfoCtrl', function($rootScope,$http, $scope, $ajax,$uibModal) {

    $scope.currentTab = 'account.info';

    $scope.isActiveTab = function(url) {
        return url == $scope.currentTab;
    };
    //
    $scope.data = {};

    $scope.load = function() {
        $ajax.get('/api/user/Center/basic', $.param({}), function(result) {
            $scope.data = result;
        })
    };
    $scope.load();

    $scope.modify = function() {

        $ajax.post('/api/user/Center/newEdit/',$.param($scope.data),function () {
            layer.msg('保存成功', {time: 1500, icon: 1});
        })

    }
    $scope.openEmail = function(email) {

        $uibModal.open({
            backdrop: 'static',
            templateUrl: 'email.html',
            controller: 'DlUserEmailSafeCtrl',
            size: 'md',
            resolve:{
                data : function(){
                    return {
                        email: angular.copy(email),
                        id: angular.copy($scope.data.id),
                        callback: function() {
                            console.log("1111="+JSON.stringify($scope.data) + "  " + email);
                            $scope.load();
                        }
                    }
                }
            }
        });
    };





});
angular.module('App').controller('DlUserEmailSafeCtrl', function($rootScope, $stateParams, $scope, $ajax, $uibModalInstance, data) {

    $scope.data = {
        oldEmail: data.email,
        email: data.email,
        id: data.id,
        newEmail: ''
    };
    $scope.ok = function () {
        if($scope.data.newEmail == $scope.data.email){
            layer.msg('与原邮箱重复！', {time: 1500, icon: 2});
            return;
        }
        $('#emailForm').validate({
            rules: {
                newEmail: {
                    required: true,
                    email: true
                },
                password: {
                    required: true
                }
            },
            messages: {
                newEmail: {
                    required: '请填写正确的邮箱'
                },
                password: {
                    required: '请输入登录密码'
                }
            },
            errorPlacement: function(error, element) {
                // if (element.is(':radio') || element.is(':checkbox')) {
                //     var eid = element.attr('name');
                //     error.appendTo(element.parent());
                // } else {
                error.appendTo(element.parent());
                // }
            },
            // errorElement: 'span',
            // debug: true,
            submitHandler: function() {
                $ajax.post('/api/user/Center/changeEmail',$.param({email: $scope.data.newEmail,id:$scope.data.id}),function () {
                    layer.msg('邮箱更改成功', {time: 2000, icon: 1});
                    $uibModalInstance.dismiss(0);
                    data.callback();
                })

            }
        });

    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss(0);
    };

});
