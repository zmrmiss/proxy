/**
 * 产品充值
 *
 */
angular.module('App').controller('DlPaymentProductCtrl', function($rootScope, $scope, $state, $ajax ,$compile , $uibModal) {

    $scope.searchOff=false;
    $scope.currentTab = 'payment.product';

    $scope.isActiveTab = function(url) {
        return url == $scope.currentTab;
    };

    $scope.default = {
        name: "自定义套餐",
        price: 0,
        quantity: 0
    };
    $scope.Pay={
        Username:'',
        Combotype:''
    };
    $scope.ApiPay=true;
    $scope.data = {
        type: 0,
        product: {},
        payMode: 0,
        quantity: 0,
        Combotype:''
    };

    $scope.goods = [];
    $scope.good = {};
    $scope.loadGood = function(type) {

        $scope.data.type = type;
        $ajax.post('/api/center/Target/items/',$.param({purpose:$scope.data.type-1}), function(result) {
            $scope.key = result;
            $scope.length=result.length;

            if ($scope.data.type==0){
                $('#swiperContainer').hide();
                $scope.Pay.Username = result[0].username;
                $scope.loadList()
            }else if($scope.data.type==1){
                $('#swiperContainer').hide();
                $scope.Pay.Username = result[0].username;
                $scope.loadList()
            }else if($scope.data.type==2){
                $('#swiperContainer').hide();
                $scope.Pay.Username = result[0].username;
                $scope.loadList()
            }
        });
    };
    $scope.loadGood($scope.data.type);

    $scope.loadList = function () {
        //套餐列表
        $ajax.post('/api/finance/Product/items/',$.param({
            username:$scope.Pay.Username,
            type: $scope.data.type
        }), function (result) {
            $scope.goods = result.first;
            $scope.goods2 =result.Second;

            $scope.goods.forEach(function (good,i) {
                good.Combotype = 'first';
            });
            $scope.goods2.forEach(function (good,i) {
                good.Combotype = 'Second';
            });
            $scope.data.product = $scope.goods[0];

        })
    }
    var title_msg;
    //支付宝支付
    $scope.PaySubmit = function () {

        if($scope.data.product == null) {
            layer.msg('请选择套餐！', {time: 1000, icon: 2});
            event.preventDefault();
            return false;
        }
        if($scope.Pay.Username == '') {
            layer.msg('请选择需要充值的API账号！', {time: 1000, icon: 2});
            event.preventDefault();
            return false;
        }



        if($scope.data.type==0){
            title_msg = '您是否确定充值该产品（接口短信）？充值之后短信不可逆转，请知悉。'
        }else if($scope.data.type==1) {
            title_msg ='您是否确定充值该产品（行业短信）？充值之后短信不可逆转，请知悉。'
        }else if($scope.data.type==2) {
            title_msg = '您是否确定充值该产品（营销短信）？充值之后短信不可逆转，请知悉。'
        }else {
            title_msg = '您是否确定充值该产品？充值之后短信不可逆转，请知悉。'
        }
        layer.msg(title_msg, {
            time: 0, //不自动关闭
            icon: 0,
            btn: ['确定', '取消'],
            yes: function(index){
                layer.close(index);

                var l = (screen.width - 650) / 2;
                var t = (screen.height - 400) / 2;
                // var newWin = window.open("_blank",'newwindow', "toolbar=no, directories=no, status=no, menubar=no, width=650, height=550, top=" + t + ", left=" + l);
                var newWin = window.open();
                $ajax.post('/api/finance/AlipayProduct/go/', $.param({
                    username:$scope.Pay.Username,
                    type: $scope.data.type,
                    product_id: $scope.data.product.id,
                    product_type: $scope.data.product.Combotype
                }), function (result) {
                    newWin.location.href = encodeURI(result);
                    layer.confirm('是否支付完成？', {
                        title:'支付状态',
                        btn: ['支付成功','支付失败'] //按钮
                    }, function(index){
                        layer.close(index);
                        $state.go('orders.all');
                        // $state.go('payment.product');
                    }, function(){
                        $state.go('orders.all');
                    });
                });
            }
        })

    };

    //钱包支付
    $scope.submit = function () {

        if($scope.data.product == null) {
            layer.msg('请选择套餐！', {time: 1000, icon: 2});
            event.preventDefault();
            return false;
        }
        if($scope.Pay.Username == '') {
            layer.msg('请选择需要充值的API账号！', {time: 1000, icon: 2});
            event.preventDefault();
            return false;
        }

        if($scope.data.type==0){
            title_msg = '您是否确定充值该产品（接口短信）？充值之后短信不可逆转，请知悉。'
        }else if($scope.data.type==1) {
            title_msg ='您是否确定充值该产品（行业短信）？充值之后短信不可逆转，请知悉。'
        }else if($scope.data.type==2) {
            title_msg = '您是否确定充值该产品（营销短信）？充值之后短信不可逆转，请知悉。'
        }else {
            title_msg = '您是否确定充值该产品？充值之后短信不可逆转，请知悉。'
        }
        layer.msg(title_msg, {
            time: 0, //不自动关闭
            icon: 0,
            btn: ['确定', '取消'],
            yes: function(index){
                layer.close(index);
                $ajax.post('/api/finance/PayProduct/go/', $.param({
                    username:$scope.Pay.Username,
                    type: $scope.data.type,
                    product_id: $scope.data.product.id,
                    product_type: $scope.data.product.Combotype
                }), function (result) {
                    layer.msg('充值成功！', {time: 2000, icon: 1});
                    setTimeout(function () {
                        layer.close();
                        $state.go('orders.all');
                    },2000)
                });
            }
        });

    };

});