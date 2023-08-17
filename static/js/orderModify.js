$(document).ready(function () {

  var uid = $.cookie("uid");
  // if (uid == null) {
  //   location.href = '/login/';
  // }

  var v = new Vue({
    el: '#app',
    data: function () {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
     methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  })
    var uid = $(".uid").text();
    var oid = $(".oid").text();
  // 确认修改订单信息
  $("#update_orders").click(function () {
    // 获取取货日期时间，地点
    date = v.form.date1;
    time = v.form.date2;
    region = v.form.region;
    console.log("date="+date);
    $.get("/orderModify/", {"uid":uid, "oid":oid, "oupdate":1, "date":date, "time":time, "region":region},
    function(result){
        location.href = "/settings/?uid="+uid;
    })
  })

  // 取消修改
  $("#cancel_update").click(function () {
    location.href = "/orderModify/?delete=1&uid="+uid+"&oid="+oid;
  })
})