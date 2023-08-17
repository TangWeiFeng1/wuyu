$(document).ready(function () {
  var uid = $("#uid").text();
  var orderList = [];

 var v = new Vue({
    el: '#app',
    data: function () {
      return {
        centerDialogVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    }
  })

    $(".save").click(function(){
        window.event.returnValue = false;
//        获取取货日期时间，地点
        date = v.form.date1;
        time = v.form.date2;
//        alert("date="+time);
        region = v.form.region;
//         订单总价
        total = $(".z-price").text().substring(1);
        price_list = [];
        amount_list = [];
//        遍历选中的订单
        $(".j-checkbox:checked").each(function (i, e) {
        //  获取所有订单价格和数量
            price = $(this).parents(".p-checkbox").next().next().next().next().text().substring(1);
//            alert(price);
            price_list.push(price);
            amount = $(this).parents(".p-checkbox").siblings(".p-amount").children(".itxt").val();
            amount_list.push(amount);
        })
        var uid = $("#uid").text();
        var url = '/shoppingCar/';
        console.log(price_list);
        $.get(url,
        {'uid':uid,'save':1,'date':date, 'time':time, 'region':region, 'total':total, 'price_list':price_list+'', "amount_list": amount_list+''},
        function(result){
            location.href = '/settings/?uid='+uid;
        })
    })

  // 全选点击事件
  $(".checka").click(function () {
    // prop()返回元素的属性和值
    // 给所有单选框的checked，赋值为当前全选框的checked值
    $(".checka,.j-checkbox").prop("checked", $(this).prop("checked"));
    // 当单选框被选中，checked值为真，给商品盒子添加选中样式，不为真移除样式
    if ($(".checka").prop("checked")) {
      $(".cart-item").addClass("check-cart-item");
    } else {
      $(".cart-item").removeClass("check-cart-item");
    }
    getSum();
  });

  // 商品单选框点击事件
  $(".j-checkbox").click(function () {
    // 比较当前单选框含checked值的长度，和所有单选框长度，给全选框设置checked选中属性
    if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
      $(".checka").prop("checked", true);
    } else {
      $(".checka").prop("checked", false);
    }
    // 点击单选框，给当前商品盒子添加或移除样式
    if ($(this).prop("checked")) {
      $(this).parents(".cart-item").addClass("check-cart-item");
    } else {
      $(this).parents(".cart-item").removeClass("check-cart-item");
    }
    getSum();
  });

  // 增加商品数量点击事件
  $(".increment").click(function () {
    // 获取当前数量，+1，siblings()返回同级元素
    var n = $(this).siblings(".itxt").val();
    n++;
    // 重新赋值
    $(this).siblings(".itxt").val(n);
    // 获取价格，parent()获取父元素，substring()字符串截取
    var price = $(this).parents(".p-amount").siblings(".p-price").text().substring(1);
    // 总价，强转为浮点数保留2位小数
    var total = parseFloat(n * price).toFixed(2);
    // 设置总价
    $(this).parents(".p-amount").siblings(".p-count").html("￥" + total);
    // 调用函数，刷新价格和数量
    getSum();
  });

  // 减少商品
  $(".decrement").click(function () {
    var n = $(this).siblings(".itxt").val();
    // 商品数量 >= 1
    if (n > 1) {
      n--;
      $(this).siblings(".itxt").val(n);

      var price = $(this).parents(".p-amount").siblings(".p-price").text().substring(1);
      var total = parseFloat(n * price).toFixed(2);
      $(this).parents(".p-amount").siblings(".p-count").html("￥" + total);
      getSum();
    }
  });

  $(".itxt").change(function () {
    var n = $(this).val();
    var price = $(this).parents(".p-amount").siblings(".p-price").text().substring(1);
    var total = parseFloat(n * price).toFixed(2);
    $(this).parents(".p-amount").siblings(".p-count").html("￥" + total);
    getSum();
  });

  getSum();

  // 获取购物车总价
  function getSum() {
    var amount = 0;
    var total = 0;
    // each()遍历所有类名为itxt的元素
    $(".itxt").each(function (i, e) {
      // 获取每个元素的值，强转后累加
      amount += parseInt($(e).val());
    });
    // 设置总商品数量
    $(".choose").html(amount);

    // 遍历设置总价格
    $(".j-checkbox:checked").each(function (i, e) {
//      alert("price="+$(this).parent().siblings(".p-count").text().substring(1));
      total += parseFloat($(this).parent().siblings(".p-count").text().substring(1));
//      alert("total="+total);
    })
    $(".z-price").html("￥" + total.toFixed(2));
  }

  // 清空购物车
  $(".clearall").click(function () {
    $(".cart-item").remove();
    getSum();
  });
  // 删除选中商品
  $(".deletes").click(function () {
    window.event.returnValue = false;
    var carts = [];
    // 遍历获取所有被选中的单选框，找寻父元素并移除
     $(".j-checkbox:checked").each(function () {
      var sid = $(this).parent().siblings(".sid").text();
      carts.push(sid);
    });
     $.ajax({
        url: '/shoppingCar/',
        type: 'POST',
        data: {"carts": carts},
        traditional: true,
        success:function(result){
          getSum();
          location.href = "/shoppingCar/?uid="+uid;
        }
    })
  });
  // 删除当前商品 
  $(".p-delete").click(function () {
    $(this).parents(".cart-item").remove();
    getSum();
  });
});